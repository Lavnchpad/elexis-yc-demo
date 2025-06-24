from rest_framework import serializers
from .models import Recruiter, Candidate, Job, Interview, Snapshots , JobRequirement
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

class JobRequirementSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobRequirement
        fields = ['id','requirement', 'weightage']
class JobSerializer(serializers.ModelSerializer):
    requirements = JobRequirementSerializer(many=True)
    class Meta:
        model = Job
        fields = '__all__'
        read_only_fields = ('recruiter', 'organization')
        fields = ['job_name','id', 'additional_data', 'location', 'min_ctc', 'max_ctc', 'job_description','requirements','recruiter', 'organization', 'allowed_interview_languages', 'ask_for_language_preference']  # Explicitly define the fields you want to include
        # exclude = ('recruiter', 'organization')  # Exclude from input but keep in the model
    
    def create(self, validated_data):
        # Add recruiter automatically (assuming current user is the recruiter)
        validated_data['recruiter'] = self.context['request'].user  # Assign logged-in user
        requirements_data = validated_data.pop('requirements')
        job = Job.objects.create(**validated_data)
        if requirements_data is not None:
            for req in requirements_data:
                JobRequirement.objects.create(job=job, **req)
        return job
    def update(self, instance, validated_data):
        requirements_data = validated_data.pop('requirements', None)
        # Update job fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        # Update job requirements (optional logic)
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
    class Meta:
        model = Candidate
        fields = '__all__'
        read_only_fields = ('recruiter','organization')
    def validate(self, data):
        # Exclude 'organization' validation
        data.pop('organization', None)
        return data    

class SnapshotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Snapshots
        fields = '__all__'

class InterviewSerializer(serializers.ModelSerializer):
    candidate = CandidateSerializer(read_only=True)
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
        fields = '__all__'
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


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
