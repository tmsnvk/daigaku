-- INSERT roles & accounts
-- admin users
WITH role_insert AS (
  INSERT INTO roles
    (name)
    VALUES
      ('ROLE_ADMIN')
    RETURNING
      id
)
INSERT INTO accounts
  (id, first_name, last_name, email, hashed_password, role_id)
VALUES
  (1, 'Admin', 'User', 'admin@test.net', '$2a$10$4s.G7boZLt0RVvlQkl9RJuSbXF3XAol8zdriS9bqyrzUK0/tsJGhm', (SELECT id FROM role_insert));

INSERT INTO admins
  (id, account_id)
VALUES
  (1, 1);

INSERT INTO accounts_admins_junction
  (account_id, admin_id)
VALUES
  (1, 1);

-- mentor users
WITH role_insert AS (
  INSERT INTO roles
    (name)
    VALUES
      ('ROLE_MENTOR')
    RETURNING
      id
)
INSERT INTO accounts
(id, first_name, last_name, email, hashed_password, role_id)
VALUES
  (2, 'Mentor', 'User', 'mentor@test.net', '$2a$10$4s.G7boZLt0RVvlQkl9RJuSbXF3XAol8zdriS9bqyrzUK0/tsJGhm', (SELECT id FROM role_insert));

INSERT INTO mentors
  (id, account_id)
VALUES
  (1, 2);

INSERT INTO accounts_mentors_junction
  (account_id, mentor_id)
VALUES
  (2, 1);

-- student users
WITH role_insert AS (
  INSERT INTO roles
    (name)
    VALUES
      ('ROLE_STUDENT')
    RETURNING
      id
)
INSERT INTO accounts
(id, first_name, last_name, email, hashed_password, role_id)
VALUES
  (3, 'Student', 'User', 'student@test.net', '$2a$10$4s.G7boZLt0RVvlQkl9RJuSbXF3XAol8zdriS9bqyrzUK0/tsJGhm', (SELECT id FROM role_insert));

INSERT INTO students
(id, account_id, mentor_id)
VALUES
  (1, 3, 1);

INSERT INTO accounts_students_junction
(account_id, student_id)
VALUES
  (3, 1);

-- INSERT countries & universities
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

-- INSERT application_status
INSERT INTO application_status
  (name)
VALUES
  ('Planned'),
  ('Submitted'),
  ('Withdrawn');

-- INSERT interview_status
INSERT INTO interview_status
  (name)
VALUES
  ('No Interview'),
  ('Invited'),
  ('Not Invited');

-- INSERT offer_status
INSERT INTO offer_status
  (name)
VALUES
  ('Unconditional'),
  ('Conditional'),
  ('Deferred'),
  ('Rejected');

-- INSERT response_status
INSERT INTO response_status
  (name)
VALUES
  ('Firm Choice'),
  ('Insurance Choice'),
  ('Offer Declined');

-- INSERT final_destination_status
INSERT INTO final_destination_status
  (name)
VALUES
  ('Final Destination'),
  ('Final Destination (Deferred Entry)'),
  ('Not Final Destination');

-- INSERT applications
INSERT INTO applications
  (student_id, country_id, university_id, course_name, programme_length, application_status_id, interview_status_id, offer_status_id, response_status_id, final_destination_status_id)
VALUES
  (1, 1, 1, 'Test - Country 1 - Uni 1', 3, 1, 1, 1, 1, 1),
  (1, 1, 2, 'Test - Country 1 - Uni 2', 3, 1, 1, 1, 2, 3),
  (1, 2, 3, 'Test - Country 2 - Uni 3', 3, 1, 2, 3, 2, 3),
  (1, 2, 3, 'Test - Country 2 - Uni 3', 3, 1, 3, 3, 2, 3),
  (1, 3, 4, 'Test - Country 3 - Uni 4', 3, 1, 3, 3, 3, 3);
