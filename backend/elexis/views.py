from django.contrib.auth import authenticate
from django.db.models import Q
from elexis.utils.general import upsert_jd_vector, upsert_resume_vector
from elexis.services.ecs_task import ECSAIBotTaskService, ECSInterviewLanguages, ECSInterviewTaskContext
from elexis.services.daily import DailyMeetingService
from elexis.services.questions_generator import generate_questions, GeneratedQuestionsDto
from elexis.utils.summary_generation import resume_summary_generator , extract_text_from_pdf
# from elexis.utils.get_file_data_from_s3 import generate_signed_url
from django.core.mail import send_mail
from django.conf import settings
from django.shortcuts import redirect
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Recruiter, Candidate, Job, Interview, InterviewQuestions ,JobMatchingResumeScore, JobRequirementEvaluation, JobQuestions, SuggestedCandidates
from elexis.utils.general import getHumanReadableTime
from .serializers import (
    SuggestedCandidatesSerializer,
    RecruiterSerializer,
    CandidateSerializer,
    JobSerializer,
    InterviewSerializer,
    LoginSerializer,
    JobRequirementSerializer,
    ChangePasswordSerializer,
    StartInterviewSerializer,
    GeneratedQuestionsSerializer,
    QuestionsRequestSerializer,
    InterviewQuestionsSerializer,
    JobQuestionsSerializer,
    JobMatchingResumeScoreSerializer
)
from elexis.sqs_consumer import add_message_to_sqs_queue
from datetime import datetime, timedelta
from django.utils.timezone import make_aware, now
from django.shortcuts import redirect
import logging
from .services.pinecone_service import pinecone_client
from django.db.models import F, Sum, ExpressionWrapper, IntegerField
import os
from dotenv import load_dotenv      
from .mail_templates.interview_scheduled import interview_scheduled_template
import time
from django.db import transaction
load_dotenv()
CLIENT_URL = os.getenv("CLIENT_URL")
AWS_STORAGE_BUCKET_NAME= os.getenv("AWS_STORAGE_BUCKET_NAME")
logger = logging.getLogger(__name__)



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
        if self.request.query_params.get('include_interview_status', '').lower() == 'true':
            return Candidate.objects.filter(
                organization=self.request.user.organization
            ).prefetch_related(
                'interviews'
            )
        return Candidate.objects.filter(
            organization=self.request.user.organization
        )

    def perform_create(self, serializer):
        candidate = serializer.save(
            organization=self.request.user.organization,
            created_by=self.request.user,
            modified_by=self.request.user,
            recruiter=self.request.user,
        )
        resume_text = extract_text_from_pdf(candidate.resume.url) if candidate.resume else ""
        resume_embedding_id = upsert_resume_vector(candiate_name=candidate.name,
                                candidate_id=candidate.id,
                                resume_full_text=resume_text,
                                candidate_email=candidate.email,
                                namespace=f"{candidate.organization.org_name}_{candidate.organization.id}"
                                )
        candidate.resume_embedding_id = resume_embedding_id
        # if job Id is there , that means the candidate is getting created from a job details page , so do calculations like getMatchingScore with job description and store in JobMatchingResumeScore table with default stage
        if(self.request.query_params.get('job_id')):
            job_id = self.request.query_params.get('job_id')
            try:
                job = Job.objects.get(id=job_id, organization=self.request.user.organization)
                # get the embedding id of the job description
                jd_embedding_id = job.job_description_embedding_id
                if jd_embedding_id and resume_embedding_id:
                    try:
                        similarityScore = pinecone_client.get_similarity_between_stored_vectors(jd_embedding_id, resume_embedding_id, namespace=f"{job.organization.org_name}_{job.organization.id}")
                        print("Similarity Score", similarityScore)
                        JobMatchingResumeScoreInstance = JobMatchingResumeScore.objects.create(
                            job=job,
                            candidate=candidate,
                            score=similarityScore if similarityScore else 0,
                            created_by=self.request.user,
                            modified_by=self.request.user
                        )
                        # rank resume async job
                        print(f"rank-resumes added to Queue for jon: {job.id}")
                        add_message_to_sqs_queue(type='rank-resumes', data ={
                                    "jobId":str(job.id)
                            })
                        # calculate scores for all not archived jobs
                        print(f"job_resume_matching_score added to Queue for JobMatchingResumeScore : {JobMatchingResumeScoreInstance.id}")
                        add_message_to_sqs_queue(type='job_resume_matching_score',data ={
                            "id": str(JobMatchingResumeScoreInstance.id),
                        })
                        # evaluate resumeagainst a job via AI
                        print(f"ai_job_resume_evaluation added to Queue for JobMatchingResumeScore: {JobMatchingResumeScoreInstance.id}")
                        add_message_to_sqs_queue(type='ai_job_resume_evaluation', data={
                            "id": str(JobMatchingResumeScoreInstance.id),
                        })
                    except Exception as e:
                        print("CandidateViewset:: Error in getting similarity score between job and candidate resume", e)
                else:
                    print('JDembeddingid and resumeembedding id not found', jd_embedding_id, resume_embedding_id)
            except Job.DoesNotExist:
                print("Job with ID {} does not exist.".format(job_id))
        serializer.save(resume_embedding_id=resume_embedding_id)

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
          queryset = Interview.objects.all().order_by('-date', '-time')

        # Filter by the user (if authenticated and is a recruiter)
          if self.request.user.is_authenticated:
              queryset = queryset.filter(scheduled_by__organization_id=self.request.user.organization_id)

          job_id = self.request.query_params.get("job_id")
          candidate_id = self.request.query_params.get("candidate_id")
          status = self.request.query_params.get("status")
          if status:
               queryset = queryset.filter(status=status)
          if job_id:
            queryset = queryset.filter(job__id=job_id)     
          if candidate_id:
            queryset = queryset.filter(candidate__id=candidate_id)
            two_hours_ago = datetime.now() - timedelta(hours=2)
            todays_date_and_before_threshold = Q(date=two_hours_ago.date() ,time__lt= two_hours_ago.time())
            yesterdays_date = Q(date__lt= two_hours_ago.date())

            # Filter interviews that are scheduled and more than 2 hours old and update their status
            queryset.filter(
                Q(status='scheduled') & 
                (todays_date_and_before_threshold | yesterdays_date)).update(status='Not Joined')
          return queryset
        
        def perform_create(self,serializer):
         candidate = serializer.validated_data.get('candidate')  # Fetch the candidate data
         if candidate:
        # Set the organization based on the candidate's organization
            organization = candidate.organization
            interview = serializer.save(scheduled_by=self.request.user,organization=organization, created_by = self.request.user,
                modified_by = self.request.user)
            #  save copy of the job questions to the Interview questions table
            job_Questions = JobQuestions.objects.filter(job=interview.job)
            new_interview_questions_instances = []
            for question in job_Questions:
                new_interview_questions_instances.append(
                        InterviewQuestions(
                            interview=interview, 
                            question=question.question, 
                            sort_order=question.sort_order
                        )
            )
            if new_interview_questions_instances:
                InterviewQuestions.objects.bulk_create(new_interview_questions_instances)

            interview.link = f"{CLIENT_URL}/interviews/{interview.id}/start/"
            self._update_status_fields(interview)
            interview.save()
            subject, message = interview_scheduled_template(interview.scheduled_by.organization.org_name, interview.candidate.name, interview.job.job_name, interview.link, f"{interview.date} at {interview.time}", interview.scheduled_by.email)
    # Doing this here as this is the only place where a candidate gets associated with a Job
            resume_embedding_id = interview.candidate.resume_embedding_id
            jd_embedding_id = interview.job.job_description_embedding_id

            # TODO : check if the cosine similarity for this candidate's resume and jd is already present in DB , if not , get the cosine similarity and add it to the DB 
            if not resume_embedding_id:
                resume_text = extract_text_from_pdf(candidate.resume.url) if candidate.resume else ""
                resume_embedding_id = upsert_resume_vector(candiate_name=candidate.name,
                                        candidate_id=candidate.id,
                                        resume_full_text=resume_text,
                                        candidate_email=candidate.email,
                                        namespace=f"{candidate.organization.org_name}_{candidate.organization.id}"
                                        )
                candidate.resume_embedding_id = resume_embedding_id
                candidate.save(update_fields=['resume_embedding_id'])
            if not jd_embedding_id:
                jd_embedding_id = upsert_jd_vector(requirements_text=" ".join([req.requirement for req in interview.job.requirements.all()]), job=interview.job)
                interview.job.job_description_embedding_id = jd_embedding_id
                interview.job.save(update_fields=['job_description_embedding_id'])
                
            # If the candidate is associated with a job, calculate the similarity score between the resume and job description
            # and save it in the JobMatchingResumeScore table
            if resume_embedding_id and  jd_embedding_id:
                try:
                    #TODO if already score is present no work , else...
                    print("Resume Embedding ID", resume_embedding_id)
                    print("Job Description Embedding ID", jd_embedding_id)
                    similarityScoreObject = JobMatchingResumeScore.objects.filter(
                        job=interview.job,
                        candidate=interview.candidate,
                        stage='candidate_onboard').first()
                    similarityScore = similarityScoreObject.score if similarityScoreObject else None
                    if not similarityScore:
                        print("Calculating similarity score between job and resume")
                        # If the similarity score is not present, calculate it and save it
                        similarityScore = pinecone_client.get_similarity_between_stored_vectors(jd_embedding_id, resume_embedding_id, namespace=f"{interview.organization.org_name}_{interview.organization.id}")
    
                        
                    JobMatchingResumeScore.objects.filter(
                        job=interview.job,
                        candidate=interview.candidate,
                        stage__in=['candidate_onboard', 'selected_for_interview','completed_interview']).update(
                            is_archived=True
                        )
                    newJobMatchingResumeScore = JobMatchingResumeScore.objects.create(
                        job=interview.job,
                        candidate=interview.candidate,
                        score=similarityScore,
                        stage='scheduled_interview',
                        created_by=self.request.user,
                        modified_by=self.request.user,
                        organization=interview.organization,
                        is_archived=False,
                    )
                    newJobMatchingResumeScore.save()
                    print("New Job Matching Resume Score", newJobMatchingResumeScore)
                    interview.job_matching_resume_score = newJobMatchingResumeScore
                    interview.save(update_fields=['job_matching_resume_score'])
                    # Save the new JobMatchingResumeScore instance
                # in which stage you want to store this? if it is action taken from jobs oage , and what if interview scheduled from candidates page
                    pass
                except Exception as e:
                    print("Error hain bhai", e)
            try:
                send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [interview.candidate.email, interview.scheduled_by.email])
            except Exception as e:
                print("Email can't be sent", e)
            return Response(
                {"message": "Interview scheduled and email sent.", "link": interview.link},
                status=status.HTTP_201_CREATED,
            )
         else :
             raise ValueError("Candidate data is required to schedule an interview.")
        def perform_update(self, serializer):
            interview = serializer.save(modified_by = self.request.user)
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
        def info(self, request, pk=None):
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
            if not interview.meeting_room:
                daily_service = DailyMeetingService()
                room = daily_service.create_meeting_room()
                interview.meeting_room = room.room_url
                interview.save()
            return Response({
                "interviewId": str(interview.id),
                "candidateName": interview.candidate.name,
                "jobName": interview.job.job_name,
                "date": interview.date.strftime("%Y-%m-%d"),
                "time": interview.time.strftime("%H:%M"),
                "language": interview.language,
                "isEarly": False,
                "requiresCtcInfo": interview.job.ask_for_ctc_info,
                "requiresReasonForLeavingJob": interview.job.ask_for_reason_for_leaving_previous_job,
                "availableLanguages": interview.job.allowed_interview_languages.split(","),
                "expectedCtc": interview.expected_ctc,
                "currentCtc": interview.current_ctc,
                "reasonForLeaving": interview.reason_for_leaving_previous_job,
            })

        @action(detail=True, methods=["post"], permission_classes=[AllowAny])
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
                serializer = StartInterviewSerializer(interview , data = request.data, partial=True)
                if not serializer.is_valid():
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                else :
                    serializer.save()
                candidate = interview.candidate
                interview_questions = InterviewQuestions.objects.filter(interview=interview).order_by('sort_order')
                list_of_question_strings = [question_obj.question for question_obj in interview_questions]
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
                        daily_api_key=settings.DAILY_API_KEY,
                        questions = list_of_question_strings
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
        return Job.objects.filter(organization = self.request.user.organization,is_disabled=False).select_related('recruiter').prefetch_related('requirements')

    def perform_create(self, serializer):
        job = serializer.save(
            organization = self.request.user.organization,
            created_by = self.request.user,
            modified_by = self.request.user
        )
        jd_embedding_id = upsert_jd_vector(requirements_text=" ".join([req.requirement for req in job.requirements.all()]), job=job)
        # serializer.save(job_description_embedding_id=job_embedding_id)
        job.job_description_embedding_id = jd_embedding_id
        job.save(update_fields=['job_description_embedding_id'])

        
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
            interviewId = str(interviewId[0]) if isinstance(interviewId, tuple) else str(interviewId)
            if interviewId in response:
                response[interviewId]["evaluations"][requirementName]= requirementevaluation
                response[interviewId]["totalScore"] = response[interviewId]["totalScore"] + requirementevaluation['weightedScore']
            else:
                response[interviewId]={"evaluations":{requirementName : requirementevaluation},
                "totalScore": requirementevaluation['weightedScore'],
                "candidateName": evaluation["candidates_name"],
                "candidateId": candidateId,
                "interviewId":interviewId
                }

            
        # print("Response of ranked candidates:::", response)
        return Response({"candidateEvaluations":response,
                         "criterias":  JobRequirementSerializer(job.requirements, many=True).data
                         })
    @action(detail=False, methods=['get'])
    def not_associated_jobs(self, request, pk=None):
        """
        Returns jobs that a candidate is not yet associated with.
        """
        candidate_id = request.query_params.get('candidate_id')
        if not candidate_id:
            return Response({'error': 'Candidate ID is required.'}, status=400)

        # Get the queryset for all jobs
        queryset = self.get_queryset()

        # Get the list of job IDs the candidate is already associated with
        associated_job_ids = JobMatchingResumeScore.objects.filter(
            candidate__id=candidate_id
        ).values_list('job_id', flat=True).distinct()

        # Filter out jobs that are already associated with the candidate
        not_associated_jobs = queryset.exclude(id__in=associated_job_ids)

        serializer = self.get_serializer(not_associated_jobs, many=True)

        return Response(serializer.data)


