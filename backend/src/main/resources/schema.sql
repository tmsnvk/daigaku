-- INIT CLEAN UP
DROP TABLE IF EXISTS roles CASCADE;
DROP TABLE IF EXISTS accounts CASCADE;
DROP TABLE IF EXISTS pending_accounts CASCADE;
DROP TABLE IF EXISTS accounts_roles_join CASCADE;
DROP TABLE IF EXISTS pending_accounts CASCADE;
DROP TABLE IF EXISTS universities CASCADE;
DROP TABLE IF EXISTS countries CASCADE;
DROP TABLE IF EXISTS application_status CASCADE;
DROP TABLE IF EXISTS interview_status CASCADE;
DROP TABLE IF EXISTS offer_status CASCADE;
DROP TABLE IF EXISTS response_status CASCADE;
DROP TABLE IF EXISTS final_destination_status CASCADE;
DROP TABLE IF EXISTS applications CASCADE;


-- TABLES SET UP
CREATE TABLE roles(
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(15)
);

CREATE TABLE accounts(
  id BIGSERIAL PRIMARY KEY,
  uuid UUID DEFAULT gen_random_uuid() UNIQUE,
  created_at TIMESTAMP DEFAULT now() NOT NULL,
  last_updated_at TIMESTAMP DEFAULT now() NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  hashed_password VARCHAR(255) NOT NULL
);

CREATE TABLE accounts_roles_join(
  account_id BIGINT REFERENCES accounts(id),
  role_id BIGINT REFERENCES roles(id),
  PRIMARY KEY (account_id, role_id)
);

CREATE TABLE pending_accounts(
  id BIGSERIAL PRIMARY KEY,
  uuid UUID DEFAULT gen_random_uuid() UNIQUE,
  created_at TIMESTAMP DEFAULT now() NOT NULL,
  last_updated_at TIMESTAMP DEFAULT now() NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE countries(
  id BIGSERIAL PRIMARY KEY,
  uuid UUID DEFAULT gen_random_uuid() UNIQUE,
  created_at TIMESTAMP DEFAULT now() NOT NULL,
  last_updated_at TIMESTAMP DEFAULT now() NOT NULL,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE universities(
  id BIGSERIAL PRIMARY KEY,
  uuid UUID DEFAULT gen_random_uuid() UNIQUE,
  created_at TIMESTAMP DEFAULT now() NOT NULL,
  last_updated_at TIMESTAMP DEFAULT now() NOT NULL,
  country_id BIGINT REFERENCES countries(id),
  name VARCHAR(255) NOT NULL,
  abbreviation VARCHAR(255) NOT NULL,
  country VARCHAR(255) NOT NULL,
  address VARCHAR(255)
);

CREATE TABLE application_status(
  id BIGSERIAL PRIMARY KEY,
  uuid UUID DEFAULT gen_random_uuid() UNIQUE,
  created_at TIMESTAMP DEFAULT now() NOT NULL,
  last_updated_at TIMESTAMP DEFAULT now() NOT NULL,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE interview_status(
  id BIGSERIAL PRIMARY KEY,
  uuid UUID DEFAULT gen_random_uuid() UNIQUE,
  created_at TIMESTAMP DEFAULT now() NOT NULL,
  last_updated_at TIMESTAMP DEFAULT now() NOT NULL,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE offer_status(
  id BIGSERIAL PRIMARY KEY,
  uuid UUID DEFAULT gen_random_uuid() UNIQUE,
  created_at TIMESTAMP DEFAULT now() NOT NULL,
  last_updated_at TIMESTAMP DEFAULT now() NOT NULL,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE response_status(
  id BIGSERIAL PRIMARY KEY,
  uuid UUID DEFAULT gen_random_uuid() UNIQUE,
  created_at TIMESTAMP DEFAULT now() NOT NULL,
  last_updated_at TIMESTAMP DEFAULT now() NOT NULL,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE final_destination_status(
  id BIGSERIAL PRIMARY KEY,
  uuid UUID DEFAULT gen_random_uuid() UNIQUE,
  created_at TIMESTAMP DEFAULT now() NOT NULL,
  last_updated_at TIMESTAMP DEFAULT now() NOT NULL,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE applications(
  id BIGSERIAL PRIMARY KEY,
  uuid UUID DEFAULT gen_random_uuid() UNIQUE,
  created_at TIMESTAMP DEFAULT now() NOT NULL,
  last_updated_at TIMESTAMP DEFAULT now() NOT NULL,
  account_id BIGINT REFERENCES accounts(id),
  country BIGINT REFERENCES countries(id),
  university BIGINT REFERENCES universities(id),
  course_name VARCHAR(255) NOT NULL,
  minor_subject VARCHAR(255) DEFAULT NULL,
  programme_length BIGINT NOT NULL,
  application_status_id BIGINT REFERENCES application_status(id),
  interview_status_id BIGINT REFERENCES interview_status(id),
  offer_status_id BIGINT REFERENCES offer_status(id),
  response_status_id BIGINT REFERENCES response_status(id),
  final_destination_status_id BIGINT REFERENCES final_destination_status(id),
  notes VARCHAR(1500)
);
