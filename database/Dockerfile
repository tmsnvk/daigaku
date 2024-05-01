FROM postgres:16.2-alpine3.19 AS build-stage

ENV POSTGRES_DB ${POSTGRES_DATABASE}
ENV POSTGRES_USER ${POSTGRES_USER}
ENV POSTGRES_PASSWORD ${POSTGRES_PASSWORD}

COPY schema.sql /docker-entrypoint-initdb.d/01_schema.sql
COPY data.sql /docker-entrypoint-initdb.d/02_data.sql

EXPOSE 5432