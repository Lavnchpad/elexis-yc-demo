from elexis.services.daily import DailyMeetingService
from elexis.services.ecs_task import ECSAIBotTaskService, ECSInterviewTaskContext, ECSInterviewLanguages
from django.conf import settings
def start():
    daily_service = DailyMeetingService()
    room = daily_service.create_meeting_room()
    print(room.room_url)
    ecs_service = ECSAIBotTaskService()
    ecs_service.run_task(interview_context=ECSInterviewTaskContext(
        candidate_id="12345",
        interview_id="67890",
        company_name="Amaxa Tech Solutions",
        role="Software Engineer",
        candidate_name="Aditya Panchal",
        room_url=room.room_url,
        room_name=room.room_name,
        language= ECSInterviewLanguages.ENGLISH,  # Assuming ECSInterviewLanguages is a string for simplicity
        record_interview=True,
        interview_type="technical",  # Assuming ECSInterviewType is a string for simplicity
        resume_s3_url="https://demo-soltech-elexis-dashboard-storage.s3.us-west-1.amazonaws.com/resumes/Resume-Updated.pdf",
        resume_bucket="demo-soltech-elexis-dashboard-storage",
        resume_bucket_region="us-west-1",
        job_description="Web Developer with 3+ years of experience in Django and React. Must know on react state management, props and hooks. Must have experience in building web applications using Django and React. Must have experience in building REST APIs using Django Rest Framework. Should have used nginx and gunicorn for deployment. Should have experience in using Docker for containerization. Should have experience in using AWS services like S3, EC2, RDS, etc. Should have experience in using Git for version control.",
        daily_api_key=settings.DAILY_API_KEY
    ))
def end():
    daily_service = DailyMeetingService()
    input("Press Enter to delete all meeting rooms...")
    daily_service.delete_all_meeting_rooms()