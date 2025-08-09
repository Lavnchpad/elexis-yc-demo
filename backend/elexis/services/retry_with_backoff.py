import functools
import time
import logging

def retry_with_exponential_backoff(retries=3, initial_delay=1, backoff_factor=2, exceptions=(Exception,)):
    """
    A decorator to retry a function with exponential backoff.
    
    Args:
        retries (int): The number of times to retry the function.
        initial_delay (int): The initial delay in seconds before the first retry.
        backoff_factor (int): The factor by which to increase the delay.
        exceptions (tuple): A tuple of exception types to catch and retry on.
    """
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            delay = initial_delay
            for i in range(retries):
                try:
                    return func(*args, **kwargs)
                except exceptions as e:
                    # Log the retry attempt
                    logging.warning(f"Attempt {i + 1} of {retries} failed for {func.__name__}. Retrying in {delay} seconds. Error: {e}")
                    
                    if i < retries - 1:
                        time.sleep(delay)
                        delay *= backoff_factor
                    else:
                        # Re-raise the exception on the last retry
                        raise
        return wrapper
    return decorator