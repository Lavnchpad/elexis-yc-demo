import dotenv

import google.genai as genai
from google.genai import types
import os
from typing import List, Dict
from elexis.services.gemini_batch_service import gemini_batch_service, BatchRequest
import uuid

# Import Pinecone embedding service as primary
try:
    from elexis.services.pinecone_embedding_service import get_pinecone_embedding, get_pinecone_embeddings_batch, pinecone_embedding_service
    PINECONE_EMBEDDINGS_AVAILABLE = True
except ImportError:
    PINECONE_EMBEDDINGS_AVAILABLE = False
    print("Pinecone embedding service not available")

# Import local embedding fallback
try:
    from elexis.services.local_embedding_service import get_local_embedding, get_local_embeddings_batch, local_embedding_service
    LOCAL_EMBEDDINGS_AVAILABLE = True
except ImportError:
    LOCAL_EMBEDDINGS_AVAILABLE = False
    print("Local embedding service not available")

dotenv.load_dotenv()
client = genai.Client(api_key=os.environ.get('GEMINI_API_KEY'))


def generate_embedding_batch(texts: List[str]) -> Dict[str, List[float]]:
    """
    Generate embeddings for multiple texts with Pinecone as primary, Gemini as secondary
    
    Args:
        texts (List[str]): List of texts to generate embeddings for
        
    Returns:
        Dict[str, List[float]]: Dictionary mapping text index to embedding vector
    """
    if not texts:
        print("No texts provided for batch embedding generation")
        return {}
    
    # Primary: Try Pinecone Inference API for batch processing
    if PINECONE_EMBEDDINGS_AVAILABLE:
        try:
            pinecone_embeddings = get_pinecone_embeddings_batch(texts)
            if pinecone_embeddings and len(pinecone_embeddings) == len(texts):
                # Check if embeddings are valid (not all zeros)
                valid_embeddings = {}
                for i, embedding in enumerate(pinecone_embeddings):
                    if embedding and not all(x == 0.0 for x in embedding):
                        valid_embeddings[str(i)] = embedding
                        print(f"Generated Pinecone embedding for text {i}: {len(embedding)} dimensions")
                    else:
                        print(f"Pinecone embedding for text {i} is zero vector")
                        valid_embeddings[str(i)] = [0.0] * 768
                
                if valid_embeddings:
                    print(f"Pinecone batch processing successful: {len(valid_embeddings)} embeddings")
                    return valid_embeddings
        except Exception as e:
            print(f"Pinecone batch embedding failed: {e}, trying fallbacks...")
    
    # Secondary: Fall back to individual processing with rate limiting
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
                # Try Gemini first
                embedding_result = client.models.embed_content(
                    model='models/embedding-001',
                    contents=cleaned_text,
                )
                
                embedding = embedding_result.embeddings[0].values
                if embedding and len(embedding) == 768:
                    embeddings[str(i)] = embedding
                    print(f"Generated Gemini embedding for text {i}: {len(embedding)} dimensions")
                    break
                else:
                    raise ValueError("Invalid embedding response")
                    
            except Exception as e:
                error_msg = str(e).lower()
                if "quota" in error_msg or "429" in error_msg:
                    print(f"Quota limit hit for text {i}")
                    # Try local embedding fallback
                    if LOCAL_EMBEDDINGS_AVAILABLE:
                        try:
                            local_embedding = get_local_embedding(text)
                            if local_embedding and not all(x == 0.0 for x in local_embedding):
                                embeddings[str(i)] = local_embedding
                                print(f"Generated local embedding for text {i}")
                                break
                        except Exception as local_e:
                            print(f"Local embedding failed for text {i}: {local_e}")
                    
                    embeddings[str(i)] = [0.0] * 768
                    break
                elif attempt < max_retries - 1:
                    print(f"Error generating embedding for text {i}, attempt {attempt + 1}: {e}")
                    time.sleep(retry_delay)
                    retry_delay *= 2  # Exponential backoff
                else:
                    print(f"Failed to generate embedding for text {i} after {max_retries} attempts: {e}")
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
    Generates embeddings for a given text using Pinecone Inference API as primary,
    with Gemini and local embeddings as fallbacks.

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

    # Primary: Try Pinecone Inference API first
    if PINECONE_EMBEDDINGS_AVAILABLE:
        try:
            pinecone_embedding = get_pinecone_embedding(text)
            if pinecone_embedding and not all(x == 0.0 for x in pinecone_embedding):
                print("Successfully generated Pinecone embedding")
                return pinecone_embedding
            else:
                print("Pinecone embedding returned zero vector, trying fallbacks...")
        except Exception as e:
            print(f"Pinecone embedding failed: {e}, trying fallbacks...")

    # Secondary: Try Gemini API
    try:
        embedding_result = client.models.embed_content(
            model='models/embedding-001',
            contents=cleaned_text,
        )
        embedding = embedding_result.embeddings[0].values
        if not embedding or len(embedding) != 768:
            raise ValueError("Invalid embedding response from Gemini API: Dimension mismatch or empty.")
        print("Successfully generated Gemini embedding")
        return embedding
    except Exception as e:
        print(f"Error generating Gemini embedding for text (first 50 chars): '{cleaned_text[:50]}...': {e}")
        
        # Check if it's a quota error - try local embedding fallback
        if "quota" in str(e).lower() or "429" in str(e):
            print("Gemini quota error detected, trying local embedding fallback...")
            if LOCAL_EMBEDDINGS_AVAILABLE:
                try:
                    local_embedding = get_local_embedding(text)
                    if local_embedding and not all(x == 0.0 for x in local_embedding):
                        print("Successfully generated local embedding as fallback")
                        return local_embedding
                    else:
                        print("Local embedding returned zero vector")
                except Exception as local_e:
                    print(f"Local embedding fallback failed: {local_e}")

    print("All embedding methods failed, returning zero vector")
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