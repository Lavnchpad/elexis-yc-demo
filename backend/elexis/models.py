import uuid
from django.db import models
from django.db.models import JSONField
from django.utils.translation import gettext as _
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils import timezone
from typing import Optional
from typing_extensions import Self

LANG_CHOICES = [
        ('english', 'English'),
        ('hindi', 'Hindi'),
]
class BaseModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)
    
    created_by = models.ForeignKey(
        "Recruiter", related_name='has_created_%(class)s', on_delete=models.DO_NOTHING, blank=True, null=True
    )
    modified_by = models.ForeignKey(
        "Recruiter", related_name='has_modified_%(class)s', on_delete=models.DO_NOTHING, blank=True, null=True
    )

    class Meta:
        abstract = True


class Organization(BaseModel):
    org_name = models.CharField(max_length=255)
    is_exempt_from_maintenance = models.BooleanField(
        default=False,
        help_text="If True, this organization is exempt from maintenance windows and will not be affected by them."
    )
    
    def __str__(self):
        return self.org_name


class RecruiterManager(BaseUserManager):
    def create_user(self, email, password=None, organization=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        if password:
            user.set_password(password)
        else:
            user.set_unusable_password()  
        user.organization = organization
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, organization=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password=password, organization=organization, **extra_fields)


class Recruiter(AbstractUser, BaseModel):
    username = None
    email = models.EmailField(_('email address'), unique=True)
    company_name = models.CharField(max_length=100, blank=True, default="Default Company")
    name = models.CharField(max_length=100, blank=True)
    organization = models.ForeignKey(
        Organization, related_name="recruiters", on_delete=models.CASCADE, blank=False, null=False
    )
    
    # New fields
    is_admin = models.BooleanField(default=False)
    can_manage_users = models.BooleanField(default=False)
    can_manage_jobs = models.BooleanField(default=False)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = RecruiterManager()

    def __str__(self):
        return self.email


