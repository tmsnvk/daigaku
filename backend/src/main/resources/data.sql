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


-- INSERT UNIVERSITIES
INSERT INTO universities
  (id, uuid, created_at, last_updated_at, name, abbreviation, country_code, address)
VALUES
  (1, gen_random_uuid(), current_timestamp, current_timestamp, 'Aarhus University', 'AU', 'DNK', ''),
  (2, gen_random_uuid(), current_timestamp, current_timestamp, 'University of Oxford', 'UO', 'GBR', ''),
  (3, gen_random_uuid(), current_timestamp, current_timestamp, 'Roskilde University', 'RUC', 'DNK', ''),
  (4, gen_random_uuid(), current_timestamp, current_timestamp, 'New York University', 'NYU', 'USA', '');


--
