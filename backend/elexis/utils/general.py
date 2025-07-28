from datetime import datetime
from elexis.services.pinecone_service import pinecone_client
from elexis.models import Job
from elexis.services.gemini_embedding_service import generate_embedding, split_text_into_chunks
from rest_framework.exceptions import ValidationError
import numpy as np
import logging

logger = logging.getLogger(__name__)
def getHumanReadableTime(time):
    return datetime.fromisoformat(str(time)).strftime("%A, %B %d, %Y at %I:%M %p")


def upsert_jd_vector(requirements_text: str, job: Job):
    try:
            job_embedding_id = ''
            job_description_text = f"{job.job_name} at {job.organization.org_name}\nDescription: {job.job_description}\nRequirements: {requirements_text}"
            job_chunks = split_text_into_chunks(job_description_text)
            job_embeddings = []
            for i, chunk_text in enumerate(job_chunks):
                chunk_embedding = generate_embedding(chunk_text)
                if not chunk_embedding or all(val == 0 for val in chunk_embedding):
                    logger.warning(f"Skipping chunk {i} for job {job.id} due to empty embedding.")
                    continue
                job_embeddings.append(chunk_embedding)
            
            if not job_embeddings:
                logger.warning(f"No valid chunk embeddings for job {job.id}, cannot create aggregate embedding.")
                raise ValidationError("Failed to generate a valid embedding for the job description. Please check job content or Gemini API.")

            # Aggregate job embeddings (e.g., by averaging)
            aggregate_job_embedding = np.mean(job_embeddings, axis=0).tolist()
            
            if not aggregate_job_embedding or all(val == 0 for val in aggregate_job_embedding):
                logger.warning(f"Aggregate embedding for job {job.id} is empty or zero.")
                raise ValidationError("Failed to generate a valid aggregate embedding for the job description.")

            # Store job embedding in Pinecone
            job_embedding_id = f"job-{job.id}"
            pinecone_client.upsert_vectors(
                vectors=[{
                    'id': job_embedding_id, # Unique ID for the job embedding in Pinecone
                    'values': aggregate_job_embedding,
                    'metadata': {
                        'type': 'job', # Add a type for filtering if needed
                        'job_id': job_embedding_id,
                        'job_title': job.job_name,
                        'company_name': job.organization.org_name
                    }
                }]
            )
            logger.info(f"Indexed job {job.id} aggregate embedding in Pinecone during creation.")
            return job_embedding_id
    except Exception as e:
        logger.error(f"Error generating or storing embedding for job {job.id}: {e}", exc_info=True)
        # Decide how to handle this error: e.g., log, return error response, or allow job creation to proceed without embedding
def upsert_resume_vector(candiate_name: str, candidate_email: str, resume_full_text : str, candidate_id: str): 
            
            try:
                print("resume full text here:", resume_full_text)
                resume_chunks = split_text_into_chunks(resume_full_text)
            
                pinecone_resume_vectors_to_upsert = []
                resume_chunk_embeddings = [] # Collect all chunk embeddings here
                
                for i, chunk_text in enumerate(resume_chunks):
                    chunk_embedding = generate_embedding(chunk_text)
                    if not chunk_embedding or all(val == 0 for val in chunk_embedding):
                        logger.warning(f"Skipping chunk {i} for resume of candidate: {candidate_id} due to empty embedding.")
                        continue
                
                    resume_chunk_embeddings.append(chunk_embedding) # Also collect for aggregation
                
                if not resume_chunk_embeddings:
                    logger.warning(f"No valid chunk embeddings for resume (candidate_id) {candidate_id}, cannot calculate aggregate embedding.")
                    # return JsonResponse({'status': 'Resume uploaded but embedding failed', 'resume_id': str(candidate_id)}, status=500)
                    return ''

                # CORRECTED: Aggregate resume embeddings using numpy.mean
                aggregate_resume_embedding = np.mean(resume_chunk_embeddings, axis=0).tolist()
                
                # Add the aggregate resume embedding to the list for upserting
                embedding_id = f"resume-{candidate_id}"
                pinecone_resume_vectors_to_upsert.append({
                    'id': embedding_id,
                    'values': aggregate_resume_embedding,
                    'metadata': {
                        'type': 'resume',
                        'resume_id': embedding_id,
                        'candidate_name': candiate_name,
                        'candidate_email': candidate_email,
                    }
                })

                if pinecone_resume_vectors_to_upsert:
                    a = pinecone_client.upsert_vectors(pinecone_resume_vectors_to_upsert)
                    print('aaaaaaa', a)
                    logger.info(f"Upserted {len(pinecone_resume_vectors_to_upsert)} vectors for resume (candidate_id) {candidate_id} to Pinecone.")
                else:
                    logger.warning(f"No vectors to upsert for resume {candidate_id}.")
                return embedding_id
            except Exception as e:
                logger.error(f"Error fetching embedding for job {candidate_id}: {e}", exc_info=True)
                # raise ValidationError(f"Internal server error during embedding retrieval: {e}")
                # return Response({'error': 'Internal server error during embedding retrieval'}, status=500)