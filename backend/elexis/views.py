from django.contrib.auth import authenticate
from django_filters import CharFilter, FilterSet
from django_filters.rest_framework import DjangoFilterBackend
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
from .serializers import (
    RecruiterSerializer,
    CandidateSerializer,
    JobSerializer,
    InterviewSerializer,
    LoginSerializer,
)
from datetime import datetime, timedelta
from django.utils.timezone import make_aware, now


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
            if user:
                # Generate tokens
                refresh = RefreshToken.for_user(user)
                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
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
        candidate = self.get_object()

        link = f"http://127.0.0.1:8000/elexis/candidate/{pk}/start_interview"
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
        if self.request.user.is_authenticated and hasattr(self.request.user, "recruiter_profile"):
            return Interview.objects.filter(scheduled_by=self.request.user.recruiter_profile)
        return Interview.objects.all()

    def perform_create(self, serializer):
        interview = serializer.save(scheduled_by=self.request.user.recruiter_profile)
        interview.link = f"http://127.0.0.1:8001/interviews/{interview.id}/start/"
        interview.save()

        subject = "Interview Scheduled"
        message = (
            f"Dear {interview.candidate.name},\n\n"
            f"You have an interview scheduled for '{interview.job.title}' on {interview.date} at {interview.time}.\n"
            f"Click here to join: {interview.link}\n\n"
            f"Best regards,\n{interview.scheduled_by.company_name}"
        )
        send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [interview.candidate.email])

        return Response(
            {"message": "Interview scheduled and email sent.", "link": interview.link},
            status=status.HTTP_201_CREATED,
        )

    @action(detail=True, methods=["get"], permission_classes=[AllowAny])
    def start(self, request, pk=None):
        try:
            interview = self.get_object()
        except Interview.DoesNotExist:
            return Response({"message": "Invalid link or interview not found."}, status=status.HTTP_404_NOT_FOUND)

        current_time = now()
        interview_start = make_aware(datetime.combine(interview.date, interview.time))
        interview_end = interview_start + timedelta(hours=1)

        if not (interview_start <= current_time <= interview_end):
            return Response(
                {"message": "This link is not valid at this time. Please check your scheduled interview time."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        interview.link = None
        interview.save()

        return redirect("https://google.com")


class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Job.objects.filter(organization = self.request.user.organization)

    def perform_create(self, serializer):
        serializer.save(
            organization = self.request.user.organization,
            created_by = self.request.user,
            modified_by = self.request.user
        )

    def perform_update(self, serializer):
        serializer.save(modified_by = self.request.user)
