import boto3
import json
import os
from dotenv import load_dotenv

# Load AWS credentials and config from .env
load_dotenv()

AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
SQS_QUEUE_URL = os.getenv("SQS_QUEUE_URL")
AWS_REGION_NAME = os.getenv("AWS_REGION_NAME")
AWS_SQS_ENDPOINT = os.getenv("AWS_SQS_ENDPOINT")  # e.g. for LocalStack

# Initialize SQS client
sqs_client = boto3.client(
    'sqs',
    region_name=AWS_REGION_NAME,
    endpoint_url=AWS_SQS_ENDPOINT,
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY
)

# Sample JSON message (modify as needed)
message_body = {
    "video_url": "https://amaxa-amaxa-elexis-transcript.s3.us-west-1.amazonaws.com//recordings-storage/0S1GXAwhz3HEsVjUgjZ6_1753250574.4591181.mp4",
    "candidate_id": "dd53ce29-1d00-4c10-a98a-6563076614a4",
    "room_url": "https://amaxatechdev.daily.co/0S1GXAwhz3HEsVjUgjZ6",
    "interview_id": "29313249-4218-440a-8d64-d6a300d4d3cb",
    "type": "proctor"
}

# Send the message to the SQS queue
try:
    response = sqs_client.send_message(
        QueueUrl=SQS_QUEUE_URL,
        MessageBody=json.dumps(message_body)
    )
    print("Message sent to SQS:")
    print("Message ID:", response['MessageId'])
except Exception as e:
    print("Error sending message to SQS:", e)