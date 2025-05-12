# Fetching official base image for python
FROM python:3.10-alpine AS web

# Setting up the work directory
WORKDIR /home/app/

# Preventing python from writing
# pyc to docker container
ENV PYTHONDONTWRITEBYTECODE=1

# Flushing out python buffer
ENV PYTHONUNBUFFERED=1

# Updating the os
RUN apk update 

# Installing python3
RUN apk add python3-dev

RUN apk add --no-cache g++
RUN apk add --no-cache build-base
# Copying requirement file
COPY ./requirements.txt ./

# Upgrading pip version
RUN pip install --upgrade pip
RUN pip install grpcio --only-binary=grpcio
# Installing dependencies
RUN pip install gunicorn

# Installing dependencies
RUN pip install --no-cache-dir -r ./requirements.txt

# Copying all the files in our project
COPY . .
RUN chmod +x docker-entrypoint.sh
CMD ["sh","./docker-entrypoint.sh"]
