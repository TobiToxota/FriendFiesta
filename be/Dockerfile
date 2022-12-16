# base image
FROM python:3.9.6-alpine

# setup environment variable  
ENV DockerHOME=/home/app/webapp  

# # setup environment variable for SuperUser (Only for DevEnvironment)
# ENV DJANGO_Name=Admin
# ENV DJANGO_Email=admin@admin.de
# ENV DJANGO_Password=mypass

# where your code lives  
WORKDIR /usr/dev/ltshangout/be

# set environment variables  
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1  

# install psycopg2 dependencies
RUN apk update \
    && apk add postgresql-dev gcc python3-dev musl-dev

# install dependencies  
RUN pip install --upgrade pip  
COPY ./requirements.txt .
RUN pip install -r requirements.txt  

# Copy project
COPY . .