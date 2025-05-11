#!/bin/bash
set -e

# Load environment variables from the .env file
source /app/.env

echo "Setting up S3 bucket and SQS queue in LocalStack..."

# Create S3 bucket using the settings from the .env file
aws --endpoint-url=http://localhost:4566 --region ${AWS_REGION_NAME} s3 mb s3://${AWS_STORAGE_BUCKET_NAME}

# Apply CORS configuration for S3 bucket using environment variables
aws --endpoint-url=http://localhost:4566 --region ${AWS_REGION_NAME} s3api put-bucket-cors \
  --bucket ${AWS_STORAGE_BUCKET_NAME} \
  --cors-configuration '{
    "CORSRules": [{
      "AllowedHeaders": ["*"],
      "AllowedMethods": ["GET", "POST", "PUT", "DELETE", "HEAD"],
      "AllowedOrigins": ["*"],
      "ExposeHeaders": [],
      "MaxAgeSeconds": 3000
    }]
  }'

# Create SQS queue using environment variables
aws --endpoint-url=http://localhost:4566 --region ${AWS_REGION_NAME} sqs create-queue \
  --queue-name ${AWS_SQS_QUEUE_NAME}

echo "✅ LocalStack resources created!"
