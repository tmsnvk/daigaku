-- TABLES CLEAN UP
DROP TABLE IF EXISTS countries CASCADE;
DROP TABLE IF EXISTS addresses CASCADE;
DROP TABLE IF EXISTS roles CASCADE;
DROP TABLE IF EXISTS institutions CASCADE;
DROP TABLE IF EXISTS pending_accounts CASCADE;
DROP TABLE IF EXISTS accounts CASCADE;
DROP TABLE IF EXISTS system_admins CASCADE;
DROP TABLE IF EXISTS institution_admins CASCADE;
DROP TABLE IF EXISTS mentors CASCADE;
DROP TABLE IF EXISTS students CASCADE;
DROP TABLE IF EXISTS universities CASCADE;
DROP TABLE IF EXISTS application_status CASCADE;
DROP TABLE IF EXISTS interview_status CASCADE;
DROP TABLE IF EXISTS offer_status CASCADE;
DROP TABLE IF EXISTS response_status CASCADE;
DROP TABLE IF EXISTS final_destination_status CASCADE;
DROP TABLE IF EXISTS applications CASCADE;
DROP TABLE IF EXISTS comments CASCADE;

-- TABLES SET UP
-- database-wide tables
CREATE TABLE countries
(
  id               SERIAL PRIMARY KEY,
  uuid             UUID        NOT NULL,
  created_at       TIMESTAMPTZ NOT NULL,
  last_updated_at  TIMESTAMPTZ NOT NULL,
  created_by       VARCHAR     NOT NULL,
  last_modified_by VARCHAR     NOT NULL,
  name             VARCHAR     NOT NULL
);

CREATE TABLE addresses
(
  id         SERIAL PRIMARY KEY,
  street     VARCHAR NOT NULL,
  city       VARCHAR NOT NULL,
  country_id BIGINT REFERENCES countries (id),
  zipcode    VARCHAR
);

-- necessary tables for accounts
CREATE TABLE roles
(
  id   SERIAL PRIMARY KEY,
  uuid UUID    NOT NULL,
  name VARCHAR NOT NULL
);

CREATE TABLE institutions
(
  id               SERIAL PRIMARY KEY,
  uuid             UUID        NOT NULL,
  created_at       TIMESTAMPTZ NOT NULL,
  last_updated_at  TIMESTAMPTZ NOT NULL,
  created_by       VARCHAR     NOT NULL,
  last_modified_by VARCHAR     NOT NULL,
  name             VARCHAR     NOT NULL,
  address_id       BIGINT REFERENCES addresses (id)
);

-- account-related tables
CREATE TABLE pending_accounts
(
  id               SERIAL PRIMARY KEY,
  uuid             UUID           NOT NULL,
  created_at       TIMESTAMPTZ    NOT NULL,
  last_updated_at  TIMESTAMPTZ    NOT NULL,
  created_by       VARCHAR        NOT NULL,
  last_modified_by VARCHAR        NOT NULL,
  first_name       VARCHAR        NOT NULL,
  last_name        VARCHAR        NOT NULL,
  email            VARCHAR UNIQUE NOT NULL,
  institution_id   BIGINT REFERENCES institutions (id),
  role_id          BIGINT REFERENCES roles (id)
);

CREATE TABLE accounts
(
  id               SERIAL PRIMARY KEY,
  uuid             UUID           NOT NULL,
  created_at       TIMESTAMPTZ    NOT NULL,
  last_updated_at  TIMESTAMPTZ    NOT NULL,
  created_by       VARCHAR        NOT NULL,
  last_modified_by VARCHAR        NOT NULL,
  first_name       VARCHAR        NOT NULL,
  last_name        VARCHAR        NOT NULL,
  full_name        VARCHAR GENERATED ALWAYS AS (first_name || ' ' || last_name) STORED,
  email            VARCHAR UNIQUE NOT NULL,
  hashed_password  VARCHAR        NOT NULL,
  address_id       BIGINT REFERENCES addresses (id),
  institution_id   BIGINT REFERENCES institutions (id),
  role_id          BIGINT REFERENCES roles (id)
);

