from elexis.models import Interview
from elexis.utils.get_file_data_from_s3 import get_file_data_from_s3
from elexis.utils.summary_generation import generate_summary
import boto3
import json
import time
from dotenv import load_dotenv
import os

load_dotenv()

AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
SQS_QUEUE_URL = os.getenv("SQS_QUEUE_URL")
AWS_REGION = os.getenv("AWS_REGION")


def start_sqs_consumer():
    """
    Function to start the SQS consumer.
    This runs in a separate thread to avoid blocking the server.
    """
    sqs_client = boto3.client(
        'sqs',
        region_name=AWS_REGION,
        aws_access_key_id=AWS_ACCESS_KEY_ID,
        aws_secret_access_key=AWS_SECRET_ACCESS_KEY
    )

    print("SQS Consumer started...")

    while True:
        try:
            response = sqs_client.receive_message(
                QueueUrl=SQS_QUEUE_URL,
                MaxNumberOfMessages=1,  # Process one message at a time
                WaitTimeSeconds=10      # Wait for up to 10 seconds for a new message
            )

            messages = response.get('Messages', [])
            if not messages:
                continue  # No new messages

            for message in messages:
                message_body = message['Body']
                receipt_handle = message['ReceiptHandle']

                process_message(message_body)

                # Delete the message from the queue after processing
                sqs_client.delete_message(
                    QueueUrl=SQS_QUEUE_URL,
                    ReceiptHandle=receipt_handle
                )
                print(f"Processed and deleted message: {message_body}")

        except Exception as e:
            print(f"Error consuming SQS messages: {e}")
            time.sleep(5)  # Retry after a short delay


def process_message(message_body):
    """
    Process the SQS message and update the Interview instance.
    """
    try:
        message = json.loads(message_body)

        interview_id = message.get("interview_id")
        transcript_url = message.get("s3_file_url")

        if not interview_id or not transcript_url:
            print(f"Invalid data in message: interview_id={interview_id}, transcript_url={transcript_url}")
            return

        # Fetch transcript data from S3
        try:
            transcript_data = get_file_data_from_s3(transcript_url)
        except Exception as e:
            print(f"Error fetching transcript data from S3: {e}")
            return

        # Generate summary from transcript data
        try:
            summary_json = generate_summary(transcript_data)
        except Exception as e:
            print(f"Error generating summary for transcript: {e}")
            return

        # Update the Interview instance with the transcript and summary
        try:
            rows_updated = Interview.objects.filter(id=interview_id).update(
                transcript=transcript_data,
                summary=summary_json
            )
            if rows_updated:
                print(f"Transcript and summary updated for Interview ID: {interview_id}")
            else:
                print(f"Interview ID {interview_id} not found. No update performed.")
        except Exception as e:
            print(f"Error updating database for Interview ID {interview_id}: {e}")

    except json.JSONDecodeError:
        print(f"Invalid message format: {message_body}")
    except Exception as e:
        print(f"Unexpected error processing message: {e}")
