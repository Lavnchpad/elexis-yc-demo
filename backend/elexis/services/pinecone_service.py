import logging
from django.conf import settings
import numpy as np
from pinecone import Pinecone, PodSpec
from typing import Any # Import Any for type hinting
import dotenv
dotenv.load_dotenv()


logger = logging.getLogger(__name__)

class PineconeClient:
    """
    A client for interacting with Pinecone for vector embeddings.
    """
    _instance = None

    def __new__(cls):
        """
        Implements a Singleton pattern.
        """
        if cls._instance is None:
            cls._instance = super(PineconeClient, cls).__new__(cls)
            cls._instance._initialize_client()
        return cls._instance

    def _initialize_client(self):
        """
        Initializes the Pinecone client and connects to the specified index.
        """
        self.api_key = settings.PINECONE_API_KEY
        self.environment = settings.PINECONE_ENVIRONMENT
        self.index_name = settings.PINECONE_INDEX_NAME
        self.dimension = 768 # Gemini embedding dimension
        self.metric = 'cosine'

        if not self.api_key or not self.environment or not self.index_name:
            raise ValueError("Pinecone environment variables (API_KEY, ENVIRONMENT, INDEX_NAME) not set.")

        try:
            self.pinecone = Pinecone(api_key=self.api_key, environment=self.environment)
            
            # Check if index exists, create if not
            if self.index_name not in self.pinecone.list_indexes().names():
                logger.info(f"Creating new Pinecone index: {self.index_name}")
                # For ServerlessSpec, you'll need to specify a cloud and region.
                # Example for Serverless:
                # self.pinecone.create_index(
                #     name=self.index_name,
                #     dimension=self.dimension,
                #     metric=self.metric,
                #     spec=ServerlessSpec(cloud='aws', region='us-west-2') # Adjust cloud/region
                # )
                # Example for PodSpec (starter tier is often PodSpec)
                self.pinecone.create_index(
                    name=self.index_name,
                    dimension=self.dimension,
                    metric=self.metric,
                    spec=PodSpec(environment=self.environment) # Use environment for PodSpec
                )
                logger.info(f"Waiting for Pinecone index '{self.index_name}' to be ready...")
                # Polling for index readiness (Pinecone's client might have a wait_until_ready method)
                # For now, a simple loop:
                import time
                while True:
                    index_status = self.pinecone.describe_index(self.index_name).status.state
                    if index_status == 'Ready':
                        break
                    logger.info(f"Index '{self.index_name}' not ready yet. Status: {index_status}. Waiting...")
                    time.sleep(5) # Wait 5 seconds before checking again
                logger.info(f"Pinecone index '{self.index_name}' is ready.")
            else:
                logger.info(f"Using existing Pinecone index: {self.index_name}")

            # Corrected: self.index is an instance obtained from self.pinecone.Index()
            self.index: Any = self.pinecone.Index(self.index_name) 
            logger.info("Pinecone client initialized successfully.")
        except Exception as e:
            logger.error(f"Error initializing Pinecone client: {e}", exc_info=True)
            raise

    def upsert_vectors(self, vectors: list):
        """
        Upserts (inserts or updates) vectors into the Pinecone index.

        Args:
            vectors (list): A list of (id, vector, metadata) tuples or dicts.
                            e.g., [('vec1', [0.1, ...], {'key': 'value'})]
        """
        try:
            response = self.index.upsert(vectors=vectors)
            logger.info(f"Upserted {response.upserted_count} vectors to Pinecone.")
            return response
        # except GRPCStatusError as e:
        #     logger.error(f"gRPC error during Pinecone upsert: {e.details}", exc_info=True)
        #     raise
        except Exception as e:
            logger.error(f"Error upserting vectors to Pinecone: {e}", exc_info=True)
            raise

    def query_vectors(self, vector: list, top_k: int = 5, filters: dict = None):
        """
        Queries the Pinecone index for similar vectors.

        Args:
            vector (list): The query vector.
            top_k (int): The number of top similar vectors to retrieve.
            filters (dict, optional): Metadata filters for the query.
                                      e.g., {'resume_id': 'some_uuid'}

        Returns:
            list: A list of dicts, each containing 'id', 'score', and 'metadata'.
        """
        try:
            response = self.index.query(
                vector=vector,
                top_k=top_k,
                include_metadata=True,
                filter=filters
            )
            matches = []
            for match in response.matches:
                matches.append({
                    'id': match.id,
                    'score': match.score,
                    'metadata': match.metadata
                })
            logger.info(f"Found {len(matches)} matches in Pinecone.")
            return matches
        # except GRPCStatusError as e:
        #     logger.error(f"gRPC error during Pinecone query: {e.details}", exc_info=True)
        #     raise
        except Exception as e:
            logger.error(f"Error querying Pinecone: {e}", exc_info=True)
            raise

    def fetch_vectors(self, ids: list):
        """
        Fetches vectors by their IDs from the Pinecone index.

        Args:
            ids (list): A list of vector IDs to fetch.

        Returns:
            dict: A dictionary of fetched vectors, keyed by ID.
        """
        try:
            response = self.index.fetch(ids=ids)
            # response.vectors is a dict of {id: vector_object}
            fetched_data = {
                vec_id: vec.values for vec_id, vec in response.vectors.items()
            }
            logger.info(f"Fetched {len(fetched_data)} vectors from Pinecone.")
            return fetched_data
        except Exception as e:
            logger.error(f"Error fetching vectors from Pinecone: {e}", exc_info=True)
            raise

    def get_similarity_between_stored_vectors(self, id1: str, id2: str) -> float | None:
            """
            Calculates the similarity between two vectors already stored in the Pinecone index.

            Args:
                id1 (str): The ID of the first vector in Pinecone.
                id2 (str): The ID of the second vector in Pinecone.

            Returns:
                float | None: The similarity score (e.g., cosine similarity) between the two vectors,
                            or None if either vector is not found or an error occurs.
            """

            if not id1 or not id2:
                logger.warning("Both vector IDs must be provided to calculate similarity.")
                return None

            try:
                logger.info(f"Attempting to fetch vector '{id1}' for query to calculate similarity with '{id2}'.")
                # 1. Fetch the embedding of the first vector to use as the query vector
                fetched_data = self.fetch_vectors(ids=[id1])
                vector1_embedding = fetched_data.get(id1)

                if not vector1_embedding:
                    logger.warning(f"Vector with ID '{id1}' not found in Pinecone. Cannot perform query for similarity.")
                    return None

                # 2. Query Pinecone using the first vector's embedding, and filter specifically for the second vector's ID
                # We use 'resume_id' in metadata because we explicitly added it during upsert.
                query_results = self.index.query(
                    vector=vector1_embedding,
                    top_k=1, # We only need the similarity to one specific other vector (id2)
                    include_metadata=True, # We don't need metadata in the result for this specific task
                    filter={"resume_id": {"$eq": id2}} # Filter by the 'resume_id' field in metadata
                )

                # 3. Extract the similarity score from the result
                if query_results.matches and query_results.matches[0].id == id2:
                    similarity = query_results.matches[0].score
                    logger.info(f"Pinecone calculated similarity between '{id1}' and '{id2}': {similarity}")
                    return similarity
                else:
                    logger.warning(f"Vector with ID '{id2}' not found when querying with '{id1}' or filter yielded no match.")
                    return None


            except Exception as e:
                logger.error(f"Error calculating similarity between stored vectors '{id1}' and '{id2}': {e}", exc_info=True)
                return None

# Initialize the Pinecone client (Singleton instance)
pinecone_client = PineconeClient()