class JobQuestionsViewSet(viewsets.ModelViewSet):
    queryset = JobQuestions.objects.all().order_by('sort_order')
    serializer_class = JobQuestionsSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        queryset = JobQuestions.objects.all().order_by('sort_order')
        job_id = self.request.query_params.get('job_id', None)
        if job_id is not None:
            queryset = queryset.filter(job__id=job_id)
        return queryset
    def create(self, request, *args, **kwargs):
        job_id = self.request.query_params.get('job_id', None)
        if not job_id:
            return Response({"error": "job_id is required."}, status=status.HTTP_400_BAD_REQUEST)
        # get all the questions associated with the job and delete them
        job_questions = JobQuestions.objects.filter(job__id=job_id)
        if job_questions.exists():
            job_questions.delete()
        serializer = self.get_serializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        serializer.save(job_id=job_id)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
class InterviewQuestionsViewSet(viewsets.ModelViewSet):
    queryset = InterviewQuestions.objects.all().order_by('sort_order') # Order by sort_order by default
    serializer_class = InterviewQuestionsSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        queryset = InterviewQuestions.objects.all().order_by('sort_order')
        interview_id = self.request.query_params.get('interview_id', None)
        if interview_id is not None:
            queryset = queryset.filter(interview__id=interview_id)
        return queryset
    def create(self, request, *args, **kwargs):
        interview_id = self.request.query_params.get('interview_id', None)
        if not interview_id:
            return Response({"error": "interview_id is required."}, status=status.HTTP_400_BAD_REQUEST)
        # get all the questions associated with the interview and delete them
        interview_questions = InterviewQuestions.objects.filter(interview__id=interview_id)
        if interview_questions.exists():
            interview_questions.delete()
        serializer = self.get_serializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        serializer.save(interview_id=interview_id)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class QuestionsGeneratorAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, *args, **kwargs):
        input_serializer = QuestionsRequestSerializer(data=request.data)
        input_serializer.is_valid(raise_exception=True)

       
        validated_input_data = input_serializer.validated_data
        role = validated_input_data['role']
        job_description = validated_input_data['job_description']
        interview_id = validated_input_data['interview_id']
        # num_resume_questions = validated_input_data['num_resume_questions']
        # num_job_role_questions = validated_input_data['num_job_role_questions']
        # num_job_role_experience_questions = validated_input_data['num_job_role_experience_questions']
        resume = ""
        if interview_id:
            # If interview_id is provided, fetch the interview object
            try:
                interview = Interview.objects.get(id=interview_id)
                resume_url = interview.candidate.resume.url
                if resume_url:
                    resume = resume_summary_generator(resume_url)
                    print("Resume Summary Generated:", resume)
            except Interview.DoesNotExist:
                return Response({"error": "Interview not found."}, status=status.HTTP_404_NOT_FOUND)
        generated_questions = generate_questions(role=role,
                                                  job_description=job_description,
                                                  resume_summary=resume, # think how to get the summary
                                                #   num_resume_questions=num_resume_questions,
                                                #   num_job_role_questions=num_job_role_questions,
                                                #   num_job_role_experience_questions=num_job_role_experience_questions
                                                  )
        generated_questions_dto = GeneratedQuestionsDto(
            resume=generated_questions.resume if interview_id else [], # interview_id will only be present when this method is invoked form the interview details page
            job_role=generated_questions.job_role,
            job_role_experience=generated_questions.job_role_experience if interview_id else [],
        )

        output_serializer = GeneratedQuestionsSerializer(generated_questions_dto)

        return Response(output_serializer.data, status=status.HTTP_200_OK)

