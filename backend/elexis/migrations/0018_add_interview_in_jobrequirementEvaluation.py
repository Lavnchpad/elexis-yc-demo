# elexis/migrations/00XX_populate_interview_field.py (replace XX with the next number)

import math
from django.db import migrations


def populate_interview(apps, schema_editor):
    JobRequirementEvaluation = apps.get_model('elexis', 'JobRequirementEvaluation')
    Interview = apps.get_model('elexis', 'Interview')
    segregated_evaluations = dict()
    numberOfRequirmentsForJob = dict()
    for evaluation in JobRequirementEvaluation.objects.all():
        candidate = evaluation.candidate
        job = evaluation.job_requirement.job
        if candidate.id not in segregated_evaluations:
            segregated_evaluations[candidate.id] = dict()

        if job.id not in segregated_evaluations[candidate.id]:
            requirements = job.requirements.filter(
                job=job
            )
            numberOfRequirmentsForJob[job.id] = len(requirements)
            segregated_evaluations[candidate.id][job.id] = list()
        segregated_evaluations[candidate.id][job.id].append(evaluation)

    for candidate_id in segregated_evaluations:
        for job_id in segregated_evaluations[candidate_id]:
            if numberOfRequirmentsForJob[job_id] == 0:
                print(f"Warning: No requirements found for job ID {job_id}. Skipping interview population for this job/candidate pair.")
                continue

            numberOfInterviewsGiven = len(segregated_evaluations[candidate_id][job_id]) / numberOfRequirmentsForJob[job_id]

            if numberOfInterviewsGiven == 0:
                print(f"numberOfInterviewsGiven is zero for candidate ID {candidate_id}, job ID {job_id}. Skipping interview population.")
                continue

            InterviewsForThisJobAndCandidate = Interview.objects.filter(
                candidate__id=candidate_id, job__id=job_id
            )

            if len(InterviewsForThisJobAndCandidate) == numberOfInterviewsGiven:
                index = 0
                interviewPerEvaluation = math.ceil(len(segregated_evaluations[candidate_id][job_id]) / numberOfInterviewsGiven)
                interviewAdded = 0
                for eval_obj in segregated_evaluations[candidate_id][job_id]:
                    if index < len(InterviewsForThisJobAndCandidate):
                        interview = InterviewsForThisJobAndCandidate[index]
                        eval_obj.interview = interview
                        interviewAdded += 1
                        if( interviewAdded == interviewPerEvaluation):
                            index += 1
                            interviewAdded = 0
                        eval_obj.save()
                        print("Evaluation saved")
                    else:
                        print(f"evaluation (ID: {eval_obj.id}) candidate {candidate_id} job {job_id}. Skipping assignment.")
            else:
                print(f"expected interviews ({numberOfInterviewsGiven}) actual interviews ({len(InterviewsForThisJobAndCandidate)}) candidate {candidate_id} job {job_id}. Skipping population for this pair.")


class Migration(migrations.Migration):

    dependencies = [
       ('elexis', '0017_alter_jobrequirementevaluation_interview'),
    ]

    operations = [
        migrations.RunPython(populate_interview, migrations.RunPython.noop),
    ]