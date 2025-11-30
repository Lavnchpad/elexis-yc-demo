import re
import os
from elexis.utils.summary_generation import extract_text_from_pdf
from elexis.services.QueryGemini import GeminiClient
from elexis.services.gemini_batch_service import gemini_batch_service, BatchRequest
from pydantic import BaseModel
from typing import Optional, List, Dict
import PyPDF2
import google.generativeai as genai
from google.generativeai.types import BlobDict
from dotenv import load_dotenv
import uuid

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

class ExtractedResumeData(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    raw_text: str = ""

def extract_text_from_local_pdf(file_path: str) -> str:
    """
    Extract text from a local PDF file using Gemini AI
    """
    try:
        if not os.path.exists(file_path):
            print(f"File does not exist: {file_path}")
            return ""
            
        # Read PDF file as binary
        with open(file_path, 'rb') as pdf_file:
            pdf_content = pdf_file.read()
            
        # Use Gemini to extract text from PDF
        pdf_blob = BlobDict(data=pdf_content, mime_type="application/pdf")
        
        model = genai.GenerativeModel('gemini-2.0-flash')
        prompt = "Extract all the text content from this PDF resume. Return only the plain text, no formatting."
        
        response = model.generate_content(
            [prompt, pdf_blob],
            stream=False,
            generation_config={
                "response_mime_type": "text/plain",
            }
        )
        
        extracted_text = response.text if response else ""
        print(f"Extracted {len(extracted_text)} characters from PDF")
        return extracted_text
        
    except Exception as e:
        print(f"Error extracting text from local PDF: {e}")
        # Fallback to PyPDF2 if Gemini fails
        try:
            with open(file_path, 'rb') as pdf_file:
                pdf_reader = PyPDF2.PdfReader(pdf_file)
                text = ""
                for page in pdf_reader.pages:
                    text += page.extract_text() + "\n"
                print(f"Fallback: Extracted {len(text)} characters using PyPDF2")
                return text
        except Exception as fallback_error:
            print(f"Fallback extraction also failed: {fallback_error}")
            return ""

def extract_resume_data(file_path: str) -> ExtractedResumeData:
    """
    Extract name, email, phone from resume using AI and regex patterns
    """
    try:
        print(f"Extracting data from: {file_path}")
        
        # Extract text from local PDF file
        text = extract_text_from_local_pdf(file_path)
        
        if not text or len(text.strip()) < 10:
            print("No text extracted from PDF or text too short")
            return ExtractedResumeData(raw_text=text)
        
        print(f"Extracted text length: {len(text)} characters")
        
        # Try AI extraction first
        ai_extracted = extract_with_ai(text)
        
        # Fallback to regex if AI fails
        if not ai_extracted.name or not ai_extracted.email:
            print("AI extraction incomplete, trying regex fallback")
            regex_extracted = extract_with_regex(text)
            
            # Merge results, preferring AI but falling back to regex
            final_result = ExtractedResumeData(
                name=ai_extracted.name or regex_extracted.name,
                email=ai_extracted.email or regex_extracted.email,
                phone=ai_extracted.phone or regex_extracted.phone,
                raw_text=text
            )
        else:
            final_result = ExtractedResumeData(
                name=ai_extracted.name,
                email=ai_extracted.email,
                phone=ai_extracted.phone,
                raw_text=text
            )
        
        print(f"Final extraction result: name={final_result.name}, email={final_result.email}, phone={final_result.phone}")
        return final_result
        
    except Exception as e:
        print(f"Error extracting resume data: {e}")
        import traceback
        traceback.print_exc()
        return ExtractedResumeData(raw_text="")

def extract_resumes_batch(resume_files: List[str]) -> Dict[str, ExtractedResumeData]:
    """
    Extract data from multiple resumes using efficient sequential processing
    This provides better error handling than complex batch APIs
    """
    try:
        print(f"Processing {len(resume_files)} resumes sequentially with error handling")
        
        results = {}
        import time
        
        for i, file_path in enumerate(resume_files):
            try:
                print(f"Processing resume {i+1}/{len(resume_files)}: {file_path}")
                
                # Extract text from PDF
                text = extract_text_from_local_pdf(file_path)
                if not text or len(text.strip()) < 10:
                    print(f"No valid text extracted from {file_path}")
                    results[file_path] = ExtractedResumeData(raw_text="")
                    continue
                
                # Try AI extraction first
                ai_extracted = extract_with_ai(text)
                
                # Fallback to regex if AI fails
                if not ai_extracted.name or not ai_extracted.email:
                    print(f"AI extraction incomplete for {file_path}, using regex fallback")
                    regex_extracted = extract_with_regex(text)
                    
                    results[file_path] = ExtractedResumeData(
                        name=ai_extracted.name or regex_extracted.name,
                        email=ai_extracted.email or regex_extracted.email,
                        phone=ai_extracted.phone or regex_extracted.phone,
                        raw_text=text
                    )
                else:
                    results[file_path] = ExtractedResumeData(
                        name=ai_extracted.name,
                        email=ai_extracted.email,
                        phone=ai_extracted.phone,
                        raw_text=text
                    )
                
                # Small delay between files to avoid rate limiting
                if i < len(resume_files) - 1:
                    time.sleep(1)
                    
            except Exception as e:
                print(f"Error processing {file_path}: {e}")
                results[file_path] = ExtractedResumeData(raw_text="")
        
        successful_count = len([r for r in results.values() if r.name and r.email])
        print(f"Batch processing completed: {successful_count}/{len(resume_files)} successful extractions")
        return results
        
    except Exception as e:
        print(f"Error in batch resume extraction: {e}")
        import traceback
        traceback.print_exc()
        
        # Fallback to individual processing
        print("Falling back to individual processing")
        results = {}
        for file_path in resume_files:
            results[file_path] = extract_resume_data(file_path)
        return results

def extract_with_ai(text: str) -> ExtractedResumeData:
    """
    Use Gemini AI to extract structured data from resume text
    """
    try:
        prompt = f"""
        Extract the following information from this resume text. Return ONLY a JSON object with these fields:
        - name: Full name of the person
        - email: Email address
        - phone: Phone number (numbers only, remove formatting)
        
        Resume text:
        {text[:2000]}  # Limit text length for API
        
        Return format: {{"name": "...", "email": "...", "phone": "..."}}
        If any field is not found, use null.
        """
        
        response = GeminiClient.query(
            prompt=prompt,
            responseSchema=ExtractedResumeData,
            logIdentifier="Resume Parser AI Extraction"
        )
        
        return response
        
    except Exception as e:
        print(f"AI extraction failed: {e}")
        return ExtractedResumeData()

def extract_with_regex(text: str) -> ExtractedResumeData:
    """
    Fallback regex-based extraction
    """
    # Email regex
    email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    emails = re.findall(email_pattern, text)
    
    # Phone regex (various formats)
    phone_pattern = r'(?:\+91[-.\s]?)?(?:\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}|\b\d{10}\b'
    phones = re.findall(phone_pattern, text)
    
    # Name extraction (first few lines, exclude common words)
    name = extract_name_from_text(text)
    
    return ExtractedResumeData(
        name=name,
        email=emails[0] if emails else None,
        phone=clean_phone(phones[0]) if phones else None,
        raw_text=text
    )

def extract_name_from_text(text: str) -> Optional[str]:
    """
    Extract name from resume text using heuristics
    """
    lines = text.split('\n')[:10]  # Check first 10 lines
    
    exclude_words = {
        'resume', 'cv', 'curriculum', 'vitae', 'profile', 'summary',
        'experience', 'education', 'skills', 'contact', 'email', 'phone'
    }
    
    for line in lines:
        line = line.strip()
        if (len(line) > 3 and len(line) < 50 and 
            not any(word.lower() in line.lower() for word in exclude_words) and
            not '@' in line and not any(char.isdigit() for char in line)):
            
            # Check if it looks like a name (2-3 words, proper case)
            words = line.split()
            if 2 <= len(words) <= 3 and all(word.istitle() for word in words):
                return line
    
    return None

def clean_phone(phone: str) -> str:
    """
    Clean phone number to exactly 10 digits, always taking the last 10 digits for valid numbers
    """
    if not phone:
        return ""
    
    # Remove all non-digit characters
    digits_only = re.sub(r'[^\d]', '', phone)
    
    # If we have 10 or more digits, take the last 10
    if len(digits_only) >= 10:
        return digits_only[-10:]  # Always last 10 digits
    
    # If less than 10 digits, it's not a valid phone number
    return ""