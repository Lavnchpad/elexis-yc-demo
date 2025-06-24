from django.contrib.auth import authenticate
# from django_filters import CharFilter, FilterSet
# from django_filters.rest_framework import DjangoFilterBackend
from elexis.services.ecs_task import ECSAIBotTaskService, ECSInterviewLanguages, ECSInterviewTaskContext
from elexis.services.daily import DailyMeetingService
from rest_framework.exceptions import PermissionDenied
from elexis.utils.get_file_data_from_s3 import generate_signed_url
from django.core.mail import send_mail
from django.conf import settings
from django.shortcuts import redirect
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Recruiter, Candidate, Job, Interview, JobRequirement , JobRequirementEvaluation
from elexis.utils.general import getHumanReadableTime
from .serializers import (
    RecruiterSerializer,
    CandidateSerializer,
    JobSerializer,
    InterviewSerializer,
    LoginSerializer,
    JobRequirementSerializer,
    ChangePasswordSerializer,
)
from datetime import datetime, timedelta
from django.utils.timezone import make_aware, now
from django.shortcuts import redirect
import requests
from django.db.models import F, Sum, ExpressionWrapper, IntegerField
import os
from dotenv import load_dotenv      
# from django.core.files.storage import default_storage
# print("default storage is::: ",default_storage.__class__)
from .mail_templates.interview_scheduled import interview_scheduled_template
import time
load_dotenv()
CLIENT_URL = os.getenv("CLIENT_URL")
AWS_STORAGE_BUCKET_NAME= os.getenv("AWS_STORAGE_BUCKET_NAME")


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
    
    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated])
    def change_password(self, request):
        serializer = ChangePasswordSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)

        user = request.user
        user.set_password(serializer.validated_data['new_password'])
        user.save()

        return Response({'message': 'Password changed successfully'}, status=status.HTTP_200_OK)

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
    
    @action(detail=True, methods=["get"], permission_classes=[IsAuthenticated],url_path="signed-urls")
    def get_signed_urls(self, request, pk=None):
        try:
            candidate = self.get_object()

            want_resume = request.query_params.get("resume") == "true"
            want_photo = request.query_params.get("profile_photo") == "true"
            urls={}
            if want_photo and candidate.profile_photo :
                # urls["profile_photo"] = generate_signed_url(AWS_STORAGE_BUCKET_NAME,candidate.profile_photo.url,3600)
                urls["profile_photo"]= candidate.profile_photo.url
            if want_resume and candidate.resume:
                # urls["resume"] = generate_signed_url(AWS_STORAGE_BUCKET_NAME,candidate.resume.url,3600)
                urls["resume"]= candidate.resume.url
            if not urls:
                return Response({"error": "No requested files available."}, status=status.HTTP_404_NOT_FOUND)
            return Response(urls)

        except Exception as e:
            print("Error in Candidateviewset ---> get_signed_urls meythod:::", e)
            return Response({"error": "Something went wrong."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class InterviewViewSet(viewsets.ModelViewSet):
        queryset = Interview.objects.all()
        serializer_class = InterviewSerializer
        permission_classes = [IsAuthenticated]

        def get_queryset(self):
          queryset = Interview.objects.all()

        # Filter by the user (if authenticated and is a recruiter)
          if self.request.user.is_authenticated:
              queryset = queryset.filter(scheduled_by__organization_id=self.request.user.organization_id)

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
            subject, message = interview_scheduled_template(interview.scheduled_by.organization.org_name, interview.candidate.name, interview.job.job_name, interview.link, f"{interview.date} at {interview.time}", interview.scheduled_by.email)
            try:
                send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [interview.candidate.email, interview.scheduled_by.email])
            except Exception as e:
                print("Email can't be sent", e)

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

            final_statuses = {'ended', 'accepted', 'rejected', 'hold'}      
            if interview.status in final_statuses:
                print('Ended already')
                return
            elif interview.transcript and interview.status not in final_statuses:
                interview.status = 'ended'
            elif interview.meeting_room and interview.status != 'started':
                interview.status = 'started'
            elif (interview.link and interview.status != 'scheduled' and not interview.meeting_room) :
                interview.status = 'scheduled'

        
        @action(detail=True, methods=["get"], permission_classes=[AllowAny])
        def start(self, request, pk=None):
            try:
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
                    print("current time:::", current_time , interview_end)
                    return Response(
                        {"message": "This interview link has expired. Please contact the recruiter to reschedule.",
                        "isEarly": False},
                        status=status.HTTP_400_BAD_REQUEST,
                    )
                daily_service = DailyMeetingService()
                # if meeting room already exists , then return that everytime, if the user is withing the time frame of the interview
                if not interview.meeting_room:
                    
                    room = daily_service.create_meeting_room()
                    interview.meeting_room = room.room_url
                    interview.save()
                print("Meeting room created or already exists:", interview.meeting_room)
                candidate = interview.candidate

                # data= {
                # "name":candidate.name,
                # "candidate_email": candidate.email,
                # "interviewer_email":candidate.recruiter.email,
                # "role":interview.job.job_name,
                # "company_name": candidate.recruiter.organization.org_name,
                # "interviewer_name": "Arya",
                # "candidate_voice_clone": "India Accent (Female)",
                # "is_dashboard_request": True,
                # "record_interview": True,
                # "language" : interview.language,
                # "job_description_text": interview.job.job_description,

                # }
                tries = 5
                print(interview.ecs_task_created, tries)
                while (not interview.ecs_task_created) and tries > 0:
                    tries -=1
                    interview.ecs_task_created = True
                    interview.save()
                    ecs_interview_service = ECSAIBotTaskService()
                    task_created = ecs_interview_service.run_task(interview_context=ECSInterviewTaskContext(
                        candidate_id=str(candidate.id),
                        interview_id=str(interview.id),
                        company_name=candidate.recruiter.organization.org_name,
                        role=interview.job.job_name,
                        candidate_name=candidate.name,
                        room_url=interview.meeting_room,
                        room_name= daily_service.get_name_from_url(interview.meeting_room),
                        language= ECSInterviewLanguages(interview.language),  # Assuming Language is an enum or similar
                        record_interview=True,
                        interview_type="technical",
                        resume_s3_url=candidate.resume.url if candidate.resume else "",
                        resume_bucket=settings.AWS_STORAGE_BUCKET_NAME,
                        resume_bucket_region=settings.AWS_S3_REGION_NAME,
                        job_description=interview.job.job_description,
                        daily_api_key=settings.DAILY_API_KEY
                    ))
                    print("Task Created", task_created)
                    interview.ecs_task_created = task_created
                    interview.save()
                    time.sleep(10) # Giving some time for the task to be created
                    print("ECS Task created status:", interview.ecs_task_created)
                    return Response(
                                {"message": "Interview starting...", "url": interview.meeting_room},
                                status=status.HTTP_200_OK)
                return Response(
                                {"message": "Interview starting...", "url": interview.meeting_room},
                                status=status.HTTP_200_OK)
                
                            
            except:
                return Response(
                    {"error": "Failed to start the interview. Please try again later."},
                    status=status.HTTP_502_BAD_GATEWAY
                )

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Job.objects.filter(organization = self.request.user.organization,is_disabled=False).prefetch_related('requirements')

    def perform_create(self, serializer):
        serializer.save(
            organization = self.request.user.organization,
            created_by = self.request.user,
            modified_by = self.request.user
        )
    def perform_update(self, serializer):
        serializer.save(modified_by = self.request.user)

    @action(detail=True, methods=['get'])
    def ranked_candidates(self, request, pk=None):
        job = self.get_object()
        evaluations = JobRequirementEvaluation.objects.filter(
            job_requirement__job=job
            ).annotate(
                requirement_name=F('job_requirement__requirement'),
                requirement_id=F('job_requirement__id'),
                interviewId=F('interview_id'),
                interviewDate=F('interview__date'),
                weightage=F('job_requirement__weightage'),
                candidates_id=F('candidate__id'),
                candidates_name=F('candidate__name'),
                weighted_score=ExpressionWrapper(
                    F('rating') * F('job_requirement__weightage'),
                    output_field=IntegerField()
                )
            ).values(
                'candidates_id',
                'interviewId',
                'candidates_name',
                'interviewDate',
                'requirement_name',
                'requirement_id',
                'weightage',
                'rating',
                'weighted_score',
                'remarks',
            ).order_by(
                "-weighted_score"
            )
        response = {}
        for evaluation in evaluations:
            candidateId = str(evaluation["candidates_id"])
            requirementName = str(evaluation["requirement_id"])
            interviewId=str(evaluation["interviewId"]),
            requirementevaluation = {
                "remarks":evaluation["remarks"],
                "weightage": evaluation["weightage"],
                "weightedScore":evaluation["weighted_score"],
                "rating":evaluation["rating"],
                "requirementName": evaluation["requirement_name"],
                }
            if candidateId in response:
                response[candidateId]["evaluations"][requirementName]= requirementevaluation
                response[candidateId]["totalScore"] = response[candidateId]["totalScore"] + requirementevaluation['weightedScore']
            else:
                response[candidateId]={"evaluations":{requirementName : requirementevaluation},
                "totalScore": requirementevaluation['weightedScore'],
                "candidateName": evaluation["candidates_name"],
                "candidateId": candidateId,
                "interviewId":interviewId
                }

            
        # print("Response of ranked candidates:::", response)
        return Response({"candidateEvaluations":response,
                         "criterias":  JobRequirementSerializer(job.requirements, many=True).data
                         })

