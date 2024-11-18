from django.contrib.auth.base_user import BaseUserManager
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext as _


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


class Recruiter(AbstractUser):
    username = None  # Remove username field
    email = models.EmailField(_('email address'), unique=True)
    company_name = models.CharField(max_length=100, blank=True)
    name = models.CharField(max_length=100, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = RecruiterManager()

    def __str__(self):
        return self.email


class Candidate(models.Model):
    recruiter = models.ForeignKey('Recruiter', on_delete=models.CASCADE, related_name='candidates')
    name = models.CharField(max_length=255)
    email = models.EmailField()
    interview_summary = models.FileField(upload_to='interview_summaries/', blank=True)
    transcript = models.FileField(upload_to='transcripts/', blank=True)
    applied_for = models.CharField(max_length=255)
    proctoring_images = models.JSONField(default=list, blank=True)  # Store URLs as JSON list
    is_interview_completed = models.BooleanField(default=False)
    joining_link = models.URLField(blank=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True)
    resume = models.FileField(upload_to='resumes/', blank=True)
    job_description = models.FileField(upload_to='job_descriptions/', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
