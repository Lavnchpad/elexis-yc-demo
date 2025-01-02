from backend.elexis.models import Candidate
from backend.elexis.utils.summary_generation import generate_summary
import boto3
import json
import time
from dotenv import load_dotenv
import os

load_dotenv()


AWS_ACCESS_KEY_ID=os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY=os.getenv("AWS_SECRET_ACCESS_KEY")
def start_sqs_consumer():
    """
    Function to start the SQS consumer.
    This runs in a separate thread to avoid blocking the server.
    """
    queue_url = "https://sqs.us-east-1.amazonaws.com/818798134310/elexis-transcript-queue"
    aws_region = "us-east-1"

    sqs_client = boto3.client('sqs', region_name=aws_region,aws_access_key_id=AWS_ACCESS_KEY_ID,
                   aws_secret_access_key=AWS_SECRET_ACCESS_KEY)

    print("SQS Consumer started...")

    while True:
        try:
            response = sqs_client.receive_message(
                QueueUrl=queue_url,
                MaxNumberOfMessages=1, 
                WaitTimeSeconds=10  
            )

            messages = response.get('Messages', [])
            if not messages:
                continue  # No new messages

            for message in messages:
                message_body = message['Body']
                receipt_handle = message['ReceiptHandle']

                process_message(message_body)

                sqs_client.delete_message(
                    QueueUrl=queue_url,
                    ReceiptHandle=receipt_handle
                )
                print(f"Processed and deleted message: {message_body}")

        except Exception as e:
            print(f"Error consuming SQS messages: {e}")
            time.sleep(5)  


def process_message(message_body):
    """
    Process the SQS message. Customize this function as needed.
    """
    try:
        message = json.loads(message_body)

        candidate_id = message.get("candidate_id")
        transcript_url = message.get("s3_file_url")

        if not candidate_id or not transcript_url:
            print(f"Invalid data in message: candidate_id={candidate_id}, transcript_url={transcript_url}")
            return

        try:
            summary_json = generate_summary(transcript_url)
        except Exception as e:
            print(f"Error generating summary for transcript URL: {transcript_url}, Error: {e}")
            return

        try:
            rows_updated = Candidate.objects.filter(id=candidate_id).update(
                transcript=transcript_url,
                interview_summary=summary_json
            )
            if rows_updated:
                print(f"Transcript and summary updated for Candidate ID: {candidate_id}")
            else:
                print(f"Candidate ID {candidate_id} not found. No update performed.")
        except Exception as e:
            print(f"Error updating database for Candidate ID {candidate_id}: {e}")

    except json.JSONDecodeError:
        print(f"Invalid message format: {message_body}")
    except Exception as e:
        print(f"Unexpected error processing message: {e}")

