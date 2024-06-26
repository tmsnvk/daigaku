#!/bin/bash

cd backend/common-libs/rabbitmq
mvn clean install -DskipTests

cd ../../..

cd backend/core
mvn clean install -DskipTests

cd ../..

cd backend/s3
mvn clean install -DskipTests

cd ../..

cd backend/email
mvn clean install -DskipTests

cd ../..

docker-compose -f docker-compose.yml up --build
