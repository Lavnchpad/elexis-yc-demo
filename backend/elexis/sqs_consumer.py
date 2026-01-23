from elexis.models import Interview, Snapshots, JobRequirement , JobRequirementEvaluation, JobMatchingResumeScore, Job, Candidate, SuggestedCandidates
from elexis.utils.get_file_data_from_s3 import get_file_data_from_s3, put_dict_as_json_to_s3
from elexis.utils.summary_generation import generate_summary, experience_information_generation, extract_text_from_pdf
from elexis.serializers import JobRequirementSerializer, AiJdResumeMatchingResponseSerializer
from django.db import transaction
from elexis.utils.convert_transcript_format import convert
from elexis.dto.Ai_JobResume_Matching_Evaluation_Dto import AiJdResumeMatchingResponse
import boto3
import json
import time
import os
import uuid
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
            print('Ranking resumes, SQS consumer.py')
            jobId = message['data']['jobId']
            if not jobId:
                print(f"SQS Consumer ::: Process message. type: {type} ::: message: {message} error: no JobId found")
                return
            print('record',reRankResumes(jobId=jobId))
            return
        elif type == 'ai_job_resume_evaluation':
            print(f" ai_job_resume_evaluation SQS_Consumer :: process_message:: ",  message)
            jobResumeMatchingScoreId = message["data"]["id"]
            if not jobResumeMatchingScoreId:
                print(f"SQS Consumer ::: Process message. type: {type} ::: message: {message} error: no JobResumeMatchingScoreId found")
                return
            evaluateJobResumeMatchingByAi(jobResumeMatchingScoreId, type=type)
            return
        elif type == "generate_candidate_suggestion":
            print(f"generate_candidate_suggestion SQS_Consumer :: process_message:: ",  message)
            jobId = message["data"]["jobId"]
            candidateId = message["data"]["candidateId"]
            if not jobId or not candidateId:
                print(f"SQS Consumer ::: Process message. type: {type} ::: message: {message} error: no JobId or candidateId in message")
                return
            generate_candidate_suggestions(jobId, candidateId)
            return
        elif type == "process_bulk_resumes":
            print(f"process_bulk_resumes SQS_Consumer :: process_message:: ",  message)
            batch_job_id = message["data"].get("batch_job_id")
            organization_id = message["data"].get("organization_id") 
            user_id = message["data"].get("user_id")
            job_id = message["data"].get("job_id")
            file_count = message["data"].get("file_count")
            
            if not batch_job_id:
                print(f"SQS Consumer ::: Process message. type: {type} ::: message: {message} error: no batch_job_id found")
                return
                
            # Process the bulk upload following single resume pattern
            try:
                # Find the tracker using batch_job_id
                from elexis.models import ResumeUploadTracker, Organization, Recruiter, Job, Candidate, JobMatchingResumeScore
                from django.core.files.uploadedfile import InMemoryUploadedFile
                from io import BytesIO
                import tempfile
                
                tracker = ResumeUploadTracker.objects.get(batch_job_id=batch_job_id)
                organization = Organization.objects.get(id=organization_id)
                user = Recruiter.objects.get(id=user_id)
                job = Job.objects.get(id=job_id) if job_id else None
                
                print(f"Processing bulk upload for tracker {tracker.id} with {file_count} files")
                tracker.start_processing()
                
                # Get uploaded files from S3
                from elexis.utils.get_file_data_from_s3 import get_file_data_from_s3
                import boto3
                
                files_metadata = tracker.processing_details.get('files', [])
                
                if not files_metadata:
                    print(f"❌ No uploaded files found in tracker {tracker.id}")
                    tracker.fail_processing("No uploaded files found")
                    return
                
                processed_count = 0
                successful_count = 0
                failed_count = 0
                
                for file_metadata in files_metadata:
                    try:
                        processed_count += 1
                        
                        # Extract file info from S3 metadata
                        filename = file_metadata.get('name', f'resume_{processed_count}.pdf')
                        s3_bucket = file_metadata.get('s3_bucket')
                        s3_key = file_metadata.get('s3_key')
                        content_type = file_metadata.get('content_type', 'application/pdf')
                        
                        # Download file content from S3
                        s3_client = boto3.client(
                            's3',
                            endpoint_url=os.getenv("AWS_S3_ENDPOINT_URL"),
                            aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
                            aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
                            region_name=os.getenv("AWS_REGION_NAME")
                        )
                        
                        response = s3_client.get_object(Bucket=s3_bucket, Key=s3_key)
                        file_content = response['Body'].read()
                        
                        # Create InMemoryUploadedFile like single resume upload
                        file_obj = InMemoryUploadedFile(
                            BytesIO(file_content),
                            None,
                            filename,
                            content_type,
                            len(file_content),
                            None
                        )
                        
                        # Extract candidate data from resume file using AI
                        # Save file temporarily for AI extraction
                        with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as temp_file:
                            temp_file.write(file_content)
                            temp_file_path = temp_file.name
                        
                        # Initialize candidate data with filename as fallback
                        candidate_name = filename.replace('.pdf', '').replace('_', ' ').replace('-', ' ').title()
                        candidate_email = None
                        candidate_phone = None
                        
                        try:
                            # Try to extract better data from resume
                            from elexis.services.resume_parser import extract_resume_data
                            extracted_data = extract_resume_data(temp_file_path)
                            
                            # Use extracted data if available, keep fallback otherwise
                            if extracted_data and hasattr(extracted_data, 'name') and extracted_data.name:
                                candidate_name = extracted_data.name
                            if extracted_data and hasattr(extracted_data, 'email') and extracted_data.email:
                                candidate_email = extracted_data.email
                            if extracted_data and hasattr(extracted_data, 'phone') and extracted_data.phone:
                                candidate_phone = extracted_data.phone
                            
                            print(f"📋 Using: name={candidate_name}, email={candidate_email}, phone={candidate_phone}")
                            
                        except Exception as extract_error:
                            print(f"⚠️  AI extraction failed for {filename}, using filename fallback: {extract_error}")
                        finally:
                            # Clean up temporary file
                            if os.path.exists(temp_file_path):
                                os.unlink(temp_file_path)
                        
                        # Create candidate with available data (use phone_number field)
                        candidate = Candidate.objects.create(
                            organization=organization,
                            name=candidate_name,
                            email=candidate_email,
                            phone_number=candidate_phone,  # Use correct field name
                            resume=file_obj,  # Store file directly like single upload
                            created_by=user,
                            modified_by=user,
                            recruiter=user
                        )
                        # Queue for Gemini embedding generation
                        add_message_to_sqs_queue(type='generate_embedding', data={
                            "candidate_id": str(candidate.id),
                            "batch_job_id": str(tracker.batch_job_id),
                            "organization_namespace": f"{organization.org_name}_{organization.id}"
                        })
                                    
                        print(f"✅ Created candidate: {candidate.name} (ID: {candidate.id})")
                        
                        # Queue for embedding generation like single resume
                        add_message_to_sqs_queue(type='generate_embedding', data={
                            "candidate_id": str(candidate.id),
                            "batch_job_id": str(tracker.batch_job_id),
                            "organization_namespace": f"{organization.org_name}_{organization.id}"
                        })
                        
                        # Create job matching score if job exists
                        if job:
                            job_matching_score = JobMatchingResumeScore.objects.create(
                                job=job,
                                candidate=candidate,
                                score=0,  # Will be calculated after embedding
                                created_by=user,
                                modified_by=user
                            )
                            
                            # Queue for AI evaluation
                            add_message_to_sqs_queue(type='ai_job_resume_evaluation', data={
                                "id": str(job_matching_score.id),
                            })
                            
                            print(f"✅ Created job matching score for candidate {candidate.name}")
                        
                        successful_count += 1
                        
                        # Update progress
                        tracker.update_progress(
                            processed=processed_count, 
                            successful=successful_count, 
                            failed=failed_count
                        )
                        
                    except Exception as file_error:
                        print(f"❌ Error processing file {filename}: {file_error}")
                        failed_count += 1
                        tracker.update_progress(
                            processed=processed_count,
                            successful=successful_count, 
                            failed=failed_count
                        )
                        continue
                
                # Complete processing
                if failed_count == 0:
                    tracker.complete_processing()
                    print(f"✅ Successfully processed all {successful_count} candidates")
                else:
                    tracker.status = 'partially_failed'
                    tracker.save()
                    print(f"⚠️ Partially completed: {successful_count} successful, {failed_count} failed")
                
                # Queue for ranking update if job exists (like single resume)
                if job:
                    add_message_to_sqs_queue(type='rank-resumes', data={
                        "jobId": str(job.id)
                    })
                
                print(f"✅ Bulk upload processing completed for batch {batch_job_id}")
                
            except Exception as e:
                print(f"❌ Error processing bulk resumes for batch {batch_job_id}: {e}")
                import traceback
                traceback.print_exc()
                
                # Update tracker with failure
                try:
                    tracker = ResumeUploadTracker.objects.get(batch_job_id=batch_job_id)
                    tracker.fail_processing(str(e))
                except:
                    pass
                    
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
        
        # Check if this is part of a bulk upload by looking for a tracker with this candidate
        tracker = None
        try:
            from elexis.models import ResumeUploadTracker
            tracker = ResumeUploadTracker.objects.filter(
                status__in=['processing', 'pending'],
                job=job,
                upload_type='bulk'
            ).order_by('-created_date').first()
        except:
            pass  # Not part of bulk upload
            
        # Prepare the context for AI evaluation
        resumeContext = extract_text_from_pdf(candidate.resume.url) if candidate.resume else ""
        jobContext = job.job_description if job.job_description else ""
        prompt = getJobResumeMatchingPrompt(aditionalContext=job.job_name, jobContext=jobContext, resumeContext=resumeContext)
        aiEvaluationResponseDict =GeminiClient.query(
            prompt=prompt,
            responseSchema= AiJdResumeMatchingResponse,
            logIdentifier=f"SQS Consumer, Async Job :{type} JobResumeMatchingByAI ID: {jobResumeMatchingScoreId}, "
        )
    
        # Check if response is valid before processing
        if isinstance(aiEvaluationResponseDict, str):
            print(f"SQS Consumer, Async Job :{type} Error: Gemini returned error string: {aiEvaluationResponseDict}")
            
            # Update tracker for AI failure if this is bulk upload
            if tracker:
                current_failed = tracker.ai_failed_files + 1
                current_processed = tracker.ai_processed_files + 1
                tracker.update_ai_progress(
                    ai_processed=current_processed,
                    ai_failed=current_failed
                )
                print(f"📊 Updated bulk tracker: AI failed {current_failed}, processed {current_processed}/{tracker.successful_files}")
            return
        
        if not hasattr(aiEvaluationResponseDict, 'model_dump'):
            print(f"SQS Consumer, Async Job :{type} Error: Invalid response object from Gemini")
            
            # Update tracker for AI failure if this is bulk upload
            if tracker:
                current_failed = tracker.ai_failed_files + 1
                current_processed = tracker.ai_processed_files + 1
                tracker.update_ai_progress(
                    ai_processed=current_processed,
                    ai_failed=current_failed
                )
            return
    
        # If aiEvaluationResponse is valid response object
        serializer_data = aiEvaluationResponseDict.model_dump()
        serializer = AiJdResumeMatchingResponseSerializer(data={
            "job_matching_resume_score": jobResumeMatchingScore.id,
            **serializer_data})
        if serializer.is_valid():
            serializer.save()
            print(f"Ai Evaluation for JobResumeMatchingScoreRecord : {jobResumeMatchingScore.id}  Saved successfully")
            
            # Update tracker for AI success if this is bulk upload
            if tracker:
                current_successful = tracker.ai_successful_files + 1
                current_processed = tracker.ai_processed_files + 1
                tracker.update_ai_progress(
                    ai_processed=current_processed,
                    ai_successful=current_successful
                )
                print(f"📊 Updated bulk tracker: AI successful {current_successful}, processed {current_processed}/{tracker.successful_files}")
        else:
            print(f"Error in Ai Evaluation for JobResumeMatchingScoreRecord :{jobResumeMatchingScore.id}, error: {serializer.errors}", )
            
            # Update tracker for AI failure if this is bulk upload
            if tracker:
                current_failed = tracker.ai_failed_files + 1
                current_processed = tracker.ai_processed_files + 1
                tracker.update_ai_progress(
                    ai_processed=current_processed,
                    ai_failed=current_failed
                )
        
        return 
    except Exception as e:
        print(f"SQS Consumer, Async Job :{type} Error evaluating JobResumeMatchingByAI: {e}")
        traceback.print_exc()
        
        # Update tracker for AI failure if this is bulk upload and we can find the tracker
        try:
            from elexis.models import ResumeUploadTracker
            tracker = ResumeUploadTracker.objects.filter(
                status__in=['processing', 'pending'],
                upload_type='bulk'
            ).order_by('-created_date').first()
            if tracker:
                current_failed = tracker.ai_failed_files + 1
                current_processed = tracker.ai_processed_files + 1
                tracker.update_ai_progress(
                    ai_processed=current_processed,
                    ai_failed=current_failed
                )
        except:
            pass
        return ''