class Candidate(BaseModel):
    recruiter = models.ForeignKey(
        Recruiter, on_delete=models.CASCADE, related_name="candidates" , blank=False, null=False 
    )
    organization = models.ForeignKey(
        Organization, related_name="candidates", on_delete=models.CASCADE, blank=False, null=False
    )
    name = models.CharField(max_length=100)
    email = models.EmailField()
    resume = models.FileField(upload_to="resumes/", blank=True, null=True)
    profile_photo = models.ImageField(upload_to="profile_photos", blank=True, null=True)
    applied_for = models.CharField(max_length=100, blank=True, null=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    resume_embedding_id = models.CharField(
        max_length=255, blank=True, null=True,
        help_text="ID of the resume embedding in the vector database."
    )
    class Meta:
        ordering = ['-created_date'] 
    def __str__(self):
        return self.name
class Job(BaseModel):
    recruiter = models.ForeignKey(
        Recruiter, on_delete=models.CASCADE, related_name="jobs"
    )
    organization = models.ForeignKey(
        Organization, related_name="jobs", on_delete=models.CASCADE
    )
    job_name = models.CharField(max_length=255)
    job_description = models.TextField()
    job_description_embedding_id = models.CharField(
        max_length=255, blank=True, null=True,
        help_text="ID of the job description embedding in the vector database."
    )
    additional_data = models.TextField(blank=True)
    location = models.CharField(max_length=255, blank=True)
    min_ctc = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    max_ctc = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    is_disabled = models.BooleanField(default=False)
    ask_for_ctc_info = models.BooleanField(
        default=True,
        help_text="If True, candidates will be asked for their CTC information during the interview process."
    )
    ask_for_reason_for_leaving_previous_job = models.BooleanField(
        default=True,
        help_text="If True, candidates will be asked for the reason for leaving their previous job during the interview process."
    )
    allowed_interview_languages = models.CharField(
        max_length=255, # Increased max_length to safely store multiple languages
        default="english",
        help_text="Comma-separated list of allowed interview languages (e.g., 'english,hindi')."
    ) 

    class Meta:
        ordering = ['-created_date'] 
    def __str__(self):
        return self.job_name
    
class JobMatchingResumeScore(BaseModel):
    """
    Candiates who are associated with a job, their progress(in the interview stages) is visible here with resume matching score
    """
    STAGES = [
        ('candidate_onboard', 'Onboard'),
        ('selected_for_interview', 'Selected for Interview'),
        ('scheduled_interview', 'Interview Scheduled'),
        ('completed_interview', 'Interview Completed'),
    ]
    job = models.ForeignKey(
        Job, on_delete=models.CASCADE, related_name="matching_resumes",blank=False, null=False
    )
    candidate = models.ForeignKey(
        Candidate, on_delete=models.CASCADE, related_name="matching_resumes",blank=False, null=False
    )
    organization = models.ForeignKey(
        Organization, related_name="matching_resumes", on_delete=models.CASCADE, blank=False, null=False
    )
    score = models.DecimalField(
        max_digits=10, decimal_places=10,
        null=True,
        blank=True,
        default=0.0,
        validators=[MinValueValidator(-100), MaxValueValidator(100)],
        help_text="Score indicating how well the candidate's resume matches the job description"
    )
    stage = models.CharField(
        max_length=50, choices=STAGES, default='candidate_onboard',
        help_text="Current stage of the candidate in the inbound process"
    )
    ranking = models.IntegerField(
        null=True,
        blank=True
    )
    is_archived = models.BooleanField(
        default=False,
        help_text="If True, this row is not the present state of the candidate in our interview process. He progressed or maybe archived."
    )
    class Meta:
        ordering = ['-score'] 

    def save(self, *args, **kwargs):
        # Only set the organization if it hasn't been explicitly set
        # and the job is already set.
        if not self.organization_id and self.job:
            self.organization = self.job.organization
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Resume Match: {self.candidate.name} for {self.job.job_name} - Score: {self.score} - Stage: {self.stage}"
class Interview(BaseModel):
    STATUS_CHOICES = [
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
        ('scheduled', 'Scheduled'),
        ('started' , 'Started'),
        ('ended', 'Ended'),
        ('hold', 'Hold'),
        ('registered', 'Registered'),
        ('not_joined', 'Not Joined'),
    ]

    candidate = models.ForeignKey(
        Candidate, on_delete=models.CASCADE, related_name="interviews"
    )
    job_matching_resume_score = models.ForeignKey(JobMatchingResumeScore, on_delete=models.CASCADE, related_name="interviews", blank=True, null=True)
    job = models.ForeignKey(
        Job, on_delete=models.CASCADE, related_name="interviews"
    )
    scheduled_by = models.ForeignKey(
        Recruiter, on_delete=models.CASCADE, related_name="scheduled_interviews"
    )
    organization = models.ForeignKey(
        Organization, related_name="interviews", on_delete=models.CASCADE
    )
    date = models.DateField()
    time = models.TimeField()
    link = models.URLField(blank=True, null=True)
    transcript = models.TextField(blank=True, null=True)
    summary = models.JSONField(default=dict, blank=True, null=True)
    status = models.CharField(
        max_length=10, choices=STATUS_CHOICES, default='registered'
    )
    experience = models.JSONField(default=dict, blank=True, null=True)
    skills = models.JSONField(default=dict, blank=True, null=True)
    meeting_room = models.URLField(blank=True, null=True)
    language = models.CharField(
        max_length=50, default="english", choices=LANG_CHOICES, help_text="Language used in the interview"
    )
    ecs_task_created = models.BooleanField(default=False)
    expected_ctc = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    current_ctc = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    reason_for_leaving_previous_job = models.TextField(
        blank=True, null=True, help_text="Reason for leaving the previous job")
    def __str__(self):
        return f"{self.organization.org_name} :: - {self.status} Interview for {self.candidate.name} - {self.job.job_name} - {self.date} - {self.time} "

class Snapshots(BaseModel):
    interview = models.ForeignKey(
        Interview, on_delete=models.CASCADE, related_name="interview"
    )

    video = JSONField(blank=True , null= True)
    screenshots = JSONField(blank= True , null=True)

    def __str__(self):
        return f"name: {self.interview.candidate.name} InterviewId:{self.interview.id}"

class JobRequirement(BaseModel):
    job = models.ForeignKey(
        Job, on_delete=models.CASCADE, related_name="requirements"
    )
    requirement =  models.CharField(max_length=255)
    weightage =  models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        help_text="value should be between 1 & 5 , this suggest how much importance this criteria has for the specific job role",
        default=1
    )
    def __str__(self):
        return f"{self.job.job_name} - {self.requirement}"
class JobRequirementEvaluation(BaseModel):
    candidate = models.ForeignKey(
        Candidate, on_delete=models.CASCADE , related_name='jobrequirementevaluation'
    )
    interview = models.ForeignKey(
        Interview, on_delete=models.DO_NOTHING, related_name='evaluation', null=True
    )
    job_requirement = models.ForeignKey(JobRequirement , on_delete=models.CASCADE , related_name="jobrequirement")
    rating = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(100)],
        help_text="value should be between 1 to 100, suggests how good the candidate is for the specific requirement",
    )
    remarks = models.TextField(default="")

    def __str__(self):
        return f"{self.job_requirement.job.job_name} -{self.job_requirement.requirement} - {self.candidate.name}"
    
