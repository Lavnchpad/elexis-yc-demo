import boto3
import os
import dotenv
dotenv.load_dotenv()
s3 = boto3.client(
    's3',
    endpoint_url= os.getenv("AWS_S3_ENDPOINT_URL"),
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
    region_name=os.getenv("AWS_REGION_NAME")
)
def get_file_data_from_s3(bucket,key):
    # s3 = boto3.client('s3')  # uses env vars automatically
    response = s3.get_object(Bucket=bucket, Key=key)
    return response['Body'].read().decode('utf-8')
def generate_signed_url(bucket_name, object_key, expires_in=3600):
    try:
        url = s3.generate_presigned_url(
            ClientMethod="get_object",
            Params={"Bucket": bucket_name, "Key": object_key},
            ExpiresIn=expires_in  # Time in seconds (e.g., 3600 = 1 hour)
        )
        return url
    except Exception as e:
        print("Error generating signed URL:", e)
        return None
