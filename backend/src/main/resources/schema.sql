-- INIT CLEAN UP
DROP TABLE IF EXISTS roles CASCADE;
DROP TABLE IF EXISTS accounts CASCADE;
DROP TABLE IF EXISTS pending_accounts CASCADE;
DROP TABLE IF EXISTS accounts_roles_join CASCADE;
DROP TABLE IF EXISTS pending_account_registrations CASCADE;
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
  id SERIAL PRIMARY KEY,
  name VARCHAR(15)
);

CREATE TABLE accounts(
  id SERIAL PRIMARY KEY,
  uuid UUID DEFAULT gen_random_uuid() UNIQUE,
  registered_at TIMESTAMP DEFAULT now() NOT NULL,
  last_updated_at TIMESTAMP DEFAULT now() NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  hashed_password VARCHAR(255) NOT NULL
);

CREATE TABLE accounts_roles_join(
  account_id INT REFERENCES accounts(id),
  role_id INT REFERENCES roles(id),
  PRIMARY KEY (account_id, role_id)
);

CREATE TABLE pending_account_registrations(
  id SERIAL PRIMARY KEY,
  registered_at TIMESTAMP DEFAULT NOW() NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE countries(
  id SERIAL PRIMARY KEY,
  uuid UUID DEFAULT gen_random_uuid() UNIQUE,
  created_at TIMESTAMP DEFAULT now() NOT NULL,
  last_updated_at TIMESTAMP DEFAULT now() NOT NULL,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE universities(
  id SERIAL PRIMARY KEY,
  uuid UUID DEFAULT gen_random_uuid() UNIQUE,
  country_id UUID REFERENCES countries(uuid),
  created_at TIMESTAMP DEFAULT now() NOT NULL,
  last_updated_at TIMESTAMP DEFAULT now() NOT NULL,
  name VARCHAR(255) NOT NULL,
  abbreviation VARCHAR(255) NOT NULL,
  country VARCHAR(255) NOT NULL,
  address VARCHAR(255)
);

CREATE TABLE application_status(
  id SERIAL PRIMARY KEY,
  uuid UUID DEFAULT gen_random_uuid() UNIQUE,
  created_at TIMESTAMP DEFAULT now() NOT NULL,
  last_updated_at TIMESTAMP DEFAULT now() NOT NULL,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE interview_status(
  id SERIAL PRIMARY KEY,
  uuid UUID DEFAULT gen_random_uuid() UNIQUE,
  created_at TIMESTAMP DEFAULT now() NOT NULL,
  last_updated_at TIMESTAMP DEFAULT now() NOT NULL,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE offer_status(
  id SERIAL PRIMARY KEY,
  uuid UUID DEFAULT gen_random_uuid() UNIQUE,
  created_at TIMESTAMP DEFAULT now() NOT NULL,
  last_updated_at TIMESTAMP DEFAULT now() NOT NULL,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE response_status(
  id SERIAL PRIMARY KEY,
  uuid UUID DEFAULT gen_random_uuid() UNIQUE,
  created_at TIMESTAMP DEFAULT now() NOT NULL,
  last_updated_at TIMESTAMP DEFAULT now() NOT NULL,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE final_destination_status(
  id SERIAL PRIMARY KEY,
  uuid UUID DEFAULT gen_random_uuid() UNIQUE,
  created_at TIMESTAMP DEFAULT now() NOT NULL,
  last_updated_at TIMESTAMP DEFAULT now() NOT NULL,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE applications(
  id SERIAL PRIMARY KEY,
  uuid UUID DEFAULT gen_random_uuid() UNIQUE,
  account_id UUID REFERENCES accounts(uuid),
  created_at TIMESTAMP DEFAULT now() NOT NULL,
  last_updated_at TIMESTAMP DEFAULT now() NOT NULL,
  country UUID REFERENCES countries(uuid),
  university UUID REFERENCES universities(uuid),
  major_name VARCHAR(255) NOT NULL,
  minor_name VARCHAR(255),
  programme_length INT NOT NULL,
  application_status_id UUID REFERENCES application_status(uuid),
  interview_status_id UUID REFERENCES interview_status(uuid),
  offer_status_id UUID REFERENCES offer_status(uuid),
  response_status_id UUID REFERENCES response_status(uuid),
  final_destination_status_id UUID REFERENCES final_destination_status(uuid),
  notes VARCHAR(1500)
);
