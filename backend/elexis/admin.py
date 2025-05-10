# core/admin.py
from django.contrib import admin
from .models import Recruiter, Candidate, Job, Organization, Interview, Snapshots

admin.site.register(Recruiter)
admin.site.register(Candidate)
admin.site.register(Job)
admin.site.register(Organization)
admin.site.register(Interview)
admin.site.register(Snapshots)