class JobMatchingResumeScoreViewSet(viewsets.ModelViewSet):
    queryset = JobMatchingResumeScore.objects.all()
    serializer_class = JobMatchingResumeScoreSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = JobMatchingResumeScore.objects.all()
        jobId = self.request.query_params.get('job_id', '')
        isArchived = self.request.query_params.get('is_archived', 'false').lower() == 'true'
        stage = self.request.query_params.get('stage', '')
        if stage:
            queryset = queryset.filter(stage=stage)
        if jobId:
            queryset = queryset.filter(job__id=jobId)
        if isArchived:
            queryset = queryset.filter(is_archived=True)
        else:
            queryset = queryset.filter(is_archived=False)
        queryset = queryset.prefetch_related('interviews').select_related('candidate', 'created_by' , 'modified_by').order_by('-score')
        if stage == 'candidate_onboard' and self.request.method == 'GET':
            # If the stage is 'candidate_onboard', we want to prefetch related AI evaluations
            return queryset.prefetch_related('ai_evaluations')
        else:
            return queryset


    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user, modified_by=self.request.user, organization=self.request.user.organization)
    
    def perform_update(self, serializer):
        serializer.save(modified_by=self.request.user)

    def create(self, request, *args, **kwargs):
        # Check if the request data is a list (for bulk create)
        if isinstance(request.data, list):
            # Use a transaction to ensure all or none are created
            with transaction.atomic():
                serializers = []
                for item_data in request.data:
                    serializer = self.get_serializer(data=item_data)
                    serializer.is_valid(raise_exception=True)
                    self.perform_create(serializer) # Calls the viewset's perform_create
                    serializers.append(serializer)
                return Response([s.data for s in serializers], status=status.HTTP_201_CREATED)
        else:
            # Fallback to default single object creation
            return super().create(request, *args, **kwargs)

    @action(detail=False, methods=['post'], url_path='bulk_create')
    def bulk_create(self, request, *args, **kwargs):
        try:
            if not isinstance(request.data, list):
                return Response(
                    {"detail": "Request data must be a list of objects for bulk creation."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Validate the incoming list of data using the serializer with many=True
            serializer = self.get_serializer(data=request.data, many=True)
            serializer.is_valid(raise_exception=True)

            # Prepare instances for bulk_create
            instances_to_create = []
            request_user = request.user
            organization = request_user.organization if request_user and hasattr(request_user, 'organization') else None

            for item_data in serializer.validated_data:
                # Create a model instance from validated data
                instance = JobMatchingResumeScore(**item_data)

                # Manually set fields that perform_create would normally handle
                instance.created_by = request_user
                instance.modified_by = request_user

                if not instance.organization_id and organization:
                    instance.organization = organization

                instances_to_create.append(instance)

            with transaction.atomic():
                # Use bulk_create for efficient insertion
                created_objects = JobMatchingResumeScore.objects.bulk_create(instances_to_create)
                response_serializer = self.get_serializer(created_objects, many=True)
                # add these score calculation to queue and process later
                def after_commit():
                    jobIds = set()
                    for item in response_serializer.data :
                        # calculate score via Vector db
                        print(f"bulk update: job_resume_matching_score added to Queue for JobMatchingResumeScore : {item['id']}")
                        add_message_to_sqs_queue(type='job_resume_matching_score',data ={
                            "id": item["id"]
                        })
                        # get AI opinion on matching
                        print(f"bulk update : ai_job_resume_evaluation added to Queue for JobMatchingResumeScore : {item['id']}")
                        add_message_to_sqs_queue(type='ai_job_resume_evaluation', data={
                            "id": item["id"],
                        })
                        jobIds.add(item['job'])
                    if jobIds:
                        print('JobIds', jobIds)
                        for item in jobIds:
                            add_message_to_sqs_queue(type='rank-resumes', data ={
                                    "jobId":str(item)
                            })
                transaction.on_commit(after_commit)
                return Response(response_serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response(
        {"detail": f"Internal server error: {str(e)}"},
        status=status.HTTP_500_INTERNAL_SERVER_ERROR
    )
        

class SuggestedCandidatesViewSet(viewsets.ModelViewSet):
    """
    Viewset for suggested candidates based on job matching scores.
    """

    queryset = SuggestedCandidates.objects.all()
    serializer_class = SuggestedCandidatesSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        job_id = self.request.query_params.get('job_id', None)
        if not job_id:
            # Filter by job_id if provided
            raise ValueError("job_id query parameter is required.")
        # Filter queryset based on job_id
        queryset = SuggestedCandidates.objects.filter(job_id=job_id).prefetch_related('candidate', 'job', 'aiResumeMatchingResponse')
        return queryset
    

    def list(self, request, *args, **kwargs):
        job_id = request.query_params.get('job_id', None)
        if not job_id:
            return Response({"error": "job_id query parameter is required."}, status=status.HTTP_400_BAD_REQUEST)

        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        data = serializer.data
        if not data:
            # run async job which invlves getting top 5 resumes for current Job
            # generate aiEvaluation for the matching score of those resumes 
            job = Job.objects.get(id=job_id, organization=self.request.user.organization)
            jdEmbeddingId = job.job_description_embedding_id
            print("Job Description Embedding ID", jdEmbeddingId)
            if not jdEmbeddingId:
                return Response({"error": "Job description embedding not found."}, status=status.HTTP_404_NOT_FOUND)
            jdVectors = pinecone_client.fetch_vectors(ids=[job.job_description_embedding_id], namespace= f"{job.organization.org_name}_{job.organization.id}")
            print("Job Description Vectors", jdVectors)
            jdVector = jdVectors.get(job.job_description_embedding_id, None)

            if not jdVector:
                return Response({"error": "Job description embedding not found."}, status=status.HTTP_404_NOT_FOUND)
            alreadyPresentCandidates = list(JobMatchingResumeScore.objects.filter(job=job).values_list('candidate__resume_embedding_id', flat=True))
            print("Already Present Candidates", alreadyPresentCandidates)
            matchingResumes = pinecone_client.query_vectors(vector=jdVector , top_k=5, namespace= f"{job.organization.org_name}_{job.organization.id}", filters={
                "type":"resume",
                "resume_id": {"$nin": alreadyPresentCandidates}
            })
            print("top_5_vectors", len(matchingResumes))
            for i in range(len(matchingResumes)):
                add_message_to_sqs_queue(type='generate_candidate_suggestion', data={
                    "jobId": job_id,
                    "candidateId": matchingResumes[i].get('id').split("resume-")[1]
                })
            # [{'id': 'resume-ac81b92e-ec75-40d6-a941-dcc2bbc30c8a', 'score': 0.676782429, 'metadata': {'candidate_email': 'ronihere4work@gmail.com', 'candidate_name': 'Java Selenium Roni 19', 'resume_id': 'resume-ac81b92e-ec75-40d6-a941-dcc2bbc30c8a', 'type': 'resume'}}, {'id': 'resume-a54ae476-a728-4641-b5b1-66ed47d607bb', 'score': 0.676782429, 'metadata': {'candidate_email': 'ronihere4work@gmail.com', 'candidate_name': 'Java Selenium Roni 17', 'resume_id': 'resume-a54ae476-a728-4641-b5b1-66ed47d607bb', 'type': 'resume'}}, {'id': 'resume-c4b43538-25cb-4c0d-b5fd-67fb9560bbb0', 'score': 0.676782429, 'metadata': {'candidate_email': 'ronihere4work@gmail.com', 'candidate_name': 'Java Selenium Roni 18', 'resume_id': 'resume-c4b43538-25cb-4c0d-b5fd-67fb9560bbb0', 'type': 'resume'}}, {'id': 'resume-9669b808-3e4e-4c22-84a8-8795468463c7', 'score': 0.676782429, 'metadata': {'candidate_email': 'ronihere4work@gmail.com', 'candidate_name': 'Java Selenium Roni 21', 'resume_id': 'resume-9669b808-3e4e-4c22-84a8-8795468463c7', 'type': 'resume'}}, {'id': 'resume-aa491636-080f-4c99-91c9-d91c5cbe474c', 'score': 0.676782429, 'metadata': {'candidate_email': 'ronihere4work@gmail.com', 'candidate_name': 'Java Selenium Roni 25', 'resume_id': 'resume-aa491636-080f-4c99-91c9-d91c5cbe474c', 'type': 'resume'}}]
            # add_message_to_sqs_queue(type='suggested_candidates', data={
            #     "jobId": job_id,
            #     "top5Vectors": top_5_vectors,
            # })

            return Response(
                {"message": "No suggested candidates found. Running background job to fetch suggestions."},
                status=status.HTTP_200_OK
            )
        return Response(serializer.data)
    