def generate_candidate_suggestions(jobId: str , candidateId: str):
    try:
        job = Job.objects.get(id=jobId)
        candidate = Candidate.objects.get(id=candidateId)

        if not job or not candidate:
            print(f"Job or Candidate not found for Job ID: {jobId} or Candidate ID: {candidateId}")
            return

        # Prepare the context for AI evaluation
        resumeContext = extract_text_from_pdf(candidate.resume.url) if candidate.resume else ""
        jobContext = job.job_description if job.job_description else ""
        prompt = getJobResumeMatchingPrompt(aditionalContext=job.job_name, jobContext=jobContext, resumeContext=resumeContext)

        aiEvaluationResponseDict = GeminiClient.query(
            prompt=prompt,
            responseSchema= AiJdResumeMatchingResponse,
            logIdentifier=f"SQS Consumer, Async Job :generate_candidate_suggestions Job ID: {jobId}, Candidate ID: {candidateId}, "
        )

        # Check if response is valid before processing
        if isinstance(aiEvaluationResponseDict, str):
            print(f"SQS Consumer, generate_candidate_suggestions Error: Gemini returned error string: {aiEvaluationResponseDict}")
            return
        
        if not hasattr(aiEvaluationResponseDict, 'model_dump'):
            print(f"SQS Consumer, generate_candidate_suggestions Error: Invalid response object from Gemini")
            return

        serializer_data = aiEvaluationResponseDict.model_dump()
        serializer = AiJdResumeMatchingResponseSerializer(data={
            "job_matching_resume_score": None,  # No score associated with this suggestion
            **serializer_data})
        
        if serializer.is_valid():
            instance = serializer.save()
            SuggestedCandidates.objects.create(
                job=job,
                candidate=candidate,
                aiResumeMatchingResponse= instance
            )
            print(f"Candidate suggestions for Job ID: {jobId} and Candidate ID: {candidateId} saved successfully.")
        else:
            print(f"Error in saving candidate suggestions for Job ID: {jobId} and Candidate ID: {candidateId}, error: {serializer.errors}")
    except Exception as e:
        print(f"SQS Consumer, Async Job :generate_candidate_suggestions Error generating candidate suggestions: {e}")
        traceback.print_exc()
        return ''