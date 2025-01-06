from django.contrib.auth import authenticate
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
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RecruiterSerializer(data=request.data)
        if serializer.is_valid():
            recruiter = serializer.save()

            refresh = RefreshToken.for_user(recruiter.user)

            return Response(
                {
                    "message": "Signup successful!",
                    "recruiter": serializer.data,
                    "tokens": {
                        "refresh": str(refresh),
                        "access": str(refresh.access_token),
                    },
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data["email"]
            password = serializer.validated_data["password"]
            user = authenticate(request, email=email, password=password)

            if user and hasattr(user, 'recruiter_profile'):
                refresh = RefreshToken.for_user(user)

                return Response(
                    {
                        "message": "Login successful!",
                        "tokens": {
                            "refresh": str(refresh),
                            "access": str(refresh.access_token),
                        },
                    },
                    status=status.HTTP_200_OK,
                )
            return Response(
                {"error": "Invalid email or password"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RecruiterViewSet(viewsets.ModelViewSet):
    queryset = Recruiter.objects.all()
    serializer_class = RecruiterSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Recruiter.objects.filter(user=self.request.user)


class CandidateViewSet(viewsets.ModelViewSet):
    queryset = Candidate.objects.all()
    serializer_class = CandidateSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Candidate.objects.filter(recruiter=self.request.user.recruiter_profile)

    def perform_create(self, serializer):
        serializer.save(recruiter=self.request.user.recruiter_profile)


class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Job.objects.filter(recruiter=self.request.user.recruiter_profile)

    def perform_create(self, serializer):
        serializer.save(recruiter=self.request.user.recruiter_profile)


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

        candidate = interview.candidate
        job = interview.job

        interview_details = {
            "candidate_name": candidate.name,
            "candidate_email": candidate.email,
            "candidate_resume": candidate.resume.url if candidate.resume else None,
            "job_title": job.title,
            "job_description": job.description,
            "recruiter_company": interview.scheduled_by.company_name,
        }

        # Clear the link (if you want to make it single-use)
        interview.link = None
        interview.save()

        # Redirect to actual interview session (e.g., video call link)
        redirect_link = "https://google.com"  # Replace with actual meeting link generation logic
        return redirect(redirect_link)
