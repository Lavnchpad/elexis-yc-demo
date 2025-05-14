import json
import google.generativeai as genai
from typing import List, Dict, Union
import json
from typing import List, Dict
import os
import logging
import dotenv

logger = logging.getLogger(__name__)


dotenv.load_dotenv()
genai.configure(api_key=os.getenv("GEMINI"))  # Replace with your actual API key

model = genai.GenerativeModel('gemini-1.5-flash-8b')

def is_valid_qa_output(data: Union[str, list]) -> bool:
    """
    Validates that the output is a list of dicts with 'question' and 'answer' keys.
    """
    if isinstance(data, str):
        try:
            data = json.loads(data)
        except json.JSONDecodeError:
            return False

    if not isinstance(data, list):
        return False

    for item in data:
        if not isinstance(item, dict):
            return False
        if "question" not in item or "answer" not in item:
            return False
        if not isinstance(item["question"], str) or not isinstance(item["answer"], str):
            return False
    return True

def convert(transcript: str, max_retries: int = 3) -> List[Dict[str, str]]:
    base_prompt = f"""
You are an assistant helping to extract Q&A from interview transcripts.

Here is the transcript:
{transcript}

Please extract all relevant **interviewer questions** and **candidate answers** from the above transcript.

Return only valid JSON — a list of objects, where each object has:
- "question": string
- "answer": string

Example:
[
  {{
    "question": "What are your strengths?",
    "answer": "I am great at solving problems..."
  }}
]
Do not return any explanation, just the JSON.
"""
    feedback_prompt = """
The previous response was not valid JSON or did not follow the required structure:
A list of dictionaries, each having 'question' and 'answer' string keys.
Please regenerate the response correctly.
"""

    attempt = 0
    while attempt < max_retries:
        response = model.generate_content(base_prompt if attempt == 0 else feedback_prompt + base_prompt)

        try:
            content = response.text.strip()

            # Try to parse it
            try:
                result = json.loads(content)
            except json.JSONDecodeError:
                result = eval(content)  # Fallback for slightly malformed JSON

            if is_valid_qa_output(result):
                return result

        except Exception as e:
            print(f"[Attempt {attempt+1}] Failed to parse or validate response:", e)

        attempt += 1

    print(f"Failed to generate a valid Q&A response after {max_retries} attempts.")
    return []