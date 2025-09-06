import os
from dotenv import load_dotenv

load_dotenv()

HOST = "https://api.amaxa.elexis.ai"

USERNAME = os.getenv("USERNAME")
PASSWORD = os.getenv("PASSWORD")


AWS_SQS_QUEUE_URL = os.getenv("AWS_SQS_QUEUE_URL")
AWS_REGION = os.getenv("AWS_REGION")
AWS_ACCESS_KEY = os.getenv("AWS_ACCESS_KEY")
AWS_SECRET_KEY = os.getenv("AWS_SECRET_KEY")