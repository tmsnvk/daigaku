-- INSERT ROLES
INSERT INTO
  roles(id, name)
VALUES
  (1, 'ROLE_STUDENT'),
  (2, 'ROLE_MENTOR'),
  (3, 'ROLE_ADMIN');


-- INSERT USERS
INSERT INTO accounts
  (id, uuid, registered_at, last_updated_at, first_name, last_name, email, hashed_password)
VALUES
  (1, gen_random_uuid(), current_timestamp, current_timestamp, 'Admin', 'User', 'admin@test.net', '$2a$10$4s.G7boZLt0RVvlQkl9RJuSbXF3XAol8zdriS9bqyrzUK0/tsJGhm'),
  (2, gen_random_uuid(), current_timestamp, current_timestamp, 'Mentor', 'User', 'mentor@test.net', '$2a$10$4s.G7boZLt0RVvlQkl9RJuSbXF3XAol8zdriS9bqyrzUK0/tsJGhm'),
  (3, gen_random_uuid(), current_timestamp, current_timestamp, 'Student', 'User', 'student@test.net', '$2a$10$4s.G7boZLt0RVvlQkl9RJuSbXF3XAol8zdriS9bqyrzUK0/tsJGhm');

INSERT INTO accounts_roles_join
  (role_id, account_id)
VALUES
  (3, 1),
  (2, 2),
  (1, 3);


-- INSERT COUNTRIES
INSERT INTO countries
  (id, uuid, created_at, last_updated_at, name)
VALUES
  (1, gen_random_uuid(), current_timestamp, current_timestamp, 'Denmark'),
  (2, gen_random_uuid(), current_timestamp, current_timestamp, 'Great Britain'),
  (3, gen_random_uuid(), current_timestamp, current_timestamp, 'United States');

-- INSERT UNIVERSITIES
INSERT INTO universities
  (id, country_id, uuid, created_at, last_updated_at, name, abbreviation, country, address)
VALUES
  (1, 1, gen_random_uuid(), current_timestamp, current_timestamp, 'Aarhus University', 'AU', 'Denmark', ''),
  (2, 1, gen_random_uuid(), current_timestamp, current_timestamp, 'Roskilde University', 'RUC', 'Denmark', ''),
  (3, 1, gen_random_uuid(), current_timestamp, current_timestamp, 'University of Copenhagen', 'KU', 'Denmark', ''),
  (4, 2, gen_random_uuid(), current_timestamp, current_timestamp, 'University of Oxford', 'UO', 'Great Britain', ''),
  (5, 3, gen_random_uuid(), current_timestamp, current_timestamp, 'New York University', 'NYU', 'United States', ''),
  (6, 3, gen_random_uuid(), current_timestamp, current_timestamp, 'Harvard University', 'HU', 'United States', '');


--
