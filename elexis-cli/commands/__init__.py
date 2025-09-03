from ..elexis_service import ElexisService
from ..sqs_service import SQSService

class Command:
    elexis_service: ElexisService
    sqs_queue_service: SQSService
    label: str
    def __init__(self, label, elexis_servie: ElexisService, sqs_service: SQSService):
        self.elexis_service = elexis_servie
        self.sqs_queue_service = sqs_service
        self.label = label