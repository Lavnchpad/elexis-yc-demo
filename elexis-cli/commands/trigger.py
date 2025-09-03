
from ..models.elexis import JobMatchingResumeScoreStage
from ..models.sqs import AiJobResumeEvaluationMessage

from . import Command
import time


class TriggerCommand(Command):
   

    def __init__(self, elexis_servie, sqs_service):
        super().__init__("Trigger Command", elexis_servie, sqs_service)

    def evaluate_all_resumes_by_llm(self, wait_secs_before_next_message:int=2):
        message_bodies = [AiJobResumeEvaluationMessage(score.id).to_dict() for score in 
            self.elexis_service.get_job_matching_resume_score(stage=JobMatchingResumeScoreStage.CANDIDATE_ONBOARD)]
        for message in range(len(message_bodies)):
            print(f"Sending ({message}/{len(message_bodies)}) message {message_bodies[message]}")
            self.sqs_queue_service.push(message=message_bodies[message])
            time.sleep(wait_secs_before_next_message)
