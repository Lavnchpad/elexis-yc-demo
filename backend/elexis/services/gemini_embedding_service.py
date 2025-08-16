import dotenv
import logging
import google.generativeai as genai
from google.generativeai import GenerativeModel, configure
import os
dotenv.load_dotenv()
configure(api_key=os.environ.get('GEMINI_API_KEY'))

logger = logging.getLogger(__name__)


def generate_embedding(text: str) -> list:
    """
    Generates embeddings for a given text using Gemini API.

    Args:
        text (str): The text to generate embeddings for.

    Returns:
        list: A 768-dimensional embedding vector.
    """
    if not text or not isinstance(text, str):
        logger.warning("Invalid text provided for embedding generation. Returning zero vector.")
        return [0.0] * 768 # Return zero vector for invalid input

    # Clean and prepare the text for embedding
    # Note: Regex needs to be raw string in Python for backslashes to be interpreted literally
    text.replace(r'[^\w\s.,?!:;()\[\]{}\'\"]', ' ').replace(r'\s+', ' ').strip()
    cleaned_text = text[:2048] # Limit text length

    if not cleaned_text:
        logger.warning("Text became empty after cleaning. Returning zero vector.")
        return [0.0] * 768

    try:
        embedding_result = genai.embed_content(
            model='models/embedding-001', # Explicitly specify model
            content={
                'parts': [{'text': cleaned_text}]
            }
        )
        print("Embeddings goes here bro", len(embedding_result['embedding']))
        embedding = embedding_result['embedding']
        if not embedding or not isinstance(embedding, list) or len(embedding) != 768:
            raise ValueError("Invalid embedding response from Gemini API: Dimension mismatch or empty.")
        return embedding
    except Exception as e:
        logger.error(f"Error generating embedding for text (first 50 chars): '{cleaned_text[:50]}...': {e}", exc_info=True)
        return [0.0] * 768 # Return zero vector on error
    


def split_text_into_chunks(text: str, chunk_size: int = 1000, overlap: int = 200) -> list:
    """
    Splits text into chunks, suitable for embedding.
    """
    if not text or not isinstance(text, str):
        logger.warning('Invalid text provided for chunking.')
        return []

    cleaned_text = text.replace('\r\n', '\n').replace(r'\n{3,}', '\n\n').replace(r'\s+', ' ').strip()
    if not cleaned_text:
        logger.warning('Text became empty after cleaning.')
        return []

    adjusted_chunk_size = min(chunk_size, 2000) # Max 2048 for Gemini
    adjusted_overlap = min(overlap, adjusted_chunk_size // 4)

    chunks = []
    i = 0
    while i < len(cleaned_text):
        start = max(0, i - adjusted_overlap) if i > 0 else 0
        end = min(start + adjusted_chunk_size, len(cleaned_text))
        chunk = cleaned_text[start:end].strip()
        if chunk:
            chunks.append(chunk)
        if end == len(cleaned_text):
            break
        i = end
    print   ("Chunks generated:", len(chunks))
    return chunks