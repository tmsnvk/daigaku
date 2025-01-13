#!/bin/bash

cp .env_sample .env
cp .env-test_sample .env-test

echo "The script execution completed successfully. \
.env files were created in the root directory. \
Fill in the files with the necessary configuration details and environment variables, then run 'bash setup-containers.sh' from the root directory."

exit 0
