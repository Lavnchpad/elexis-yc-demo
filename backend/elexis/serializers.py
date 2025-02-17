from rest_framework import serializers
from .models import Recruiter, Candidate, Job, Interview


class RecruiterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recruiter
        fields = ('id', 'email', 'name', 'company_name', 'password', 'organization')
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True}
        }

    def create(self, validated_data):
        print("Validated data", validated_data)
        return Recruiter.objects.create_user(**validated_data)

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        if password:
            instance.set_password(password)
        return super().update(instance, validated_data)


class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = '__all__'
        read_only_fields = ('recruiter', 'organization')
        # fields = ['job_name', 'additional_data', 'location', 'min_ctc', 'max_ctc', 'job_description']  # Explicitly define the fields you want to include
        # exclude = ('recruiter', 'organization')  # Exclude from input but keep in the model
    def create(self, validated_data):
        # Add recruiter automatically (assuming current user is the recruiter)
        validated_data['recruiter'] = self.context['request'].user  # Assign logged-in user
        print("Validated data", validated_data)
        return super().create(validated_data)


class CandidateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidate
        fields = '__all__'
        read_only_fields = ('recruiter','organization')
    def validate(self, data):
        # Exclude 'organization' validation
        data.pop('organization', None)
        return data    


class InterviewSerializer(serializers.ModelSerializer):
    candidate = CandidateSerializer(read_only=True)
    job = JobSerializer(read_only=True)
    candidate_id = serializers.PrimaryKeyRelatedField(
        queryset=Candidate.objects.all(), source='candidate', write_only=True
    )
    job_id = serializers.PrimaryKeyRelatedField(
        queryset=Job.objects.all(), source='job', write_only=True
    )

    class Meta:
        model = Interview
        fields = '__all__'
        read_only_fields = ('scheduled_by', 'link')


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
