import boto3
from typing import Any
import json

class SQSService:
    sqs_queue_url: str
    region: str
    aws_access_key: str
    aws_secret_key: str
    sqs_client: Any

    def __init__(self, sqs_queue_url, region, aws_access_key, aws_secret_key):
        self.sqs_queue_url = sqs_queue_url
        self.region = region
        self.aws_access_key = aws_access_key
        self.aws_secret_key = aws_secret_key
        self.sqs_client = boto3.client(
            'sqs', 
            region_name=region,
            aws_access_key_id=aws_access_key,
            aws_secret_access_key = aws_secret_key
        )
    
    def push(self, message):
        self.sqs_client.send_message(QueueUrl=self.sqs_queue_url,
                MessageBody=json.dumps(message))