# core/admin.py
from django.contrib import admin
from .models import Recruiter, Candidate, Job, Organization, Interview, Snapshots, JobRequirement, JobRequirementEvaluation, MaintaineceWindow
from django import forms
from django.contrib.auth.admin import UserAdmin

class RecruiterCreationForm(forms.ModelForm):
    class Meta:
        model = Recruiter
        fields = ('email', 'organization')

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_unusable_password()
        if commit:
            user.save()
        return user
class CustomRecruiterAdmin(UserAdmin):
    add_form = RecruiterCreationForm
    model = Recruiter

    list_display = ("email", "organization", "is_staff", "is_superuser", "company_name", "name", "created_by", "modified_by")
    ordering = ("email",)

    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Personal Info", {"fields": ("first_name", "last_name", "name", "company_name")}),
        ("Permissions", {
            "fields": (
                "is_active", "is_staff", "is_superuser",
                "is_admin", "can_manage_users", "can_manage_jobs",
                "groups", "user_permissions"
            )
        }),
        ("Organization", {"fields": ("organization",)}),
        ("Tracking", {"fields": ("created_by", "modified_by")}),
    )

    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("email", "organization", "first_name", "last_name", "name", "company_name"),
        }),
    )

    filter_horizontal = ("groups", "user_permissions")
class ShowAllFieldsAdmin(admin.ModelAdmin):
    readonly_fields = ('created_date', 'modified_date')
    ordering = ['-modified_date']
    


admin.site.register(Recruiter, CustomRecruiterAdmin)
admin.site.register(Candidate,ShowAllFieldsAdmin)
admin.site.register(Job,ShowAllFieldsAdmin)
admin.site.register(Organization,ShowAllFieldsAdmin)
admin.site.register(Interview,ShowAllFieldsAdmin)
admin.site.register(Snapshots,ShowAllFieldsAdmin)
admin.site.register(JobRequirement,ShowAllFieldsAdmin)
admin.site.register(JobRequirementEvaluation,ShowAllFieldsAdmin)
admin.site.register(MaintaineceWindow, ShowAllFieldsAdmin)