class MaintaineceWindow(BaseModel):
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    reason = models.TextField()
    user_display_text = models.TextField(
        default="Elexis is currently undergoing maintenance. We apologize for any inconvenience caused. Please check back later."
    )
    is_draft = models.BooleanField(default=False, 
                                   help_text="If True, this maintenance window is not yet active and will not be displayed to users.")
    def __str__(self):
        return f"Maintenance from {self.start_time} to {self.end_time} - Reason: {self.reason}"
    
    class Meta:
        verbose_name_plural = "Maintenance Windows"

    @classmethod
    def is_maintenance_active(cls) -> Optional[Self]:
        now = timezone.now()
        try:
            return cls.objects.filter(start_time__lte=now, end_time__gte=now, is_draft=False).first()
        except cls.DoesNotExist:
            return None
        

class JobQuestions(BaseModel):
    job = models.ForeignKey(
        Job, on_delete=models.CASCADE, related_name="questions"
    )
    question = models.TextField()
    sort_order = models.IntegerField(
        default=0, help_text="Order in which the question should be asked during the interview"
    )
    def __str__(self):
        return f"Question for {self.job.job_name}: {self.question}"
    
class InterviewQuestions(BaseModel):
    interview = models.ForeignKey(
        Interview, on_delete=models.CASCADE, related_name="interview_questions"
    )
    question = models.TextField()
    sort_order = models.IntegerField(
        default=0, help_text="Order in which the question should be asked during the interview"
    )
    def __str__(self):
        return f"Question for Interview {self.interview.id}: {self.question}"

class BackgroundAnalysis(BaseModel):
    industryContext = models.TextField(null=True, blank=True)
    companyBackground = models.TextField(null=True, blank=True)
    relevance = models.TextField(null=True, blank=True)

class RoleFitAnalysis(BaseModel):
    jobTitleMatch = models.TextField( null=True, blank=True)
    industryAlignment = models.TextField(null=True, blank=True)
    experienceLevel = models.TextField( null=True, blank=True)
    keySkills = models.JSONField(default=list, blank=True)  # or a separate Skill model if you want joins

class GapsAndImprovements(BaseModel):
    missingSkills = models.JSONField(default=list, blank=True)
    suggestedImprovements = models.JSONField(default=list, blank=True)

class HiringSignals(BaseModel):
    resumeQuality = models.TextField( null=True, blank=True)
    careerTrajectory = models.TextField( null=True, blank=True)
    prestigeFactors = models.TextField( null=True, blank=True)
    transitionEase = models.TextField(null=True, blank=True)


class Recommendation(BaseModel):
    overallRecommendation = models.CharField( null=True, blank=True)
    nextSteps = models.JSONField(default=list, blank=True)

class DirectComparison(BaseModel):
    relevantSections = models.JSONField(default=list, blank=True)
    missingRequirements = models.JSONField(default=list, blank=True)


class AiJdResumeMatchingResponse(BaseModel):
    job_matching_resume_score = models.ForeignKey(
         JobMatchingResumeScore, on_delete=models.CASCADE, related_name="ai_evaluations" , null=True, blank=True
     )
    suggested_resumes = models.OneToOneField(
        Candidate, on_delete=models.CASCADE, related_name="ai_evaluations", blank=True, null=True
    )
    roleFitScore = models.FloatField(default=0)

    backgroundAnalysis = models.OneToOneField(
        BackgroundAnalysis, on_delete=models.CASCADE, related_name="ai_evaluations"
    )
    roleFitAnalysis = models.OneToOneField(
        RoleFitAnalysis, on_delete=models.CASCADE, related_name="ai_evaluations"
    )
    gapsAndImprovements = models.OneToOneField(
        GapsAndImprovements, on_delete=models.CASCADE, related_name="ai_evaluations"
    )
    hiringSignals = models.OneToOneField(
        HiringSignals, on_delete=models.CASCADE, related_name="ai_evaluations"
    )
    recommendation = models.OneToOneField(
        Recommendation, on_delete=models.CASCADE, related_name="ai_evaluations"
    )
    directComparison = models.OneToOneField(
        DirectComparison, on_delete=models.CASCADE, related_name="ai_evaluations"
    )


class SuggestedCandidates(BaseModel):
    STAGES = [
        ('archived', 'Archived'),
        ('default', 'Default'),
    ]
    candidate = models.ForeignKey(
        Candidate, on_delete=models.CASCADE, related_name="suggested_candidates"
    )

    job = models.ForeignKey(
        Job, on_delete=models.CASCADE, related_name="suggested_candidates"
    )

    aiResumeMatchingResponse = models.OneToOneField(
        AiJdResumeMatchingResponse, on_delete=models.CASCADE, related_name="suggested_candidates", null=True, blank=True
    )

    stage = models.CharField(
        max_length=50, choices=STAGES, default='default',
        help_text="Current stage of the candidate in the Suggestion process"
    )

    def __str__(self):
        return f"{self.job.job_name} - {self.candidate.name} - {self.aiResumeMatchingResponse.roleFitScore if self.aiResumeMatchingResponse else 'No AI Response'}"
    
