-- INIT CLEAN UP
DROP TABLE IF EXISTS roles CASCADE;
DROP TABLE IF EXISTS accounts CASCADE;
DROP TABLE IF EXISTS pending_accounts CASCADE;
DROP TABLE IF EXISTS accounts_roles_join CASCADE;
DROP TABLE IF EXISTS pending_account_registrations CASCADE;
DROP TABLE IF EXISTS universities CASCADE;
DROP TABLE IF EXISTS countries CASCADE;

-- DATABASE SET UP
CREATE TABLE roles(
  id SERIAL PRIMARY KEY,
  name VARCHAR(15)
);

CREATE TABLE accounts(
  id SERIAL PRIMARY KEY,
  uuid UUID DEFAULT gen_random_uuid(),
  registered_at TIMESTAMP DEFAULT now(),
  last_updated_at TIMESTAMP DEFAULT now(),
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  hashed_password VARCHAR(255) NOT NULL
);

CREATE TABLE accounts_roles_join(
  account_id INT NOT NULL,
  role_id INT NOT NULL,
  PRIMARY KEY (account_id, role_id),
  FOREIGN KEY (account_id) REFERENCES accounts(id),
  FOREIGN KEY (role_id) REFERENCES roles(id)
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
  uuid UUID DEFAULT gen_random_uuid(),
  created_at TIMESTAMP DEFAULT now(),
  last_updated_at TIMESTAMP DEFAULT now(),
  name VARCHAR(255) NOT NULL
);

CREATE TABLE universities(
  id SERIAL PRIMARY KEY,
  uuid UUID DEFAULT gen_random_uuid(),
  created_at TIMESTAMP DEFAULT now(),
  last_updated_at TIMESTAMP DEFAULT now(),
  name VARCHAR(255) NOT NULL,
  abbreviation VARCHAR(255) NOT NULL,
  country VARCHAR(255) NOT NULL,
  address VARCHAR(255)
);
