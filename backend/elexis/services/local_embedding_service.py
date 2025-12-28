"""
Local embedding fallback service using sentence-transformers
This provides offline embedding generation when Gemini quotas are exhausted
"""

try:
    from sentence_transformers import SentenceTransformer
    SENTENCE_TRANSFORMERS_AVAILABLE = True
except ImportError:
    SENTENCE_TRANSFORMERS_AVAILABLE = False
    print("sentence-transformers not available. Install with: pip install sentence-transformers")

import numpy as np
from typing import List, Optional
import os

class LocalEmbeddingService:
    """
    Local embedding service using sentence-transformers as fallback
    """
    
    def __init__(self):
        self.model = None
        self.model_name = 'all-MiniLM-L6-v2'  # Lightweight, good performance
        self.embedding_dim = 384  # Dimension for all-MiniLM-L6-v2
        
    def _load_model(self):
        """Lazy load the sentence transformer model"""
        if not SENTENCE_TRANSFORMERS_AVAILABLE:
            return False
            
        if self.model is None:
            try:
                print(f"Loading local embedding model: {self.model_name}")
                self.model = SentenceTransformer(self.model_name)
                print("Local embedding model loaded successfully")
                return True
            except Exception as e:
                print(f"Error loading local embedding model: {e}")
                return False
        return True
    
    def generate_embedding(self, text: str) -> List[float]:
        """
        Generate embedding using local sentence-transformers model
        
        Args:
            text (str): Text to embed
            
        Returns:
            List[float]: Embedding vector (384-dim or 768-dim padded)
        """
        if not text or not isinstance(text, str):
            return self._get_zero_vector()
        
        if not self._load_model():
            print("Local embedding model not available, returning zero vector")
            return self._get_zero_vector()
        
        try:
            # Clean and limit text
            cleaned_text = text.replace('\n', ' ').replace('\t', ' ').strip()
            cleaned_text = cleaned_text[:1000]  # Limit for local processing
            
            if not cleaned_text:
                return self._get_zero_vector()
            
            # Generate embedding
            embedding = self.model.encode([cleaned_text])[0]
            
            # Convert to list and pad/truncate to 768 dimensions to match Gemini
            embedding_list = embedding.tolist()
            
            if len(embedding_list) < 768:
                # Pad with zeros to match Gemini's 768 dimensions
                embedding_list.extend([0.0] * (768 - len(embedding_list)))
            elif len(embedding_list) > 768:
                # Truncate to 768 dimensions
                embedding_list = embedding_list[:768]
            
            print(f"Generated local embedding: {len(embedding_list)} dimensions")
            return embedding_list
            
        except Exception as e:
            print(f"Error generating local embedding: {e}")
            return self._get_zero_vector()
    
    def generate_embeddings_batch(self, texts: List[str]) -> List[List[float]]:
        """
        Generate embeddings for multiple texts
        
        Args:
            texts (List[str]): List of texts to embed
            
        Returns:
            List[List[float]]: List of embedding vectors
        """
        if not texts:
            return []
        
        if not self._load_model():
            print("Local embedding model not available for batch processing")
            return [self._get_zero_vector() for _ in texts]
        
        try:
            # Clean texts
            cleaned_texts = []
            for text in texts:
                if text and isinstance(text, str):
                    cleaned = text.replace('\n', ' ').replace('\t', ' ').strip()[:1000]
                    cleaned_texts.append(cleaned if cleaned else "empty")
                else:
                    cleaned_texts.append("empty")
            
            # Generate embeddings
            embeddings = self.model.encode(cleaned_texts)
            
            # Convert and pad/truncate to 768 dimensions
            result = []
            for embedding in embeddings:
                embedding_list = embedding.tolist()
                
                if len(embedding_list) < 768:
                    embedding_list.extend([0.0] * (768 - len(embedding_list)))
                elif len(embedding_list) > 768:
                    embedding_list = embedding_list[:768]
                
                result.append(embedding_list)
            
            print(f"Generated {len(result)} local embeddings in batch")
            return result
            
        except Exception as e:
            print(f"Error in batch local embedding generation: {e}")
            return [self._get_zero_vector() for _ in texts]
    
    def _get_zero_vector(self) -> List[float]:
        """Return a 768-dimensional zero vector"""
        return [0.0] * 768
    
    def is_available(self) -> bool:
        """Check if local embedding service is available"""
        return SENTENCE_TRANSFORMERS_AVAILABLE and self._load_model()

# Global instance
local_embedding_service = LocalEmbeddingService()

def get_local_embedding(text: str) -> List[float]:
    """
    Convenience function to get local embedding
    """
    return local_embedding_service.generate_embedding(text)

def get_local_embeddings_batch(texts: List[str]) -> List[List[float]]:
    """
    Convenience function to get batch local embeddings
    """
    return local_embedding_service.generate_embeddings_batch(texts)