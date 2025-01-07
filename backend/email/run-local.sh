# run-local.sh
# run spring boot email module on localhost

export $(cat ../../.env | xargs)

mvn spring-boot:run