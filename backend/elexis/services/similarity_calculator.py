
import numpy as np
import logging

logger = logging.getLogger(__name__)

def cosine_similarity(vec1: list, vec2: list) -> float:
    """
    Calculates the cosine similarity between two vectors.

    Args:
        vec1 (list): The first vector.
        vec2 (list): The second vector.

    Returns:
        float: The cosine similarity score between -1 and 1.
    """
    if not vec1 or not vec2 or len(vec1) != len(vec2):
        logger.error("Invalid vectors provided for cosine similarity calculation.")
        return 0.0 # Return 0 for invalid input

    try:
        vec1 = np.array(vec1)
        vec2 = np.array(vec2)

        dot_product = np.dot(vec1, vec2)
        norm_vec1 = np.linalg.norm(vec1)
        norm_vec2 = np.linalg.norm(vec2)

        if norm_vec1 == 0 or norm_vec2 == 0:
            return 0.0 # Avoid division by zero if a vector is all zeros

        similarity = dot_product / (norm_vec1 * norm_vec2)
        return float(similarity)
    except Exception as e:
        logger.error(f"Error calculating cosine similarity: {e}", exc_info=True)
        return 0.0

