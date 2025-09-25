import boto3
import botocore
from django.conf import settings
from django.utils import timezone
import enum
import json
import datetime

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
    ecs_scheduler_role_arn = settings.ECS_SCHEDULER_ROLE_ARN
    def __init__(self):
        self.ecs_client = boto3.client(
            'ecs',
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            aws_access_key_id= settings.AWS_ACCESS_KEY_ID,
            region_name=settings.BOT_AWS_REGION
        )
        self.scheduler_client = boto3.client(
            'scheduler',
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            aws_access_key_id= settings.AWS_ACCESS_KEY_ID,
            region_name=settings.BOT_AWS_REGION
        )
        self.application_scaling_client = boto3.client(
            'application-autoscaling',
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            aws_access_key_id= settings.AWS_ACCESS_KEY_ID,
            region_name=settings.BOT_AWS_REGION
        )

        self.asg_name = "amaxa-elexis-amaxa-ecs-asg-bot-task20250620150546023500000001"
        self.asg_client = boto3.client(
            'autoscaling',
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            aws_access_key_id= settings.AWS_ACCESS_KEY_ID,
            region_name=settings.BOT_AWS_REGION
        )
        self.application_resource_id = f"service/amaxa-elexis-amaxa-elexis-bot-task/amaxa-elexis-amaxa-app"

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
                        {'name': 'QUESTIONS', 'value': json.dumps(context.questions) if context.questions else '[]'}
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

    
    def schedule_task(self, interview_context: ECSInterviewTaskContext, schedule_time: datetime.datetime):
        """
        Schedule an ECS task to run at a specific UTC time using EventBridge Scheduler.
        """
        schedule_name = f"{self.project_name}-interview-{interview_context.interview_id}-{schedule_time.strftime('%Y%m%d%H%M%S')}"
        aware_local_time = schedule_time
        if not timezone.is_aware(schedule_time):
            aware_local_time = timezone.make_aware(schedule_time)
        schedule_time_utc = timezone.localtime(aware_local_time, timezone=timezone.utc)
        # EventBridge Scheduler 'at' expression expects YYYY-MM-DDTHH:MM:SS format
        schedule_expression = f"at({schedule_time_utc.strftime('%Y-%m-%dT%H:%M:%S')})"

        # Convert overrides to the JSON string expected by EventBridge Scheduler target input
        ecs_task_parameters = {
            "TaskDefinitionArn": self.task_definition_arn,
            "LaunchType": ECSLaunchType.EC2, # Or FARGATE
            "NetworkConfiguration": {
                "awsvpcConfiguration": {
                    "subnets": self.subnet_ids,
                    "securityGroups": self.security_group_ids,
                    "assignPublicIp": "ENABLED" if self.assign_public_ip else "DISABLED"
                }
            },
            "Overrides": self._ecs_interview_task_context_to_overrides(interview_context)
        }
        
        # EventBridge Scheduler expects the ECS parameters to be embedded in an 'Input' field
        # and this Input must be a JSON string.
        # It's important to craft this exactly as the EventBridge Scheduler API expects.
        target_input = {
            "ContainerOverrides": ecs_task_parameters["Overrides"]["containerOverrides"],
            "ExecutionRoleArn": ecs_task_parameters["Overrides"].get("executionRoleArn"),
            "TaskRoleArn": ecs_task_parameters["Overrides"].get("taskRoleArn")
        }
        
        # Remove None values from target_input to avoid issues with JSON serialization
        target_input_clean = {k: v for k, v in target_input.items() if v is not None}


        try:
            response = self.scheduler_client.create_schedule(
                Name=schedule_name,
                ScheduleExpression=schedule_expression,
                ScheduleExpressionTimezone="UTC", # Always use UTC for 'at' expressions, or specific TZ for others
                FlexibleTimeWindow={'Mode': 'OFF'}, # For precise scheduling
                Target={
                    'Arn': self.cluster_arn,
                    'RoleArn': self.scheduler_role_arn, # EventBridge Scheduler's role to call ECS
                    'EcsParameters': {
                        'TaskDefinitionArn': ecs_task_parameters["TaskDefinitionArn"],
                        'LaunchType': ecs_task_parameters["LaunchType"],
                        'NetworkConfiguration': ecs_task_parameters["NetworkConfiguration"],
                        # The 'Overrides' structure in EcsParameters is different from run_task
                        # It should directly contain containerOverrides, executionRoleArn, etc.
                        'ContainerOverrides': ecs_task_parameters["Overrides"]["containerOverrides"],
                        'ExecutionRoleArn': ecs_task_parameters["Overrides"].get("executionRoleArn"),
                        'TaskRoleArn': ecs_task_parameters["Overrides"].get("taskRoleArn")
                    }
                },
                ActionAfterCompletion='DELETE', # Automatically delete schedule after it runs successfully
                Description=f"Scheduled interview bot for {interview_context.candidate_name} (ID: {interview_context.interview_id})"
            )
            print(f"Successfully created schedule: {response['ScheduleArn']}")
            return response['ScheduleArn']
        except Exception as e:
            print(f"Error creating schedule: {e}")
            raise

    def schedule_scaling(self, start_time: datetime.datetime, capacity: int):
        start_time = timezone.localtime(start_time)
        # Scales the EC2 instances 
        action_name = f'scale-up-{start_time.strftime("%Y-%m-%dT%H-%M")}'
        print(f'scale-up-{start_time.strftime("%Y-%m-%dT%H-%M")}', start_time)
        print(f"Attempting to delete existing scheduled action '{action_name}'...")
        try:
            self.asg_client.delete_scheduled_action(
                AutoScalingGroupName=self.asg_name,
                ScheduledActionName=action_name
            )
            print(f"Successfully deleted existing action '{action_name}'.")
        except botocore.exceptions.ClientError as error:
            # Check if the error is due to the action not being found
            print(error)
            if error.response['Error']['Code'] == 'ResourceNotFound':
                print(f"Scheduled action '{action_name}' not found. Continuing to create.")
        response = self.asg_client.put_scheduled_update_group_action(
            AutoScalingGroupName=self.asg_name,
            ScheduledActionName=action_name,
            StartTime=start_time,
            MinSize=capacity,
            MaxSize=capacity,
            DesiredCapacity=capacity,
            TimeZone='Asia/Kolkata'
        )
        print("got response", response)
        return response
    
    def schedule_service_scaling(self, start_time: datetime.datetime, capacity: int):
        # Scales tasks at service level
        schedule_expression = f"at({start_time.strftime('%Y-%m-%dT%H:%M:%S')})"
        print(f"Attempting Schedule Scaling {start_time} - {capacity}")
        response = self.application_scaling_client.put_scheduled_action(
            ServiceNamespace='ecs',
            ScheduledActionName=f'scale-up-{start_time.strftime("%Y-%m-%dT%H-%M")}',
            ResourceId=self.application_resource_id,
            ScalableDimension='ecs:service:DesiredCount',
            Schedule=schedule_expression,
            ScalableTargetAction={
                'MinCapacity': capacity,
                'MaxCapacity': capacity
            },
            Timezone='Asia/Kolkata' # This is the key change! 🇮🇳
        )
        print("got response", response)
        return response