FROM postgres:16.2-alpine

COPY schema.sql /docker-entrypoint-initdb.d/01_schema.sql
COPY data.sql /docker-entrypoint-initdb.d/02_data.sql

EXPOSE 5432