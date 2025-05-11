from django.contrib.auth import authenticate
# from django_filters import CharFilter, FilterSet
# from django_filters.rest_framework import DjangoFilterBackend
from django.core.mail import send_mail
from django.conf import settings
from django.shortcuts import redirect
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Recruiter, Candidate, Job, Interview
from elexis.utils.general import getHumanReadableTime
from .serializers import (
    RecruiterSerializer,
    CandidateSerializer,
    JobSerializer,
    InterviewSerializer,
    LoginSerializer,
)
from datetime import datetime, timedelta
from django.utils.timezone import make_aware, now
from django.shortcuts import redirect
import requests
import os
from dotenv import load_dotenv      
# from django.core.files.storage import default_storage
# print("default storage is::: ",default_storage.__class__)

load_dotenv()
CLIENT_URL = os.getenv("CLIENT_URL")


class SignupView(APIView):
    def post(self, request):
        print("Request",request.data)
        serializer = RecruiterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {'recruiter': serializer.data,
                "message": "Signup successful!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user = authenticate(request, email=email, password=password)
            user = Recruiter.objects.get(email=email)
            # print(user.check_password(password))
            if user:
                # Generate tokens
                refresh = RefreshToken.for_user(user)
                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    'recruiter_id': str(user.id)
                }, status=status.HTTP_200_OK)
            return Response({"error": "Invalid email or password"}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RecruiterViewSet(viewsets.ModelViewSet):
    queryset = Recruiter.objects.all()
    serializer_class = RecruiterSerializer
    def get_permissions(self):
        if self.action == 'create':
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
    def get_queryset(self):
        if self.action == 'create':
            return Recruiter.objects.all()
        return Recruiter.objects.filter(organization=self.request.user.organization) 
        
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        recruiter = serializer.save()
        # Generate tokens
        refresh = RefreshToken.for_user(recruiter)
        return Response({
            'recruiter': serializer.data,
            'tokens': {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            },
            'message': 'Registration successful'
        }, status=status.HTTP_201_CREATED)
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response({
            'recruiter': serializer.data,
            'message': 'Profile updated successfully'
        })
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        data = request.data.copy()
        data['organization'] = request.user.organization.id
        self.perform_destroy(instance)
        return Response({
            'message': 'Profile deleted successfully'
        }, status=status.HTTP_204_NO_CONTENT)

class CandidateViewSet(viewsets.ModelViewSet):
    queryset = Candidate.objects.all()
    serializer_class = CandidateSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Candidate.objects.filter(
            organization=self.request.user.organization
        )

    def perform_create(self, serializer):
        serializer.save(
            organization=self.request.user.organization,
            created_by=self.request.user,
            modified_by=self.request.user,
            recruiter=self.request.user,
        )

    def perform_update(self, serializer):
        serializer.save(modified_by=self.request.user)

    @action(detail=True, methods=["post"], permission_classes=[IsAuthenticated])
    def create_joining_link(self, request, pk=None):
        base_url = self.request.build_absolute_uri('/')[:-1]
        candidate = self.get_object()

        link = f"{base_url}/elexis/candidate/{pk}/start_interview"
        candidate.joining_link = link
        candidate.save()

        return Response(
            {
                "message": "Meet scheduled",
            },
            status=status.HTTP_200_OK,
        )

    @action(detail=True, methods=["post"], permission_classes=[AllowAny])
    def start_interview(self, request, pk=None):
        candidate = self.get_object()

        if candidate.joining_link is None:
            return Response(
                {"message": "Interview done, reschedule"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        candidate.joining_link = None
        candidate.save()
        return redirect("https://www.google.com")


class InterviewViewSet(viewsets.ModelViewSet):
        queryset = Interview.objects.all()
        serializer_class = InterviewSerializer
        permission_classes = [IsAuthenticated]

        def get_queryset(self):
          queryset = Interview.objects.all()

        # Filter by the user (if authenticated and is a recruiter)
          if self.request.user.is_authenticated and hasattr(self.request.user, "recruiter_profile"):
              queryset = queryset.filter(scheduled_by=self.request.user.recruiter_profile)

        # Filter by status query parameter
          status = self.request.query_params.get("status")
          if status:
               queryset = queryset.filter(status=status)

          job_id = self.request.query_params.get("job")
          if job_id:
            queryset = queryset.filter(job__id=job_id)     

          return queryset
        
        def perform_create(self,serializer):
         candidate = serializer.validated_data.get('candidate')  # Fetch the candidate data
         if candidate:
        # Set the organization based on the candidate's organization
            organization = candidate.organization
            interview = serializer.save(scheduled_by=self.request.user,organization=organization)
            interview.link = f"{CLIENT_URL}/interviews/{interview.id}/start/"
            self._update_status_fields(interview)
            interview.save()

            subject = "Interview Scheduled"
            message = (
                f"Dear {interview.candidate.name},\n\n"
                f"You have an interview scheduled for '{interview.job.job_name}' on {interview.date} at {interview.time}.\n"
                f"Click here to join: {interview.link}\n\n"
                f"Best regards,\n{interview.scheduled_by.company_name}"
            )
            send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [interview.candidate.email])

            return Response(
                {"message": "Interview scheduled and email sent.", "link": interview.link},
                status=status.HTTP_201_CREATED,
            )
         
        def perform_update(self, serializer):
            interview = serializer.save()
            self._update_status_fields(interview)
            interview.save()

        def _update_status_fields(self, interview):
            # Prioritize 'ended' > 'started' > 'scheduled'
            if interview.transcript:
                interview.status = 'ended'
            elif interview.meeting_room and interview.status != 'started':
                interview.status = 'started'
            elif (interview.link and interview.status != 'scheduled' and not interview.meeting_room) :
                interview.status = 'scheduled'

        @action(detail=True, methods=["get"], permission_classes=[AllowAny])
        def start(self, request, pk=None):
            interview = self.get_object()

            current_time = now()
            interview_start = make_aware(datetime.combine(interview.date, interview.time))
            interview_end = interview_start + timedelta(hours=1)

        # Case 1: Too early
            if current_time < interview_start:
                return Response(
                    {"message": f"Your interview is scheduled at {getHumanReadableTime(interview_start)}. Please wait.",
                     "isEarly": True},
                    status=status.HTTP_200_OK,  # Or 403 if you want to block it
                )

        # Case 2: Too late
            if current_time > interview_end:
                return Response(
                    {"message": "This interview link has expired. Please contact the recruiter to reschedule.",
                     "isEarly": False},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            
            candidate = interview.candidate
            data= {
            "name":candidate.name,
            "candidate_email": candidate.email,
            "interviewer_email":candidate.recruiter.email,
            "role":interview.job.job_name,
            "company_name": candidate.recruiter.company_name,
            "interviewer_name": candidate.recruiter.name,
            "candidate_voice_clone": "India Accent (Female)",
            "is_dashboard_request": True,
            "language" : 'english',
            "job_description_text": candidate.job.job_description
            }

            files = {
                "resume": ("resume.pdf", candidate.resume.open("rb"), "application/pdf"),
                # "job_description": ("pythondev.pdf",open("static/desc.pdf", "rb"), "application/pdf"),
            }
            
            try:
                response = requests.post("https://app.elexis.ai/start", data=data, files=files)

                json_response = response.json()
                print("JSON response of meeting url:::", json_response)
                meeting_link = json_response.get("room_url")
                if meeting_link:
                    interview.meeting_room = meeting_link
                    interview.link = None
                    interview.save()
                    return Response(
                        {"message": "Interview starting...", "url": meeting_link},
                        status=status.HTTP_200_OK
                    )
                else: 
                    return Response(
                        {"error": "Failed to retrieve meeting link."},
                        status=status.HTTP_502_BAD_GATEWAY
                    )

            except Exception as e:
                print("Request error:", e)
                return Response(
                    {"error": "Failed to start the interview. Please try again later."},
                    status=status.HTTP_502_BAD_GATEWAY
                )

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Job.objects.filter(organization = self.request.user.organization,is_disabled=False)

    def perform_create(self, serializer):
        serializer.save(
            organization = self.request.user.organization,
            created_by = self.request.user,
            modified_by = self.request.user
        )

    def perform_update(self, serializer):
        serializer.save(modified_by = self.request.user)
