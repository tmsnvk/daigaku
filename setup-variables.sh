#!/bin/bash

cp .env_sample .env

cd backend/core
cp env_sample.properties env.properties

cd ..
cd rabbitmq
cp env_sample.properties env.properties

cd ..
cd s3
cp env_sample.properties env.properties

echo "The script execution completed successfully. An env.properties file was created in each backend folder (core, rabbit & s3) and a .env file in the root directory. Fill in each file with the necessary configuration details, then run 'bash setup-containers.sh' from the root directory."
exit 0
