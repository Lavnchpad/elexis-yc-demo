"""
Gemini Batch API Service for handling large-scale resume processing
Updated to use the latest Gemini Batch API (November 2024)
"""

import os
import json
import time
from typing import List, Dict, Optional, Union
from dataclasses import dataclass
import google.genai as genai
from google.genai import types
import tempfile
import uuid
from dotenv import load_dotenv

load_dotenv()

@dataclass
class BatchRequest:
    """Single batch request item"""
    request_id: str
    text: str
    operation: str  # 'extract' or 'embed'
    metadata: Dict = None

@dataclass
class BatchResponse:
    """Batch response item"""
    request_id: str
    success: bool
    data: Union[str, List[float], Dict]
    error: Optional[str] = None

class GeminiBatchService:
    """
    Handles batch processing for Gemini API using the latest 2024 API
    """
    
    def __init__(self, api_key: str = None):
        """Initialize the batch service with the new client"""
        self.api_key = api_key or os.getenv('GEMINI_API_KEY')
        if not self.api_key:
            raise ValueError("GEMINI_API_KEY not found in environment variables")
        
        # Use the new genai.Client
        self.client = genai.Client(api_key=self.api_key)
        self.max_batch_size = 50  # Maximum batch size
        self.model = "models/gemini-2.5-flash"  # Updated model
        self.retry_attempts = 3
        self.retry_delay = 30  # seconds
    
    def calculate_optimal_batch_size(self, total_resumes: int) -> int:
        """
        Calculate optimal batch size based on total resume count to avoid quota limits
        """
        if total_resumes <= 10:
            return min(5, total_resumes)  # Small uploads: 5 per batch
        elif total_resumes <= 50:
            return min(10, total_resumes)  # Medium uploads: 10 per batch
        elif total_resumes <= 100:
            return min(4, total_resumes)   # Large uploads: 4 per batch (25 batches max)
        elif total_resumes <= 200:
            return min(3, total_resumes)   # Very large: 3 per batch
        else:
            return min(2, total_resumes)   # Enterprise: 2 per batch
    
    def create_batch_file(self, requests: List[BatchRequest]) -> str:
        """
        Create a JSONL batch input file for the new Gemini Batch API
        """
        batch_data = []
        
        for req in requests:
            if req.operation == 'extract':
                # Resume extraction with structured JSON output
                batch_item = {
                    "key": req.request_id,
                    "request": {
                        "contents": [{
                            "parts": [{
                                "text": f"""
Extract the following information from this resume text and return a JSON object:
- name: Full name of the person
- email: Email address  
- phone: Phone number (digits only, no spaces or symbols)

Resume text:
{req.text[:2000]}

Return only valid JSON in the exact format: {{"name": "...", "email": "...", "phone": "..."}}
"""
                            }]
                        }],
                        "config": {
                            "response_mime_type": "application/json",
                            "temperature": 0.1,
                            "max_output_tokens": 500
                        }
                    }
                }
            elif req.operation == 'embed':
                # Embedding generation request  
                batch_item = {
                    "key": req.request_id,
                    "request": {
                        "content": {
                            "parts": [{
                                "text": req.text[:8000]  # Increased limit for embeddings
                            }]
                        },
                        "taskType": "RETRIEVAL_DOCUMENT"
                    }
                }
            
            batch_data.append(batch_item)
        
        # Create temporary JSONL file
        temp_file = tempfile.NamedTemporaryFile(mode='w', delete=False, suffix='.jsonl', encoding='utf-8')
        for item in batch_data:
            temp_file.write(json.dumps(item, ensure_ascii=False) + '\n')
        temp_file.close()
        
        return temp_file.name
    
    def submit_batch_job(self, batch_file_path: str) -> str:
        """
        Submit batch job to Gemini API using new client.batches.create() pattern
        Returns job ID for tracking
        """
        try:
            # Upload batch file using correct Files API syntax
            with open(batch_file_path, 'rb') as f:
                file_upload = self.client.files.upload(
                    file=f,
                    mime_type='application/jsonl',
                    name=f'batch_job_{int(time.time())}.jsonl'
                )
            
            print(f"Uploaded batch file: {file_upload.name}")
            
            # Create batch job using new API
            batch_job = self.client.batches.create(
                input_file=file_upload.name
            )
            
            print(f"Created batch job: {batch_job.name}")
            
            # Clean up temp file
            os.unlink(batch_file_path)
            
            return batch_job.name
            
        except Exception as e:
            # Clean up temp file on error
            if os.path.exists(batch_file_path):
                os.unlink(batch_file_path)
            raise Exception(f"Failed to submit batch job: {e}")
    
    def wait_for_batch_completion(self, job_id: str, max_wait_time: int = 3600) -> Dict:
        """
        Wait for batch job completion using new job states
        """
        start_time = time.time()
        
        while time.time() - start_time < max_wait_time:
            try:
                batch_status = self.client.batches.get(job_id)
                
                print(f"Batch status: {batch_status.state}")
                
                if batch_status.state == "JOB_STATE_SUCCEEDED":
                    return {
                        "status": "completed",
                        "output_file": batch_status.output_file,
                        "request_counts": batch_status.request_counts
                    }
                elif batch_status.state in ["JOB_STATE_FAILED", "JOB_STATE_CANCELLED", "JOB_STATE_EXPIRED"]:
                    return {
                        "status": "failed",
                        "state": batch_status.state,
                        "error": getattr(batch_status, 'error_file', None)
                    }
                
                # Wait before checking again
                time.sleep(30)
                
            except Exception as e:
                print(f"Error checking batch status: {e}")
                time.sleep(60)
        
        return {"status": "timeout", "error": "Maximum wait time exceeded"}
    
    def process_batch_results(self, output_file: str) -> List[BatchResponse]:
        """
        Process batch job results using new file response format
        """
        try:
            # Download results file using new pattern
            file_content = self.client.files.get(output_file)
            
            responses = []
            for line in file_content.strip().split('\n'):
                if not line:
                    continue
                    
                result = json.loads(line)
                
                request_id = result.get('key')  # Using 'key' as per new format
                
                if 'error' in result:
                    responses.append(BatchResponse(
                        request_id=request_id,
                        success=False,
                        data=None,
                        error=result['error']['message']
                    ))
                else:
                    # Extract the response data
                    if 'response' in result:
                        response_data = result['response']
                        
                        # Handle different response types
                        if 'candidates' in response_data:
                            # Text generation response
                            content = response_data['candidates'][0]['content']['parts'][0]['text']
                            try:
                                data = json.loads(content)
                            except:
                                data = content
                        elif 'embedding' in response_data:
                            # Embedding response
                            data = response_data['embedding']['values']
                        else:
                            data = response_data
                        
                        responses.append(BatchResponse(
                            request_id=request_id,
                            success=True,
                            data=data
                        ))
            
            return responses
            
        except Exception as e:
            print(f"Error processing batch results: {e}")
            return []
    
    def process_resumes_batch(self, resumes: List[Dict]) -> Dict[str, Dict]:
        """
        Process multiple resumes in batch for both extraction and embedding
        Uses dynamic batch sizing based on total count to avoid quota limits
        """
        total_count = len(resumes)
        optimal_batch_size = self.calculate_optimal_batch_size(total_count)
        
        print(f"📊 Processing {total_count} resumes with batch size: {optimal_batch_size}")
        print(f"📈 This will create {(total_count + optimal_batch_size - 1) // optimal_batch_size} batches")
        
        # Create batch requests for text extraction
        extract_requests = []
        embed_requests = []
        
        for resume in resumes:
            resume_id = resume.get('id', str(uuid.uuid4()))
            text = resume.get('text', '')
            
            if text:
                # Text extraction request
                extract_requests.append(BatchRequest(
                    request_id=f"extract_{resume_id}",
                    text=text,
                    operation='extract',
                    metadata={'resume_id': resume_id}
                ))
                
                # Embedding request
                embed_requests.append(BatchRequest(
                    request_id=f"embed_{resume_id}",
                    text=text,
                    operation='embed',
                    metadata={'resume_id': resume_id}
                ))
        
        results = {}
        
        # Process extractions
        if extract_requests:
            extract_results = self._process_batch_requests(extract_requests)
            for result in extract_results:
                resume_id = result.request_id.replace('extract_', '')
                if resume_id not in results:
                    results[resume_id] = {}
                results[resume_id]['extraction'] = result.data if result.success else None
        
        # Process embeddings
        if embed_requests:
            embed_results = self._process_batch_requests(embed_requests)
            for result in embed_results:
                resume_id = result.request_id.replace('embed_', '')
                if resume_id not in results:
                    results[resume_id] = {}
                results[resume_id]['embedding'] = result.data if result.success else None
        
        return results
    
    def _process_batch_requests(self, requests: List[BatchRequest]) -> List[BatchResponse]:
        """
        Internal method to process batch requests
        """
        if not requests:
            return []
        
        # Split into batches using dynamic sizing
        all_responses = []
        total_requests = len(requests)
        
        # Calculate batch size based on total request count
        dynamic_batch_size = self.calculate_optimal_batch_size(total_requests)
        
        print(f"🔄 Processing {total_requests} requests in batches of {dynamic_batch_size}")
        
        for i in range(0, len(requests), dynamic_batch_size):
            batch = requests[i:i + dynamic_batch_size]
            batch_num = (i // dynamic_batch_size) + 1
            total_batches = (total_requests + dynamic_batch_size - 1) // dynamic_batch_size
            
            print(f"📦 Processing batch {batch_num}/{total_batches} ({len(batch)} items)")
            
            for attempt in range(self.retry_attempts):
                try:
                    # Create batch file
                    batch_file = self.create_batch_file(batch)
                    
                    # Submit job
                    job_id = self.submit_batch_job(batch_file)
                    
                    # Wait for completion
                    job_result = self.wait_for_batch_completion(job_id)
                    
                    if job_result['status'] == 'completed':
                        # Process results using new output format
                        responses = self.process_batch_results(job_result['output_file'])
                        all_responses.extend(responses)
                        break
                    else:
                        print(f"Batch job failed: {job_result}")
                        if attempt < self.retry_attempts - 1:
                            print(f"Retrying in {self.retry_delay} seconds...")
                            time.sleep(self.retry_delay)
                        else:
                            # Return error responses for failed batch
                            for req in batch:
                                all_responses.append(BatchResponse(
                                    request_id=req.request_id,
                                    success=False,
                                    data=None,
                                    error="Batch job failed"
                                ))
                    
                    # Cleanup
                    os.unlink(batch_file)
                    
                except Exception as e:
                    print(f"Error in batch attempt {attempt + 1}: {e}")
                    if attempt < self.retry_attempts - 1:
                        time.sleep(self.retry_delay)
                    else:
                        # Return error responses
                        for req in batch:
                            all_responses.append(BatchResponse(
                                request_id=req.request_id,
                                success=False,
                                data=None,
                                error=str(e)
                            ))
        
        return all_responses

# Global instance
gemini_batch_service = GeminiBatchService()