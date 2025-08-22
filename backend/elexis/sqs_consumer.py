from elexis.models import Interview, Snapshots, JobRequirement , JobRequirementEvaluation, JobMatchingResumeScore, Job, Candidate
from elexis.utils.get_file_data_from_s3 import get_file_data_from_s3, put_dict_as_json_to_s3
from elexis.utils.summary_generation import generate_summary, experience_information_generation, extract_text_from_pdf
from elexis.serializers import JobRequirementSerializer
from django.db import transaction
from elexis.utils.convert_transcript_format import convert
from elexis.dto.Ai_JobResume_Matching_Evaluation_Dto import AiJdResumeMatchingResponse
import boto3
import json
import time
from .services.pinecone_service import pinecone_client
from elexis.services.QueryGemini import GeminiClient
from elexis.prompts.jobMatchingResume import getJobResumeMatchingPrompt
from dotenv import load_dotenv
import os
import traceback
load_dotenv()

AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
SQS_QUEUE_URL = os.getenv("SQS_QUEUE_URL")
AWS_REGION_NAME = os.getenv("AWS_REGION_NAME")
AWS_SQS_ENDPOINT=os.getenv("AWS_SQS_ENDPOINT")
AWS_TRANSCRIPT_BUCKET_NAME=os.getenv("AWS_TRANSCRIPT_BUCKET_NAME")

def add_message_to_sqs_queue(type: str , data: object):
    """
    Sends a message to the SQS queue with the ID of the score to be updated.
    """
    sqs_client = boto3.client(
        'sqs',
        endpoint_url=AWS_SQS_ENDPOINT,
        region_name=AWS_REGION_NAME,
        aws_access_key_id=AWS_ACCESS_KEY_ID,
        aws_secret_access_key=AWS_SECRET_ACCESS_KEY
    )

    # The message body should be a string, so we serialize the data to JSON
    message_data = {
        'type': type,
        'data': data
    }

    try:
        response = sqs_client.send_message(
            QueueUrl=SQS_QUEUE_URL,
            MessageBody=json.dumps(message_data)
        )
        print(f"Message sent to SQS queue with MessageId: {response['MessageId']}")
    except Exception as e:
        print(f"Error sending message to SQS: {e}")

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
        if type=='job_resume_matching_score':
            print(f"SQS_Consumer :: process_message:: {type}",  message)
            updateJobResumeMatchingScore(id= message["data"]["id"])
            return
        elif type=="proctor":
            interview = Interview.objects.get(meeting_room=room_url)
            if not interview :
                print(f"SQS_Consumer :: process_message:: No matching interview found for meeting_room : {room_url}")
                return
            snapshot = Snapshots.objects.create(
            interview=interview,
            video=[message.get("video_url")])
            if snapshot:
                print(f"Snapshot details updated for {interview.id}")
                return
                
                
        elif type ==  'rank-resumes':
            jobId = message['data']['jobId']
            if not jobId:
                print(f"SQS Consumer ::: Process message. type: {type} ::: message: {message} error: no JobId found")
                return
            print('record',reRankResumes(jobId=jobId))
            return
        elif type == 'ai_job_resume_evaluation':
            print(f"SQS_Consumer :: process_message:: {type}",  message)
            jobResumeMatchingScoreId = message["data"]["id"]
            if not jobResumeMatchingScoreId:
                print(f"SQS Consumer ::: Process message. type: {type} ::: message: {message} error: no JobResumeMatchingScoreId found")
                return
            evaluateJobResumeMatchingByAi(jobResumeMatchingScoreId, type=type)
            return
        # {"s3_file_url":"http://elexis-random.s3.us-east-1.localhost.localstack.cloud:4566/transcript01.txt","room_url":"https://bohot-wickets.com"}
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

        # Update the Interview instance with the transcript and summary
        try:
            interview = Interview.objects.get(meeting_room=room_url)

            # Access job_id before update , later 
            jobId = interview.job.id
            # I need all the requirements for this job id
            requirementQuerySet = JobRequirement.objects.filter(job_id = jobId)
            specialEvaluationMetrics = JobRequirementSerializer(requirementQuerySet, many = True).data
            summary_json = None
            # Retry summary generation up to 3 times on error
            retries = 3
            for attempt in range(retries):
                try:
                    summary_json = generate_summary(transcript_data, specialEvaluationMetrics)
                    break
                except Exception as e:
                    traceback.print_exc()
                    print(f"Error generating summary (attempt {attempt+1}/{retries}): {e}")
                    if attempt == retries - 1:
                        print("Max retries reached. Skipping summary generation.")
                        return
                    time.sleep(2)
            
            # Retry fetching experience up to 3 times on error
            retries = 3
            experience = None
            for attempt in range(retries):
                try:
                    experience =  experience_information_generation(interview.candidate.resume.url)
                    break
                except Exception as e:
                    traceback.print_exc()
                    print(f"Error fetching experience (attempt {attempt+1}/{retries}): {e}")
                    if attempt == retries - 1:
                        print("Max retries reached. Skipping experience fetching.")
                        return
                    time.sleep(2)


            # Update fields
            interview.transcript = full_s3_url + ".json"
            interview.summary = summary_json
            interview.status = 'ended'
            interview.skills = summary_json['skills']
            interview.experience = summary_json['experience']
            if experience is not None:
                interview.experience = experience
            interview.save()
            
            evaluations_to_create=[]
            candidate = interview.candidate
            try:
                # create a new row in JobResumeMatchingScore table, Completed stage
                # get the JobResumeMatchingScore row from the interview scheduled stage
                existingData = JobMatchingResumeScore.objects.filter(candidate=candidate, job=interview.job, stage='scheduled_interview')
                existingData = existingData.first() if existingData.exists() else None
                existingData.is_archived=True
                existingData.save()
                # create a new row in JobResumeMatchingScore table, Completed stage
                jobResumeScoreinstance = JobMatchingResumeScore.objects.create(
                    candidate=candidate,
                    job=interview.job,
                    score=existingData.score if existingData else 0,
                    stage='completed_interview',
                    created_by=existingData.created_by if existingData else None,
                )
                interview.job_matching_resume_score = jobResumeScoreinstance
                interview.save()
            except JobMatchingResumeScore.DoesNotExist:
                print(f"SQS_consumer.py ::: JobMatchingResumeScore in scheduled_interview stage does not exist for candidate {candidate.id} and job {interview.job.id}")
        
            for item in summary_json['requirements_evaluation']:
                print("item",item)
                try:
                   evaluations_to_create.append(
                       JobRequirementEvaluation(
                            interview=interview,
                            candidate=candidate,
                            job_requirement_id=item['id'],
                            rating = item['evaluation'],
                            remarks = item['remarks']
                        )
                   )
                except JobRequirementEvaluation.DoesNotExist:
                    continue
            JobRequirementEvaluation.objects.bulk_create(evaluations_to_create)
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


