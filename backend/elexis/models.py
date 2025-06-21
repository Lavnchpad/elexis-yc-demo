import uuid
from django.db import models
from django.db.models import JSONField
from django.utils.translation import gettext as _
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils import timezone
from typing import Optional
from typing_extensions import Self

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
    additional_data = models.TextField(blank=True)
    location = models.CharField(max_length=255, blank=True)
    min_ctc = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    max_ctc = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    is_disabled = models.BooleanField(default=False)

    def __str__(self):
        return self.job_name
# topics that must be evaluated and  represented visually


class Interview(BaseModel):
    STATUS_CHOICES = [
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
        ('scheduled', 'Scheduled'),
        ('started' , 'Started'),
        ('ended', 'Ended'),
        ('hold', 'Hold'),
        ('registered', 'Registered'),
    ]
    LANGUAGES = [
        ("english", "English"),
        ("hindi", "Hindi")
    ]

    candidate = models.ForeignKey(
        Candidate, on_delete=models.CASCADE, related_name="interviews"
    )
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
        max_length=50, default="english", choices=LANGUAGES, help_text="Language used in the interview"
    )
    ecs_task_created = models.BooleanField(default=False)

    def __str__(self):
        return f"Interview for {self.candidate.name} - {self.job.job_name} - {self.time}"

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