import uuid
from django.db import models
from django.utils.translation import gettext as _
from django.contrib.auth.models import AbstractUser, BaseUserManager


class BaseModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email, password, **extra_fields)


class User(AbstractUser, BaseModel):
    username = None
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=100)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return self.email


class Recruiter(BaseModel):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="recruiter_profile")
    company_name = models.CharField(max_length=100)

    def __str__(self):
        return self.user.name


class Candidate(BaseModel):
    recruiter = models.ForeignKey(Recruiter, on_delete=models.CASCADE, related_name="candidates")
    name = models.CharField(max_length=100)
    email = models.EmailField()
    resume = models.FileField(upload_to="resumes/", blank=True, null=True)
    applied_for = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.name


class Job(BaseModel):
    recruiter = models.ForeignKey(Recruiter, on_delete=models.CASCADE, related_name="jobs")
    title = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return self.title


class Interview(BaseModel):
    candidate = models.ForeignKey(Candidate, on_delete=models.CASCADE, related_name="interviews")
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name="interviews")
    scheduled_by = models.ForeignKey(Recruiter, on_delete=models.CASCADE, related_name="scheduled_interviews")
    date = models.DateField()
    time = models.TimeField()
    link = models.URLField(blank=True, null=True)
    transcript = models.JSONField(default=dict, blank=True, null=True)
    summary = models.JSONField(default=dict, blank=True, null=True)

    def __str__(self):
        return f"Interview for {self.candidate.name} - {self.job.title}"
