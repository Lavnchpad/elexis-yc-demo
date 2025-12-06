import dotenv

import google.genai as genai
from google.genai import types
import os
from typing import List, Dict
from elexis.services.gemini_batch_service import gemini_batch_service, BatchRequest
import uuid

# Gemini-only embedding generation - no fallbacks

dotenv.load_dotenv()
client = genai.Client(api_key=os.environ.get('GEMINI_API_KEY'))


def generate_embedding_batch(texts: List[str]) -> Dict[str, List[float]]:
    """
    Generate embeddings for multiple texts using Gemini API only (no fallbacks)
    
    Args:
        texts (List[str]): List of texts to generate embeddings for
        
    Returns:
        Dict[str, List[float]]: Dictionary mapping text index to embedding vector
    """
    if not texts:
        print("No texts provided for batch embedding generation")
        return {}
    
    # Process each text individually with rate limiting
    embeddings = {}
    import time
    
    for i, text in enumerate(texts):
        if not text or not isinstance(text, str):
            embeddings[str(i)] = [0.0] * 768
            continue
            
        # Clean text
        cleaned_text = text.replace(r'[^\w\s.,?!:;()\[\]{}\'\"]', ' ').replace(r'\s+', ' ').strip()
        cleaned_text = cleaned_text[:2048]  # Limit for embedding
        
        if not cleaned_text:
            embeddings[str(i)] = [0.0] * 768
            continue
        
        # Try to generate embedding with retry logic
        max_retries = 3
        retry_delay = 2  # seconds
        
        for attempt in range(max_retries):
            try:
                # Generate embedding using Gemini
                embedding_result = client.models.embed_content(
                    model='models/embedding-001',
                    contents=cleaned_text,
                )
                
                embedding = embedding_result.embeddings[0].values
                if embedding and len(embedding) == 768:
                    embeddings[str(i)] = embedding
                    print(f"✅ Generated Gemini embedding for text {i}: {len(embedding)} dimensions")
                    break
                else:
                    raise ValueError("Invalid embedding response")
                    
            except Exception as e:
                error_msg = str(e).lower()
                if attempt < max_retries - 1:
                    print(f"❌ Error generating embedding for text {i}, attempt {attempt + 1}: {e}")
                    time.sleep(retry_delay)
                    retry_delay *= 2  # Exponential backoff
                else:
                    print(f"❌ Failed to generate embedding for text {i} after {max_retries} attempts: {e}")
                    embeddings[str(i)] = [0.0] * 768
        
        # Small delay between requests to avoid rate limiting
        if i < len(texts) - 1:  # Don't delay after the last item
            time.sleep(0.5)
    
    return embeddings

def generate_embeddings_fallback(texts: List[str]) -> Dict[str, List[float]]:
    """
    Fallback method for individual embedding generation
    """
    embeddings = {}
    for i, text in enumerate(texts):
        try:
            embedding = generate_embedding(text)
            embeddings[str(i)] = embedding
        except Exception as e:
            print(f"Error generating embedding for text {i}: {e}")
            embeddings[str(i)] = [0.0] * 768
    return embeddings

def generate_embedding(text: str) -> list:
    """
    Generates embeddings for a given text using Gemini API only (no fallbacks).

    Args:
        text (str): The text to generate embeddings for.

    Returns:
        list: A 768-dimensional embedding vector.
    """
    if not text or not isinstance(text, str):
        print("Invalid text provided for embedding generation. Returning zero vector.")
        return [0.0] * 768

    # Clean and prepare the text for embedding
    cleaned_text = text.replace(r'[^\w\s.,?!:;()\[\]{}\'\"]', ' ').replace(r'\s+', ' ').strip()
    cleaned_text = cleaned_text[:2048]  # Limit text length

    if not cleaned_text:
        print("Text became empty after cleaning. Returning zero vector.")
        return [0.0] * 768

    # Generate embedding using Gemini API only
    try:
        embedding_result = client.models.embed_content(
            model='models/embedding-001',
            contents=cleaned_text,
        )
        embedding = embedding_result.embeddings[0].values
        if not embedding or len(embedding) != 768:
            raise ValueError("Invalid embedding response from Gemini API: Dimension mismatch or empty.")
        print(f"✅ Generated Gemini embedding with {len(embedding)} dimensions")
        return embedding
    except Exception as e:
        print(f"❌ Error generating Gemini embedding: {e}")
        print("Returning zero vector as fallback")
        return [0.0] * 768
    


def split_text_into_chunks(text: str, chunk_size: int = 1000, overlap: int = 200) -> list:
    """
    Splits text into chunks, suitable for embedding.
    """
    if not text or not isinstance(text, str):
        print('Invalid text provided for chunking.')
        return []

    cleaned_text = text.replace('\r\n', '\n').replace(r'\n{3,}', '\n\n').replace(r'\s+', ' ').strip()
    if not cleaned_text:
        print('Text became empty after cleaning.')
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
    print("Chunks generated:", len(chunks))
    return chunks