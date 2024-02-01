-- INIT CLEAN UP
DROP TABLE IF EXISTS roles CASCADE;
DROP TABLE IF EXISTS accounts CASCADE;
DROP TABLE IF EXISTS pending_accounts CASCADE;
DROP TABLE IF EXISTS accounts_roles_join CASCADE;


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
  email VARCHAR(255) UNIQUE,
  hashed_password VARCHAR(255) NOT NULL
);

CREATE TABLE accounts_roles_join(
  account_id INT NOT NULL,
  role_id INT NOT NULL,
  PRIMARY KEY (account_id, role_id),
  FOREIGN KEY (account_id) REFERENCES accounts(id),
  FOREIGN KEY (role_id) REFERENCES roles(id)
);


-- DATA INSERT
INSERT INTO
  roles(id, name)
VALUES
  (1, 'ROLE_STUDENT'),
  (2, 'ROLE_MENTOR'),
  (3, 'ROLE_ADMIN');