CREATE TABLE system_admins
(
  id         SERIAL PRIMARY KEY,
  account_id BIGINT REFERENCES accounts (id)
);

CREATE TABLE institution_admins
(
  id             SERIAL PRIMARY KEY,
  account_id     BIGINT REFERENCES accounts (id),
  institution_id BIGINT REFERENCES institutions (id)
);

CREATE TABLE mentors
(
  id             SERIAL PRIMARY KEY,
  account_id     BIGINT REFERENCES accounts (id),
  institution_id BIGINT REFERENCES institutions (id)
);

CREATE TABLE students
(
  id             SERIAL PRIMARY KEY,
  account_id     BIGINT REFERENCES accounts (id),
  mentor_id      BIGINT REFERENCES mentors (id),
  institution_id BIGINT REFERENCES institutions (id)
);

-- application-related tables
CREATE TABLE universities
(
  id               SERIAL PRIMARY KEY,
  uuid             UUID        NOT NULL,
  created_at       TIMESTAMPTZ NOT NULL,
  last_updated_at  TIMESTAMPTZ NOT NULL,
  created_by       VARCHAR     NOT NULL,
  last_modified_by VARCHAR     NOT NULL,
  country_id       BIGINT REFERENCES countries (id),
  name             VARCHAR     NOT NULL,
  abbreviation     VARCHAR     NOT NULL,
  address_id       BIGINT REFERENCES addresses (id)
);

CREATE TABLE application_status
(
  id   SERIAL PRIMARY KEY,
  uuid UUID    NOT NULL,
  name VARCHAR NOT NULL
);

CREATE TABLE interview_status
(
  id   SERIAL PRIMARY KEY,
  uuid UUID    NOT NULL,
  name VARCHAR NOT NULL
);

CREATE TABLE offer_status
(
  id   SERIAL PRIMARY KEY,
  uuid UUID    NOT NULL,
  name VARCHAR NOT NULL
);

CREATE TABLE response_status
(
  id   SERIAL PRIMARY KEY,
  uuid UUID    NOT NULL,
  name VARCHAR NOT NULL
);

CREATE TABLE final_destination_status
(
  id   SERIAL PRIMARY KEY,
  uuid UUID    NOT NULL,
  name VARCHAR NOT NULL
);

-- applications
CREATE TABLE applications
(
  id                          SERIAL PRIMARY KEY,
  uuid                        UUID        NOT NULL,
  created_at                  TIMESTAMPTZ NOT NULL,
  last_updated_at             TIMESTAMPTZ NOT NULL,
  created_by                  VARCHAR     NOT NULL,
  last_modified_by            VARCHAR     NOT NULL,
  student_id                  BIGINT REFERENCES students (id),
  country_id                  BIGINT REFERENCES countries (id),
  university_id               BIGINT REFERENCES universities (id),
  course_name                 VARCHAR     NOT NULL,
  minor_subject               VARCHAR DEFAULT NULL,
  programme_length            INT         NOT NULL,
  application_status_id       BIGINT REFERENCES application_status (id),
  interview_status_id         BIGINT REFERENCES interview_status (id),
  offer_status_id             BIGINT REFERENCES offer_status (id),
  response_status_id          BIGINT REFERENCES response_status (id),
  final_destination_status_id BIGINT REFERENCES final_destination_status (id),
  is_removable                BOOLEAN     NOT NULL
);

-- comments
CREATE TABLE comments
(
  id               SERIAL PRIMARY KEY,
  uuid             UUID        NOT NULL,
  created_at       TIMESTAMPTZ NOT NULL,
  last_updated_at  TIMESTAMPTZ NOT NULL,
  created_by       VARCHAR     NOT NULL,
  last_modified_by VARCHAR     NOT NULL,
  content          TEXT        NOT NULL,
  application_id   BIGINT REFERENCES applications (id),
  account_id       BIGINT REFERENCES accounts (id)
)
