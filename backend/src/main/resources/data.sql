-- INSERT ROLES
INSERT INTO
  roles(id, name)
VALUES
  (1, 'ROLE_STUDENT'),
  (2, 'ROLE_MENTOR'),
  (3, 'ROLE_ADMIN');

-- INSERT USERS
INSERT INTO accounts
  (id, first_name, last_name, email, hashed_password)
VALUES
  (1, 'Admin', 'User', 'admin@test.net', '$2a$10$4s.G7boZLt0RVvlQkl9RJuSbXF3XAol8zdriS9bqyrzUK0/tsJGhm'),
  (2, 'Mentor', 'User', 'mentor@test.net', '$2a$10$4s.G7boZLt0RVvlQkl9RJuSbXF3XAol8zdriS9bqyrzUK0/tsJGhm'),
  (3, 'Student', 'User', 'student@test.net', '$2a$10$4s.G7boZLt0RVvlQkl9RJuSbXF3XAol8zdriS9bqyrzUK0/tsJGhm');

INSERT INTO accounts_roles_join
  (role_id, account_id)
VALUES
  (3, 1),
  (2, 2),
  (1, 3);

-- INSERT INTO countries & universities
WITH country AS (
  INSERT INTO countries
    (name)
  VALUES
    ('Denmark')
  RETURNING
    id,
    name
)
INSERT INTO universities
  (country_id, name, abbreviation, address)
VALUES
  ((SELECT id FROM country), 'Aarhus University', 'AU', ''),
  ((SELECT id FROM country), 'Roskilde University', 'RUC', ''),
  ((SELECT id FROM country), 'University of Copenhagen', 'KU', '');

WITH country AS (
  INSERT INTO countries
    (name)
  VALUES
    ('Great Britain')
  RETURNING
    id,
    name
)
INSERT INTO universities
  (country_id, name, abbreviation, address)
VALUES
  ((SELECT id FROM country), 'University of Oxford', 'UO', '');

WITH country AS (
  INSERT INTO countries
    (name)
  VALUES
    ('United States')
  RETURNING
    id,
    name
)
INSERT INTO universities
  (country_id, name, abbreviation, address)
VALUES
  ((SELECT id FROM country), 'New York University', 'NYU', ''),
  ((SELECT id FROM country), 'Harvard University', 'HU', '');

-- INSERT APPLICATION STATUS
INSERT INTO application_status
  (name)
VALUES
  ('Planned'),
  ('Submitted'),
  ('Withdrawn');

-- INSERT INTERVIEW STATUS
INSERT INTO interview_status
  (name)
VALUES
  ('No Interview'),
  ('Invited'),
  ('Not Invited');

-- INSERT OFFER STATUS
INSERT INTO offer_status
  (name)
VALUES
  ('Unconditional'),
  ('Conditional'),
  ('Deferred'),
  ('Rejected');

-- INSERT RESPONSE STATUS
INSERT INTO response_status
  (name)
VALUES
  ('Firm Choice'),
  ('Insurance Choice'),
  ('Offer Declined');

-- INSERT FINAL DESTINATION STATUS
INSERT INTO final_destination_status
  (name)
VALUES
  ('Final Destination'),
  ('Final Destination (Deferred Entry)'),
  ('Not Final Destination');

-- INSERT APPLICATIONS
INSERT INTO applications
  (account_id, country, university, course_name, programme_length, application_status_id, interview_status_id, offer_status_id, response_status_id, final_destination_status_id)
VALUES
  (3, 1, 1, 'Test - Country 1 - Uni 1', 3, 1, 1, 1, 1, 1),
  (3, 1, 2, 'Test - Country 1 - Uni 2', 3, 1, 1, 1, 2, 3),
  (3, 2, 3, 'Test - Country 2 - Uni 3', 3, 1, 2, 3, 2, 3),
  (3, 2, 3, 'Test - Country 2 - Uni 3', 3, 1, 3, 3, 2, 3),
  (3, 3, 4, 'Test - Country 3 - Uni 4', 3, 1, 3, 3, 3, 3);
