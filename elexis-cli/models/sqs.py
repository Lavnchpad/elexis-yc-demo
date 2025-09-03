import enum

class ElexisSQSMesageType(enum.Enum):
    AI_JOB_RESUME_EVALUATION = 'ai_job_resume_evaluation'
    RANK_RESUMES = 'rank-resumes'

class AiJobResumeEvaluationMessage:
    job_resume_matching_resume_score_id: str

    def __init__(self, job_resume_matching_resume_score_id: str):
        self.job_resume_matching_resume_score_id = job_resume_matching_resume_score_id
        
    def to_dict(self):
        return {
            "type": ElexisSQSMesageType.AI_JOB_RESUME_EVALUATION.value,
            "data": {
                "id": self.job_resume_matching_resume_score_id
            }
        }
    
class RankResumesMessage:
    job_id: str

    def __init__(self, job_id: str):
        self.job_id = job_id
        
    def to_dict(self):
        return {
            "type": ElexisSQSMesageType.RANK_RESUMES.value,
            "data": {
                "job_id": self.job_id
            }
        }