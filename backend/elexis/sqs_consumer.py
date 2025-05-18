from elexis.models import Interview, Snapshots, JobRequirement , JobRequirementEvaluation
from elexis.utils.get_file_data_from_s3 import get_file_data_from_s3, put_dict_as_json_to_s3
from elexis.utils.summary_generation import generate_summary
from elexis.serializers import JobRequirementSerializer
from elexis.utils.convert_transcript_format import convert
import boto3
import json
import time
from dotenv import load_dotenv
import os
load_dotenv()

AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
SQS_QUEUE_URL = os.getenv("SQS_QUEUE_URL")
AWS_REGION_NAME = os.getenv("AWS_REGION_NAME")
AWS_SQS_ENDPOINT=os.getenv("AWS_SQS_ENDPOINT")
AWS_TRANSCRIPT_BUCKET_NAME=os.getenv("AWS_TRANSCRIPT_BUCKET_NAME")

def start_sqs_consumer():
    """
    Function to start the SQS consumer.
    This runs in a separate thread to avoid blocking the server.
    """
    sqs_client = boto3.client(
        'sqs',
        endpoint_url=AWS_SQS_ENDPOINT,
        region_name=AWS_REGION_NAME,
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

        room_url = message.get("room_url")
        transcript_url = message.get("s3_file_url")

        type = message.get("type")

        if type=="proctor":
            interview = Interview.objects.get(meeting_room=room_url)
            if not interview :
                print(f"No matching interview found for meeting_room : {room_url}")
                return
            snapshot = Snapshots.objects.create(
            interview=interview,
            video=[message.get("video_url")])
            if snapshot:
                print(f"Snapshot details updated for {interview.id}")
                return
                
                
        # {"s3_file_url":"http://elexis-random.s3.us-east-1.localhost.localstack.cloud:4566/transcript01.txt","room_url":"https://googly.com"}
        # {"type":"proctor","video":"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4","room_url":"https://google.com"}
        elif not room_url or not transcript_url:
            print(f"Invalid data in message: meeting_room={room_url}, transcript_url={transcript_url}")
            return

        # Fetch transcript data from S3
        try:
            full_s3_url = transcript_url
            raw_transcript = get_file_data_from_s3(AWS_TRANSCRIPT_BUCKET_NAME,transcript_url.split('/')[-1])
            qa_data = convert(raw_transcript)
            if not qa_data:
                print(f"Empty or invalid conversion for transcript: {transcript_url}")
                return
            transcript_url = transcript_url.split('/')[-1] + ".json"
            put_dict_as_json_to_s3(
                AWS_TRANSCRIPT_BUCKET_NAME,
                transcript_url,
                qa_data
            )
            transcript_data = raw_transcript
        except Exception as e:
            print(f"Error fetching transcript data from S3: {e}")
            return

        # Generate summary from transcript data
        # try:
        #     summary_json = generate_summary(transcript_data)
        # except Exception as e:
        #     print(f"Error generating summary for transcript: {e}")
        #     return

        # Update the Interview instance with the transcript and summary
        try:
            interview = Interview.objects.get(meeting_room=room_url)

            # Access job_id before update , later 
            jobId = interview.job.id
            # I need all the requirements for this job id
            requirementQuerySet = JobRequirement.objects.filter(job_id = jobId)
            specialEvaluationMetrics = JobRequirementSerializer(requirementQuerySet, many = True).data
            summary_json = generate_summary(transcript_data, specialEvaluationMetrics)

# meeting room se interview milega , interview se job , job se requirements, requiremenetEvaluation mil gaya , toh har ek requirement ke against ek record store kardo requiremenetEvaluation table pe



            # Update fields
            interview.transcript = full_s3_url + ".json"
            interview.summary = summary_json
            interview.status = 'ended'
            interview.skills = summary_json['skills']
            interview.experience = summary_json['experience']
            interview.save()

            if interview:
                print(f"Transcript and summary updated for meeting_room: {room_url}: summaryjson::: Evaaalu{(summary_json)}")
            else:
                print(f"Interview ID {room_url} not found. No update performed.")
        except Exception as e:
            print(f"Error updating database for room {room_url}: {e}")

    except json.JSONDecodeError:
        print(f"Invalid message format: {message_body}")
    except Exception as e:
        print(f"Unexpected error processing message: {e}")
