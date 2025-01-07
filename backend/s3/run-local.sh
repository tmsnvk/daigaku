# run-local.sh
# run spring boot s3 module on localhost

export $(cat ../../.env | xargs)

mvn spring-boot:run