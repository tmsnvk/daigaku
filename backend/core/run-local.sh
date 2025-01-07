# run-local.sh
# run spring boot core module with local profile on localhost

export $(cat ../../.env | xargs)

export SPRING_PROFILES_ACTIVE=local

mvn spring-boot:run