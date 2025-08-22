import google.genai as genai
import google.genai.types as types
import dotenv
from typing import Type
import os
dotenv.load_dotenv()

model = 'gemini-2.5-flash'
class QueryGemini:
    """
    Class to handle queries to the Gemini API.
    """

    def __init__(self, api_key: str):
        """
        Initialize the QueryGemini with the provided API key.
        """
        self.client = genai.Client(api_key=api_key)

    def query(self, prompt: str, responseDto: Type, logIdentifier: str) -> str:
        """
        Send a query to the Gemini API and return the response.

        :param prompt: The prompt to send to the Gemini API.
        :param responseSchema: The schema for the expected response.
        :param logIdentifier: Identifier for logging purposes.
        :return: The response from the Gemini API.
        """
        # Placeholder for actual implementation
        try:

            response = self.client.models.generate_content(
                model=model, 
                contents=prompt,
                # config=types.GenerateContentConfig(
                #      responseSchema=responseSchema,
                # ),
            )
            return responseDto(response.model_dump())
        except Exception as e:
            print(f"Error in QueryGemini.query: {e}")
            return ""  
GeminiClient = QueryGemini(api_key=os.environ.get('GEMINI'))
    
