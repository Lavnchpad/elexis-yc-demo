from rest_framework import serializers
from .models import Recruiter, Candidate, Job, Interview, Snapshots , JobRequirement, JobQuestions, InterviewQuestions
from django.contrib.auth.password_validation import validate_password
from elexis.utils.get_file_data_from_s3 import generate_signed_url
from dotenv import load_dotenv
import os
load_dotenv()
AWS_TRANSCRIPT_BUCKET_NAME=os.getenv("AWS_TRANSCRIPT_BUCKET_NAME")
class RecruiterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recruiter
        fields = ('id', 'email', 'name', 'company_name', 'password', 'organization', 'is_admin', 'can_manage_users', 'can_manage_jobs')
        extra_kwargs = {
            'password': {'write_only': True,'required': False},
            'email': {'required': True},
            'organization': {'read_only': True}
        }

    def create(self, validated_data):
        return Recruiter.objects.create_user(**validated_data)

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        if password:
            instance.set_password(password)
        return super().update(instance, validated_data)
class JobQuestionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobQuestions
        fields = ['id', 'question', 'sort_order']
        read_only_fields= ('job',) # while creating a job and adding questions to it , we don't have the jobId as the job is not created yet , that is why kept it as read only
class JobRequirementSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobRequirement
        fields = ['id','requirement', 'weightage']
class JobSerializer(serializers.ModelSerializer):
    requirements = JobRequirementSerializer(many=True)
    questions = JobQuestionsSerializer(many=True, required=False, allow_empty=True)
    allowed_interview_languages = serializers.CharField(
        help_text="Comma-separated list of allowed interview languages, default is English if not provided.",
        required=False,
        default="english"
    )

    class Meta:
        model = Job
        read_only_fields = ('recruiter', 'organization')
        fields = [
            'job_name', 'id', 'additional_data', 'location', 'min_ctc', 'max_ctc', 'job_description',
            'requirements', 'questions', 'recruiter', 'organization', 'allowed_interview_languages',
            'ask_for_reason_for_leaving_previous_job', 'ask_for_ctc_info'
        ]

    def to_representation(self, instance):
        """Return allowed_interview_languages as a list in the output."""
        ret = super().to_representation(instance)
        ret['allowed_interview_languages'] = instance.allowed_interview_languages.split(",") if instance.allowed_interview_languages else ["english"]
        return ret

    def create(self, validated_data):
        validated_data['recruiter'] = self.context['request'].user
        requirements_data = validated_data.pop('requirements')
        questions_data = validated_data.pop('questions', None)
        job = Job.objects.create(**validated_data)
        if questions_data is not None:
            for question in questions_data:
                JobQuestions.objects.create(job=job, **question)
        if requirements_data is not None:
            for req in requirements_data:
                JobRequirement.objects.create(job=job, **req)
        return job

    def update(self, instance, validated_data):
        requirements_data = validated_data.pop('requirements', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        if requirements_data is not None:
            instance.requirements.all().delete()
            for req_data in requirements_data:
                JobRequirement.objects.create(job=instance, **req_data)
        return instance
 
    
class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True, validators=[validate_password])

    def validate_old_password(self, value):
        user = self.context['request'].user
        print("User", user , value)
        if not user.check_password(value):
            raise serializers.ValidationError("Old password is not correct")
        return value

    def validate(self, attrs):
        if attrs['old_password'] == attrs['new_password']:
            raise serializers.ValidationError("New password must be different from the old password.")
        return attrs
class CandidateSerializer(serializers.ModelSerializer):
    status = serializers.SerializerMethodField()
    class Meta:
        model = Candidate
        fields = '__all__'
        read_only_fields = ('recruiter','organization')
    def validate(self, data):
        # Exclude 'organization' validation
        data.pop('organization', None)
        return data    
    def get_status(self, obj):
        request = self.context.get('request')

        # Check if the 'include_status' query parameter exists and is set to 'true' (or any value)
        if request and request.query_params.get('include_interview_status', '').lower() == 'true':
            interviews = obj.interviews.all()

            CANDIDATE_STATUS_ACCEPTED = 'accepted'
            CANDIDATE_STATUS_REJECTED = 'rejected'
            CANDIDATE_STATUS_WAITING_FOR_DECISION = 'pending'
            CANDIDATE_STATUS_HOLD = 'hold'
            CANDIDATE_STATUS_REGISTERED = 'registered'
            CANDIDATE_STATUS_NO_INTERVIEWS = None

            # Priority 1: Accepted
            if interviews.filter(status='accepted').exists():
                return CANDIDATE_STATUS_ACCEPTED

            # Priority 2: Rejected (if no 'accepted' interview exists)
            elif interviews.filter(status='rejected').exists():
                return CANDIDATE_STATUS_REJECTED

            # Priority 3: Hold (if no 'accepted', 'rejected', or 'ended' exists)
            if interviews.filter(status='hold').exists():
                return CANDIDATE_STATUS_HOLD
            # Priority 4: Ended (if no 'accepted' or 'rejected' exists)
            # Assuming 'ended' implies waiting for a decision
            elif interviews.filter(status='ended').exists():
                return CANDIDATE_STATUS_WAITING_FOR_DECISION

            # Priority 5: Started or Registered or Scheduled
            # If any interview is 'started', 'registered', or 'scheduled', the candidate is 'Registered' (or 'In Progress')
            if interviews.filter(status__in=['started', 'registered', 'scheduled']).exists():
                return CANDIDATE_STATUS_REGISTERED

            # If none of the above, it means there are no relevant interviews or no interviews at all
            return CANDIDATE_STATUS_NO_INTERVIEWS
        else:
            return None

class SnapshotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Snapshots
        fields = '__all__'

class InterviewQuestionsSerializer(serializers.ModelSerializer):
    isFromDb = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = InterviewQuestions
        # fields = ['id', 'question', 'sort_order']
        fields = '__all__'

    def get_isFromDb(self, obj):
        return True

    def validate_interview(self, value):
        if not Interview.objects.filter(id=value.id).exists():
            raise serializers.ValidationError("Interview with this ID does not exist.")
        return value

class InterviewSerializer(serializers.ModelSerializer):
    candidate = CandidateSerializer(read_only=True)
    interview_questions = InterviewQuestionsSerializer(many=True, partial=True, required=False)
    job = JobSerializer(read_only=True)
    candidate_id = serializers.PrimaryKeyRelatedField(
        queryset=Candidate.objects.all(), source='candidate', write_only=True
    )
    job_id = serializers.PrimaryKeyRelatedField(
        queryset=Job.objects.all(), source='job', write_only=True
    )
    snapshots = serializers.SerializerMethodField()
    transcript = serializers.SerializerMethodField() 
    class Meta:
        model = Interview
        fields = [
    'candidate',
    'candidate_id',
    'created_by',
    'created_date',
    'interview_questions',
    'current_ctc',
    'date',
    'ecs_task_created',
    'expected_ctc',
    'experience',
    'id',
    'job',
    'job_id',
    'language',
    'link',
    'meeting_room',
    'modified_by',
    'modified_date',
    'organization',
    'reason_for_leaving_previous_job',
    'scheduled_by',
    'skills',
    'snapshots',
    'status',
    'summary',
    'time',
    'transcript'
]
        read_only_fields = ('scheduled_by', 'link','recruiter','organization')
    def get_snapshots(self, obj):
        snapshots = Snapshots.objects.filter(interview=obj)
        for snapshot in snapshots:
            snapshot.video = [generate_signed_url(AWS_TRANSCRIPT_BUCKET_NAME, vid_url.replace("://", "").split("/", 1)[-1])
                              for vid_url in snapshot.video]
        return SnapshotSerializer(snapshots, many=True).data
    
    def get_transcript(self, obj):
        if not obj.transcript:
            return None

        try:
            return generate_signed_url(AWS_TRANSCRIPT_BUCKET_NAME, obj.transcript.replace("://", "").split("/", 1)[-1])
        except:
            return None

class StartInterviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interview
        fields = [
            'expected_ctc',
            'current_ctc',
            'reason_for_leaving_previous_job',
            'language'
        ]

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

class GeneratedQuestionsSerializer(serializers.Serializer):
    resume = serializers.ListField(
        child=serializers.CharField(max_length=500),
        help_text="List of questions derived from the resume."
    )
    job_role = serializers.ListField(
        child=serializers.CharField(max_length=500),
        help_text="List of questions related to the job role."
    )
    job_role_experience = serializers.ListField(
        child=serializers.CharField(max_length=500),
        help_text="List of questions about job role-specific experience."
    )


class QuestionsRequestSerializer(serializers.Serializer):
    role = serializers.CharField(max_length=255, required=True)
    job_description = serializers.CharField(required=True)
    interview_id = serializers.CharField(required=False, allow_null=True, default=None) # with the interview id in req , we will get the resume
    # resume_summary = serializers.BooleanField(required=False, allow_blank=True, default=False)
    num_resume_questions = serializers.IntegerField(required=False, default=3)
    num_job_role_questions = serializers.IntegerField(required=False, default=3)
    num_job_role_experience_questions = serializers.IntegerField(required=False, default=3)
