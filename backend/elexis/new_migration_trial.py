# def populate_interview(apps, schema_editor):
#     JobRequirementEvaluation = apps.get_model('elexis', 'JobRequirementEvaluation')
#     Interview = apps.get_model('elexis', 'Interview')

#     for evaluation in JobRequirementEvaluation.objects.all():
#         candidate = evaluation.candidate
#         job = evaluation.job_requirement.job

#         interview = Interview.objects.filter(candidate=candidate, job=job).first()
#         if interview:
#             evaluation.interview = interview
#             evaluation.save()
#         else:
#             continue
#             raise Exception(
#                 f"No matching interview found for candidate {candidate.id} and job {job.id}"
#             )