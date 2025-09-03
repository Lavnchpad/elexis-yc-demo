import requests
from .config import HOST
from .models.elexis import Recruiter, JobMatchingResumeScoreStage, JobMatchingResumeScore
from typing import Optional
import logging

class ElexisService:
    username: str
    password: str
    __token: str
    __refresh_token: str
    session: requests.Session
    user_id: str
    logger: logging.Logger

    class LoginException(Exception):
        pass

    def __init__(self, username, password):
        self.username = username
        self.password = password
        self.session = requests.Session()
        self.logger = logging.getLogger("ElexisService")

    def login(self):
        response = self.session.post(f"{HOST}/login/", json={
            "email": self.username,
            "password": self.password
        })
        if response.status_code == 200:
            data = response.json()

            self.__token = data.get("access")
            self.__refresh_token = data.get("refresh")
            self.user_id = data.get("recruiter_id")
            print(f"Logged in with user id : {self.user_id}")
            return
        self.logger.error("Error logging in")
        raise self.LoginException("Couldn't Login to Saarthi Service")
    
    @property
    def team(self):
        return self.get_team()
    
    def get_team(self):
        response = self.session.get(f"{HOST}/recruiters/", headers={
            "Authorization": f"Bearer {self.__token}"
        })
        if response.status_code == 200:
            data = response.json()
            return [Recruiter(**recruiter) for recruiter in data]
        self.logger.error("Error fetching organizations")
        print(response.text)

    def get_job_matching_resume_score(self, job_id=None, stage: Optional[JobMatchingResumeScoreStage]=None):
        params = {}
        if job_id:
            params["job_id"] = job_id
        if stage:
            params["stage"] = stage.value
        response = self.session.get(f"{HOST}/job-ats/", params=params, headers={
            "Authorization": f"Bearer {self.__token}"
        })
        if response.status_code == 200:
            return [ JobMatchingResumeScore(**record) for record in response.json()]
        self.logger.error("Error fetching job matching resume score")
        print(response.text)