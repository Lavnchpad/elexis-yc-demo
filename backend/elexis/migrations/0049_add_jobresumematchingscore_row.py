from django.db import migrations
from collections import defaultdict
from decimal import Decimal


def map_stage(status):
    if status in ['started', 'rejected', 'ended','hold','accepted']:
        return 'completed_interview'
    else:
        return 'scheduled_interview'


def create_job_matching_resume_scores(apps, schema_editor):
    Interview = apps.get_model('elexis', 'Interview')
    JobMatchingResumeScore = apps.get_model('elexis', 'JobMatchingResumeScore')

    interviews_by_candidate_job = defaultdict(list)

    # Group and sort interviews so the latest is last
    for interview in Interview.objects.all().order_by('created_date'):
        interviews_by_candidate_job[(interview.candidate_id, interview.job_id)].append(interview)

    for (candidate_id, job_id), interviews in interviews_by_candidate_job.items():
        for i, interview in enumerate(interviews):
            score_obj= JobMatchingResumeScore.objects.create(
                job_id=interview.job_id,
                candidate_id=interview.candidate_id,
                organization_id=interview.organization_id,
                score=Decimal("0.29"),  # marker score
                stage=map_stage(interview.status),
                created_by=interview.created_by,
                is_archieved=(i != len(interviews) - 1),  # latest interview = unarchived
            )

            if i == len(interviews) - 1:
                interview.job_matching_resume_score = score_obj
                interview.save(update_fields=["job_matching_resume_score"])


def rollback_job_matching_resume_scores(apps, schema_editor):
    JobMatchingResumeScore = apps.get_model('elexis', 'JobMatchingResumeScore')
    # Delete only rows with our marker score
    JobMatchingResumeScore.objects.filter(score=Decimal("0.29")).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('elexis', '0048_alter_jobmatchingresumescore_unique_together_and_more'),
    ]

    operations = [
        migrations.RunPython(
            create_job_matching_resume_scores,
            reverse_code=rollback_job_matching_resume_scores
        ),
    ]
