"""
Pinecone-based embedding service using Pinecone Inference API
This bypasses Gemini completely for embedding generation
"""

import os
from typing import List
from pinecone import Pinecone
from dotenv import load_dotenv
import logging

load_dotenv()
logger = logging.getLogger(__name__)

class PineconeEmbeddingService:
    """
    Embedding service using Pinecone's Inference API
    """
    
    def __init__(self):
        self.api_key = os.getenv('PINECONE_API_KEY')
        self.client = None
        self.model_name = 'multilingual-e5-large'  # Good multilingual model
        self._initialize_client()
    
    def _initialize_client(self):
        """Initialize Pinecone client for inference"""
        if not self.api_key:
            logger.error("PINECONE_API_KEY not found in environment variables")
            return
        
        try:
            self.client = Pinecone(api_key=self.api_key)
            logger.info("Pinecone Inference client initialized successfully")
        except Exception as e:
            logger.error(f"Error initializing Pinecone Inference client: {e}")
            self.client = None
    
    def generate_embedding(self, text: str) -> List[float]:
        """
        Generate embedding using Pinecone Inference API
        
        Args:
            text (str): Text to embed
            
        Returns:
            List[float]: 768-dimensional embedding vector
        """
        if not text or not isinstance(text, str):
            logger.warning("Invalid text provided for embedding generation")
            return [0.0] * 768
        
        if not self.client:
            logger.error("Pinecone client not initialized")
            return [0.0] * 768
        
        try:
            # Clean and limit text
            cleaned_text = text.strip().replace('\n', ' ').replace('\t', ' ')
            cleaned_text = cleaned_text[:8000]  # Pinecone's text limit
            
            if not cleaned_text:
                logger.warning("Text became empty after cleaning")
                return [0.0] * 768
            
            # Generate embedding using Pinecone Inference API
            response = self.client.inference.embed(
                model=self.model_name,
                inputs=[cleaned_text],
                parameters={"input_type": "passage", "truncate": "END"}
            )
            
            # Extract embedding vector
            if response and response.data and len(response.data) > 0:
                embedding = response.data[0].values
                
                # Ensure 768 dimensions (pad or truncate as needed)
                if len(embedding) < 768:
                    embedding.extend([0.0] * (768 - len(embedding)))
                elif len(embedding) > 768:
                    embedding = embedding[:768]
                
                logger.info(f"Generated Pinecone embedding: {len(embedding)} dimensions")
                return embedding
            else:
                logger.error("Empty response from Pinecone Inference API")
                return [0.0] * 768
                
        except Exception as e:
            logger.error(f"Error generating Pinecone embedding: {e}")
            # Check if it's a quota/limit error
            error_msg = str(e).lower()
            if "quota" in error_msg or "limit" in error_msg or "429" in error_msg:
                logger.warning("Pinecone embedding quota/rate limit hit")
            return [0.0] * 768
    
    def generate_embeddings_batch(self, texts: List[str]) -> List[List[float]]:
        """
        Generate embeddings for multiple texts using Pinecone Inference API
        
        Args:
            texts (List[str]): List of texts to embed
            
        Returns:
            List[List[float]]: List of 768-dimensional embedding vectors
        """
        if not texts:
            return []
        
        if not self.client:
            logger.error("Pinecone client not initialized")
            return [[0.0] * 768 for _ in texts]
        
        try:
            # Clean texts
            cleaned_texts = []
            for text in texts:
                if text and isinstance(text, str):
                    cleaned = text.strip().replace('\n', ' ').replace('\t', ' ')
                    cleaned = cleaned[:8000]  # Pinecone's text limit
                    cleaned_texts.append(cleaned if cleaned else "empty")
                else:
                    cleaned_texts.append("empty")
            
            # Generate embeddings in batch
            response = self.client.inference.embed(
                model=self.model_name,
                inputs=cleaned_texts,
                parameters={"input_type": "passage", "truncate": "END"}
            )
            
            embeddings = []
            if response and response.data:
                for i, embedding_data in enumerate(response.data):
                    embedding = embedding_data.values
                    
                    # Ensure 768 dimensions
                    if len(embedding) < 768:
                        embedding.extend([0.0] * (768 - len(embedding)))
                    elif len(embedding) > 768:
                        embedding = embedding[:768]
                    
                    embeddings.append(embedding)
                
                logger.info(f"Generated {len(embeddings)} Pinecone embeddings in batch")
                return embeddings
            else:
                logger.error("Empty response from Pinecone Inference API")
                return [[0.0] * 768 for _ in texts]
                
        except Exception as e:
            logger.error(f"Error in batch Pinecone embedding generation: {e}")
            return [[0.0] * 768 for _ in texts]
    
    def is_available(self) -> bool:
        """Check if Pinecone embedding service is available"""
        return self.client is not None
    
    def get_model_info(self) -> dict:
        """Get information about the current embedding model"""
        return {
            "provider": "Pinecone Inference API",
            "model": self.model_name,
            "dimensions": 768,
            "max_text_length": 8000
        }

# Global instance
pinecone_embedding_service = PineconeEmbeddingService()

def get_pinecone_embedding(text: str) -> List[float]:
    """
    Convenience function to get Pinecone embedding
    """
    return pinecone_embedding_service.generate_embedding(text)

def get_pinecone_embeddings_batch(texts: List[str]) -> List[List[float]]:
    """
    Convenience function to get batch Pinecone embeddings
    """
    return pinecone_embedding_service.generate_embeddings_batch(texts)