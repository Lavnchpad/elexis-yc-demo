from .config import USERNAME, PASSWORD, AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_REGION, AWS_SQS_QUEUE_URL
from .elexis_service import ElexisService
from .sqs_service import SQSService
from .commands.trigger import TriggerCommand
import click
elexis_service: ElexisService = ElexisService(USERNAME, PASSWORD)
sqs_queue_service: SQSService = SQSService(AWS_SQS_QUEUE_URL, AWS_REGION, AWS_ACCESS_KEY, AWS_SECRET_KEY)

click.echo("Logging in")
elexis_service.login()
click.echo("Logged In")




trigger_command = TriggerCommand(elexis_service, sqs_queue_service)

@click.group("trigger-events", no_args_is_help=True)
def trigger_events():
    """Send Trigger Events Manually"""
    pass

@trigger_events.command("evaluate-resumes-by-llm")
@click.option("--wait", default=2)
def evaluate_resumes_by_lmm(wait):
    """Evaluate Resumes with LLM"""
    trigger_command.evaluate_all_resumes_by_llm(wait_secs_before_next_message=wait)

if __name__ == "__main__":
    trigger_events()