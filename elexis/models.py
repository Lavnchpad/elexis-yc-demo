import uuid

from django.contrib.auth.base_user import BaseUserManager
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext as _


class BaseModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_date = models.DateTimeField(auto_now_add=True, editable=False)
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class RecruiterManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)


class Recruiter(AbstractUser, BaseModel):
    username = None  # Remove username field
    email = models.EmailField(_('email address'), unique=True)
    company_name = models.CharField(max_length=100, blank=True)
    name = models.CharField(max_length=100, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = RecruiterManager()

    def __str__(self):
        return self.email


class Candidate(BaseModel):
    STATUS_CHOICES = [
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
        ('scheduled', 'Scheduled'),
        ('hold', 'Hold'),
        ('registered', 'Registered'),
    ]

    recruiter = models.ForeignKey('Recruiter', on_delete=models.CASCADE, related_name='candidates')
    job = models.ForeignKey('Job', on_delete=models.CASCADE, related_name='candidates', null=True, blank=True)
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    interview_summary = models.FileField(upload_to='interview_summaries/', blank=True)
    transcript = models.FileField(upload_to='transcripts/', blank=True)
    applied_for = models.CharField(max_length=255)
    proctoring_images = models.JSONField(default=list, blank=True)
    is_interview_completed = models.BooleanField(default=False)
    joining_link = models.URLField(blank=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True)
    resume = models.FileField(upload_to='resumes/', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Job(BaseModel):
    job_name = models.CharField(max_length=255)
    job_description = models.FileField(upload_to='job_descriptions/', blank=True)
    additional_data = models.TextField(blank=True)

    def __str__(self):
        return self.job_name
