FROM eclipse-temurin:21-jdk-alpine AS build-stage

ARG JAR_FILE=target/*.jar

COPY ${JAR_FILE} application.jar

RUN java -Djarmode=layertools -jar application.jar extract

FROM eclipse-temurin:21-jdk-alpine AS prod-stage

COPY ./env.properties .

COPY --from=build-stage dependencies/ ./
COPY --from=build-stage snapshot-dependencies/ ./
COPY --from=build-stage spring-boot-loader/ ./
COPY --from=build-stage application/ ./

EXPOSE 8081

ENTRYPOINT ["java", "org.springframework.boot.loader.launch.JarLauncher"]
