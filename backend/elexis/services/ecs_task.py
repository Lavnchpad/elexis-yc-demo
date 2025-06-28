import boto3
from django.conf import settings
import enum

class ECSLaunchType:
    """
    Enum-like class for ECS launch types.
    """
    EC2 = 'EC2'
    FARGATE = 'FARGATE'

    @classmethod
    def choices(cls):
        return [
            (cls.EC2, 'EC2'),
            (cls.FARGATE, 'Fargate'),
        ]

class ECSInterviewLanguages(enum.Enum):
    ENGLISH = "english"
    HINDI = "hindi"

class ECSInterviewType(enum.Enum):
    TECHNICAL = "technical"

class ECSInterviewTaskContext:
    """Interview context to be passed to ECS tasks.

    Wraps all the necessary parameters for an ECS task related to interviews and passes as container overrides.
    """
    candidate_id: str
    interview_id: str
    company_name: str
    role: str
    candidate_name: str
    room_url: str
    room_name: str
    language: ECSInterviewLanguages
    record_interview: bool
    interview_type: ECSInterviewType
    resume_s3_url: str
    resume_bucket: str
    resume_bucket_region: str
    job_description: str
    daily_api_key: str
    questions: list

    def __init__(self, candidate_id: str, interview_id: str, company_name: str, role: str,
                 candidate_name: str, room_url: str, room_name: str, language: ECSInterviewLanguages,
                 record_interview: bool, interview_type: ECSInterviewType, resume_s3_url: str,
                 resume_bucket: str, job_description: str, daily_api_key: str, resume_bucket_region: str, questions: list = None):
        self.candidate_id = candidate_id
        self.interview_id = interview_id
        self.company_name = company_name
        self.role = role
        self.candidate_name = candidate_name
        self.room_url = room_url
        self.room_name = room_name
        self.language = language
        self.record_interview = record_interview
        self.interview_type = interview_type
        self.resume_s3_url = resume_s3_url
        self.resume_bucket = resume_bucket
        self.resume_bucket_region = resume_bucket_region
        self.job_description = job_description
        self.daily_api_key = daily_api_key
        self.questions = questions if questions is not None else []


class ECSAIBotTaskService:
    """
    Service for managing ECS AI Bot tasks.
    """
    cluster_arn = settings.BOT_CLUSTER_ARN
    task_definition_arn = settings.BOT_TASK_DEFINITION_ARN
    def __init__(self):
        self.ecs_client = boto3.client(
            'ecs',
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            aws_access_key_id= settings.AWS_ACCESS_KEY_ID,
            region_name=settings.BOT_AWS_REGION
        )

    def _ecs_interview_task_context_to_overrides(self, context: ECSInterviewTaskContext):
        """
        Convert ECSInterviewTaskContext to ECS task overrides.
        """
        return {
            'containerOverrides': [
                {
                    'name': 'elexis',
                    'environment': [
                        {'name': 'CANDIDATE_ID', 'value': context.candidate_id},
                        {'name': 'INTERVIEW_ID', 'value': context.interview_id},
                        {'name': 'COMPANY_NAME', 'value': context.company_name},
                        {'name': 'ROLE', 'value': context.role},
                        {'name': 'USER_NAME', 'value': context.candidate_name},
                        {'name': 'ROOM_URL', 'value': context.room_url},
                        {'name': 'ROOM_NAME', 'value': context.room_name},
                        {'name': 'LANGUAGE', 'value': context.language.value},
                        {'name': 'RECORD_INTERVIEW', 'value': str(context.record_interview).lower()},
                        {'name': 'INTERVIEW_TYPE', 'value': context.interview_type},
                        {'name': 'RESUME_S3_URL', 'value': context.resume_s3_url},
                        {'name': 'RESUME_BUCKET', 'value': context.resume_bucket},
                        {'name': 'RESUME_BUCKET_REGION', 'value': context.resume_bucket_region},
                        {'name': 'JOB_DESCRIPTION', 'value': context.job_description},
                        {'name': 'DAILY_API_KEY', 'value': context.daily_api_key},
                        {'name': 'QUESTIONS', 'value': ','.join(context.questions) if context.questions else ''}
                    ]
                }
            ]
        }
    
    def run_task(self, interview_context: ECSInterviewTaskContext):
        """
        Run a task in ECS with the specified task definition and cluster.
        """
        overrides = self._ecs_interview_task_context_to_overrides(interview_context)
        print(overrides)
        response = self.ecs_client.run_task(
            taskDefinition=self.task_definition_arn,
            cluster=self.cluster_arn,
            launchType=ECSLaunchType.EC2,
            overrides=overrides
        )
        tasks = response.get("tasks", [])
        return len(tasks) > 0

    def stop_task(self, task_arn, cluster):
        """
        Stop a running ECS task.
        """
        response = self.ecs_client.stop_task(
            task=task_arn,
            cluster=cluster
        )
        return response