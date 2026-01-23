"""
Unified Resume Processing Service
Handles all resume uploads (single manual, single file, bulk) through a consistent batch system
"""

import uuid
import tempfile
import os
from typing import List, Dict, Optional
from django.utils import timezone
from elexis.models import ResumeUploadTracker, Candidate, Job, JobMatchingResumeScore
from elexis.services.resume_parser import extract_resume_data
from elexis.services.gemini_batch_service import GeminiBatchService
from elexis.sqs_consumer import add_message_to_sqs_queue


class UnifiedResumeProcessor:
    """
    Unified service for processing all types of resume uploads
    """
    
    @staticmethod
    def create_single_manual_job(organization, user, candidate_data, job_id=None):
        """
        Create a tracking job for single manual entry (no resume file)
        """
        tracker = ResumeUploadTracker.objects.create(
            organization=organization,
            upload_type='single_manual',
            total_files=1,
            job_id=job_id,
            created_by=user,
            modified_by=user
        )
        
        # For manual entry, we immediately create the candidate
        # since there's no file processing needed
        try:
            tracker.start_processing()
            
            candidate = Candidate.objects.create(
                organization=organization,
                created_by=user,
                modified_by=user,
                recruiter=user,
                **candidate_data
            )
            
            # If associated with a job, create JobMatchingResumeScore
            if job_id:
                job = Job.objects.get(id=job_id, organization=organization)
                job_matching_score = JobMatchingResumeScore.objects.create(
                    job=job,
                    candidate=candidate,
                    score=0,  # Will be calculated by AI
                    created_by=user,
                    modified_by=user
                )
                
                # Queue for AI evaluation if there's a resume
                if candidate.resume:
                    add_message_to_sqs_queue(type='ai_job_resume_evaluation', data={
                        "id": str(job_matching_score.id),
                    })
                    # Queue for Gemini embedding generation
                    add_message_to_sqs_queue(type='generate_embedding', data={
                        "candidate_id": str(candidate.id),
                        "batch_job_id": str(tracker.batch_job_id),
                        "organization_namespace": f"{organization.org_name}_{organization.id}"
                    })
                
                # Queue for ranking update
                add_message_to_sqs_queue(type='rank-resumes', data={
                    "jobId": str(job.id)
                })
            
            tracker.update_progress(processed=1, successful=1, failed=0)
            tracker.complete_processing()
            
            return tracker, [candidate]
            
        except Exception as e:
            tracker.fail_processing(str(e))
            raise
    
    @staticmethod
    def create_single_resume_job(organization, user, candidate_data, resume_file, job_id=None):
        """
        Create a tracking job for single resume upload
        """
        tracker = ResumeUploadTracker.objects.create(
            organization=organization,
            upload_type='single_resume',
            total_files=1,
            job_id=job_id,
            created_by=user,
            modified_by=user
        )
        
        # Process immediately for single resume
        try:
            tracker.start_processing()
            
            # Extract data from resume if needed
            if resume_file:
                with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as temp_file:
                    for chunk in resume_file.chunks():
                        temp_file.write(chunk)
                    temp_file_path = temp_file.name
                
                try:
                    extracted_data = extract_resume_data(temp_file_path)
                    # Update candidate data with extracted info if not provided
                    if not candidate_data.get('name') and extracted_data.name:
                        candidate_data['name'] = extracted_data.name
                    if not candidate_data.get('email') and extracted_data.email:
                        candidate_data['email'] = extracted_data.email
                    if not candidate_data.get('phone_number') and extracted_data.phone:
                        candidate_data['phone_number'] = extracted_data.phone
                finally:
                    os.unlink(temp_file_path)
            
            # Create candidate with resume
            candidate_data['resume'] = resume_file
            candidate = Candidate.objects.create(
                organization=organization,
                created_by=user,
                modified_by=user,
                recruiter=user,
                **candidate_data
            )
            
            # Queue for Gemini embedding generation
            add_message_to_sqs_queue(type='generate_embedding', data={
                "candidate_id": str(candidate.id),
                "batch_job_id": str(tracker.batch_job_id),
                "organization_namespace": f"{organization.org_name}_{organization.id}"
            })
            
            # If associated with a job, create JobMatchingResumeScore
            if job_id:
                job = Job.objects.get(id=job_id, organization=organization)
                job_matching_score = JobMatchingResumeScore.objects.create(
                    job=job,
                    candidate=candidate,
                    score=0,  # Will be calculated after embedding is generated
                    created_by=user,
                    modified_by=user
                )
                
                # Queue for AI evaluation after embedding is ready
                add_message_to_sqs_queue(type='ai_job_resume_evaluation', data={
                    "id": str(job_matching_score.id),
                })
                
                # Queue for ranking update
                add_message_to_sqs_queue(type='rank-resumes', data={
                    "jobId": str(job.id)
                })
            
            tracker.update_progress(processed=1, successful=1, failed=0)
            tracker.complete_processing()
            
            return tracker, [candidate]
            
        except Exception as e:
            tracker.fail_processing(str(e))
            raise
    
    @staticmethod
    def create_bulk_upload_job(organization, user, resume_files, job_id=None):
        """
        Create a tracking job for bulk resume upload - process files immediately like single resume
        """
        tracker = ResumeUploadTracker.objects.create(
            organization=organization,
            upload_type='bulk',
            total_files=len(resume_files),
            job_id=job_id,
            created_by=user,
            modified_by=user
        )
        
        # Store files in S3 for async processing
        from elexis.utils.get_file_data_from_s3 import upload_file_to_s3
        import json
        
        tracker.processing_details = {
            'files': [],
            'processing_timestamp': timezone.now().isoformat()
        }
        
        bucket_name = os.getenv('AWS_STORAGE_BUCKET_NAME', 'elexis-bucket')
        print(f"📦 Using S3 bucket: {bucket_name}")
        uploaded_files = []
        
        # Upload files to S3 and store metadata
        for i, resume_file in enumerate(resume_files):
            try:
                # Create unique S3 key for this file
                s3_key = f"bulk_uploads/{tracker.batch_job_id}/{resume_file.name}"
                
                # Read file content
                file_content = resume_file.read()
                
                # Upload to S3
                if upload_file_to_s3(bucket_name, s3_key, file_content, resume_file.content_type):
                    file_metadata = {
                        'name': resume_file.name,
                        's3_bucket': bucket_name,
                        's3_key': s3_key,
                        'content_type': resume_file.content_type,
                        'size': resume_file.size
                    }
                    tracker.processing_details['files'].append(file_metadata)
                    uploaded_files.append(file_metadata)
                    print(f"✅ Uploaded file {resume_file.name} to S3")
                else:
                    print(f"❌ Failed to upload file {resume_file.name} to S3")
                    
            except Exception as e:
                print(f"Error processing file {resume_file.name}: {e}")
                continue
        
        print(f"✅ Saved {len(uploaded_files)} files to S3 for batch {tracker.batch_job_id}")
        
        # Queue for batch processing with file data
        add_message_to_sqs_queue(type='process_bulk_resumes', data={
            "batch_job_id": str(tracker.batch_job_id),
            "organization_id": str(organization.id),
            "user_id": str(user.id),
            "job_id": job_id,
            "file_count": len(uploaded_files)  # Use actual uploaded files count
        })
        
        tracker.save()
        return tracker
    
    @staticmethod
    def get_upload_status(batch_job_id):
        """
        Get the status of an upload job
        """
        try:
            tracker = ResumeUploadTracker.objects.get(batch_job_id=batch_job_id)
            return {
                "status": tracker.status,
                "progress": {
                    "total": tracker.total_files,
                    "processed": tracker.processed_files,
                    "successful": tracker.successful_files,
                    "failed": tracker.failed_files,
                    "percentage": tracker.progress_percentage
                },
                "upload_type": tracker.upload_type,
                "error_message": tracker.error_message,
                "started_at": tracker.started_at,
                "completed_at": tracker.completed_at,
                "processing_details": tracker.processing_details
            }
        except ResumeUploadTracker.DoesNotExist:
            return None
    
    @staticmethod
    def get_recent_uploads(organization, limit=10):
        """
        Get recent upload jobs for an organization
        """
        trackers = ResumeUploadTracker.objects.filter(
            organization=organization
        ).order_by('-created_date')[:limit]
        
        return [
            {
                "batch_job_id": tracker.batch_job_id,
                "upload_type": tracker.upload_type,
                "status": tracker.status,
                "total_files": tracker.total_files,
                "progress_percentage": tracker.progress_percentage,
                "created_date": tracker.created_date,
                "completed_at": tracker.completed_at
            }
            for tracker in trackers
        ]