def updateJobResumeMatchingScore(id: str):
    try:
        jobMatchingResumeInstance = JobMatchingResumeScore.objects.get(id=id)
        jobInstance = Job.objects.get(id=jobMatchingResumeInstance.job_id)
        candidateinstance = Candidate.objects.get(id = jobMatchingResumeInstance.candidate_id)

        jdEmbeddingId = jobInstance.job_description_embedding_id
        resumeEmbeddingid = candidateinstance.resume_embedding_id

        if jdEmbeddingId and resumeEmbeddingid:
            similarityScore = pinecone_client.get_similarity_between_stored_vectors(jdEmbeddingId, resumeEmbeddingid, namespace=f"{jobInstance.organization.org_name}_{jobInstance.organization.id}")
            print("SQS_consumer ::: score calculation ::: Similarity Score", similarityScore)
            jobMatchingResumeInstance.score = similarityScore if similarityScore else 0
            jobMatchingResumeInstance.save()
        else:
            if not jdEmbeddingId:
                print('SQS_consumer ::: score calculation  Jd embedding id not found::: id', id)
            elif not resumeEmbeddingid:
                print('SQS_consumer ::: SQS_consumer ::: resume embedding id not found ::: id', id)
    except Exception as e:
        print(f"SQS_consumer ::: upsertJobResumeMatchingScore::: Async Queue for adding bulk jdResume records::: id: {id}. error: ", e)


def reRankResumes(jobId: str):
    try:
        records = list(
            JobMatchingResumeScore.objects.filter(job_id=jobId,is_archived=False)
            .order_by("-score")
        )
        if not records:
            print('reRankResumes ::: No jobResumeMatchingScore records to update for job_Id', jobId)
            return

        for rank, record in enumerate(records, start=1):
            record.ranking = rank
        with transaction.atomic():
            JobMatchingResumeScore.objects.bulk_update(records, ["ranking"])
        return records
    except Exception as e:
        print('Error ::: SQS consumer -> reRankResumes', e)
        raise 


def evaluateJobResumeMatchingByAi(jobResumeMatchingScoreId: str, type: str):
    try:
        jobResumeMatchingScore = JobMatchingResumeScore.objects.get(id=jobResumeMatchingScoreId)
        if not jobResumeMatchingScore:
            print(f"SQS Consumer, Async Job :{type} JobResumeMatchingScore with ID {jobResumeMatchingScoreId} not found.")
            return
        job = jobResumeMatchingScore.job
        candidate = jobResumeMatchingScore.candidate
        if not job or not candidate:
            print(f"Job or Candidate not found for JobResumeMatchingScore ID: {jobResumeMatchingScoreId}")
            return
        # Prepare the context for AI evaluation
        resumeContext = extract_text_from_pdf(candidate.resume.url) if candidate.resume else ""
        jobContext = job.job_description if job.job_description else ""
        prompt = getJobResumeMatchingPrompt(aditionalContext='', jobContext=jobContext, resumeContext=resumeContext)
        response =GeminiClient.query(
            prompt=prompt,
            responseDto=AiJdResumeMatchingResponse,
            logIdentifier=f"SQS Consumer, Async Job :{type} JobResumeMatchingByAI ID: {jobResumeMatchingScoreId}, "
        )
        print("KAAM KHATAM", response.roleFitScore , response.hiringSignals)
        return 
    except Exception as e:
        print(f"SQS Consumer, Async Job :{type} Error evaluating JobResumeMatchingByAI: {e}")
        traceback.print_exc()
        return ''