class ECSApplicationAutoScalingSchedule(BaseModel):
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    scheduled_action_name = models.TextField()
    min_capacity = models.IntegerField()
    max_capacity = models.IntegerField()

    def __str__(self):
        return f"{self.scheduled_action_name}-({self.min_capacity}-{self.max_capacity})"


class ResumeUploadTracker(BaseModel):
    """
    Tracks the status of resume upload processing (single or batch)
    """
    UPLOAD_TYPES = [
        ('single_manual', 'Single Manual Entry'),
        ('single_resume', 'Single Resume Upload'),
        ('bulk', 'Bulk Upload'),
    ]
    
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
        ('partially_failed', 'Partially Failed'),
    ]

    organization = models.ForeignKey(
        Organization, on_delete=models.CASCADE, related_name="upload_trackers"
    )
    upload_type = models.CharField(max_length=20, choices=UPLOAD_TYPES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    
    # Batch processing details
    batch_job_id = models.UUIDField(default=uuid.uuid4, unique=True)
    total_files = models.IntegerField(default=0)
    processed_files = models.IntegerField(default=0)
    successful_files = models.IntegerField(default=0)
    failed_files = models.IntegerField(default=0)
    
    # AI processing tracking (separate from file upload success)
    ai_processed_files = models.IntegerField(default=0)
    ai_successful_files = models.IntegerField(default=0)
    ai_failed_files = models.IntegerField(default=0)
    
    # Error tracking
    error_message = models.TextField(blank=True, null=True)
    processing_details = JSONField(default=dict, blank=True)
    
    # Job association (optional)
    job = models.ForeignKey(
        'Job', on_delete=models.CASCADE, null=True, blank=True,
        help_text="Associated job if candidates are being added to specific job"
    )
    
    # Timing
    started_at = models.DateTimeField(null=True, blank=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    
    def start_processing(self):
        """Mark job as started"""
        self.status = 'processing'
        self.started_at = timezone.now()
        self.save(update_fields=['status', 'started_at'])
    
    def complete_processing(self):
        """Mark job as completed"""
        self.status = 'completed' if self.failed_files == 0 else 'partially_failed'
        self.completed_at = timezone.now()
        self.save(update_fields=['status', 'completed_at'])
    
    def fail_processing(self, error_message):
        """Mark job as failed"""
        self.status = 'failed'
        self.error_message = error_message
        self.completed_at = timezone.now()
        self.save(update_fields=['status', 'error_message', 'completed_at'])
    
    def update_progress(self, processed=None, successful=None, failed=None):
        """Update processing progress"""
        if processed is not None:
            self.processed_files = processed
        if successful is not None:
            self.successful_files = successful
        if failed is not None:
            self.failed_files = failed
        self.save(update_fields=['processed_files', 'successful_files', 'failed_files'])
    
    def update_ai_progress(self, ai_processed=None, ai_successful=None, ai_failed=None):
        """Update AI processing progress separately"""
        if ai_processed is not None:
            self.ai_processed_files = ai_processed
        if ai_successful is not None:
            self.ai_successful_files = ai_successful
        if ai_failed is not None:
            self.ai_failed_files = ai_failed
        self.save(update_fields=['ai_processed_files', 'ai_successful_files', 'ai_failed_files'])
        
        # Update overall status if AI processing is complete
        if self.ai_processed_files >= self.successful_files and self.status == 'processing':
            if self.ai_failed_files > 0:
                self.status = 'partially_failed'
                self.error_message = f"AI processing failed for {self.ai_failed_files} out of {self.successful_files} files"
            else:
                self.status = 'completed'
            self.completed_at = timezone.now()
            self.save(update_fields=['status', 'error_message', 'completed_at'])
    
    def complete_processing(self):
        """Mark job as completed"""
        # Only mark as completed if no file upload failures
        # AI failures are tracked separately and will be handled by update_ai_progress
        if self.failed_files == 0:
            self.status = 'processing'  # Keep as processing until AI is done
        else:
            self.status = 'partially_failed'
        self.completed_at = timezone.now()
        self.save(update_fields=['status', 'completed_at'])
    
    @property
    def progress_percentage(self):
        """Calculate progress percentage"""
        if self.total_files == 0:
            return 0
        return (self.processed_files / self.total_files) * 100
    
    @property 
    def ai_progress_percentage(self):
        """Calculate AI processing percentage"""
        if self.successful_files == 0:
            return 0
        return (self.ai_processed_files / self.successful_files) * 100
    
    def __str__(self):
        return f"Upload Tracker {self.upload_type} - {self.status} ({self.processed_files}/{self.total_files})"
        return f"{self.upload_type} - {self.status} - {self.progress_percentage:.1f}%"