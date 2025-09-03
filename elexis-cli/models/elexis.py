import enum
from typing import List

class Recruiter:
    id: str
    email: str
    name: str
    company_name: str
    organization: str
    is_admin: bool
    can_manage_users: bool
    can_manage_jobs: bool

    def __init__(self, id: str, email: str, name: str, company_name: str, organization: str, is_admin: bool, can_manage_users: bool, can_manage_jobs: bool):
        self.id = id
        self.email = email
        self.name = name
        self.company_name = company_name
        self.organization = organization
        self.is_admin = is_admin
        self.can_manage_users = can_manage_users
        self.can_manage_jobs = can_manage_jobs

class JobMatchingResumeScoreStage(enum.Enum):
    CANDIDATE_ONBOARD = "candidate_onboard"

class JobMatchingResumeScore:
    id: str
    job: str
    # candidate_id: str
    ranking: str
    interviews: List[str]
    ai_evaluations: List[str]
    score: float
    created_date: str
    modified_date: str
    stage: JobMatchingResumeScoreStage
    is_archived: bool

    def __init__(self, id: str, job: str, 
                #  candidate_id: str, 
                 ranking: str, 
                 interviews: List[str], ai_evaluations: List[str], score: float, 
                 created_date: str, modified_date: str, stage: JobMatchingResumeScoreStage, is_archived: bool, **kwargs):
        self.id = id
        self.job = job
        # self.candidate_id = candidate_id
        self.ranking = ranking
        self.interviews = interviews
        self.ai_evaluations = ai_evaluations
        self.score = score
        self.created_date = created_date
        self.modified_date = modified_date
        self.stage = stage
        self.is_archived = is_archived

    def to_json(self):
        return {
            "id": self.id
        }