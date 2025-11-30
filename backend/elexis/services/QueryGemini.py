import google.genai as genai
import google.genai.types as types
import dotenv
from pydantic import BaseModel
from typing import TypeVar, Generic
from typing import Type
import json
import os
dotenv.load_dotenv()

T = TypeVar('T')
model = 'gemini-2.0-flash'

class QueryGemini:
    """
    Class to handle queries to the Gemini API.
    """

    def __init__(self, api_key: str):
        """
        Initialize the QueryGemini with the provided API key.
        """
        self.client = genai.Client(api_key=api_key)

    def query(self, prompt: str, logIdentifier: str, responseSchema: T) -> T :
        """
        Send a query to the Gemini API and return the response.

        :param prompt: The prompt to send to the Gemini API.
        :param responseSchema: The schema for the expected response.
        :param logIdentifier: Identifier for logging purposes.
        :return: The response from the Gemini API.
        """
        # assert((issubclass(responseSchema , BaseModel))), "responseSchema must be a Pydantic model type"
        # Placeholder for actual implementation
        try:

            response = self.client.models.generate_content(
                model=model, 
                contents=prompt,
                config=types.GenerateContentConfig(
                    response_mime_type="application/json",
                    response_schema=responseSchema,
                ),
            )
            return responseSchema.model_validate(json.loads(response.text)) 
            
        except Exception as e:
            print(f"Error in QueryGemini.query: {e}")
            return ""  
GeminiClient = QueryGemini(api_key=os.environ.get('GEMINI_API_KEY'))
    
