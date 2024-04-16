-- INSERT roles & accounts
-- system admin users
WITH role_insert AS (
  INSERT INTO roles
    (name)
    VALUES
      ('ROLE_SYSTEM_ADMIN')
    RETURNING
      id
)
INSERT INTO accounts
  (id, first_name, last_name, email, hashed_password, role_id, created_by, last_modified_by)
VALUES
  (1, 'SysAdmin', 'User', 'sysadmin@test.net', '$2a$10$4s.G7boZLt0RVvlQkl9RJuSbXF3XAol8zdriS9bqyrzUK0/tsJGhm', (SELECT id FROM role_insert), 'sysadmin@test.net', 'sysadmin@test.net'),
  (2, 'SysAdmin', 'User', 'sysadmin2@test.net', '$2a$10$4s.G7boZLt0RVvlQkl9RJuSbXF3XAol8zdriS9bqyrzUK0/tsJGhm', (SELECT id FROM role_insert), 'sysadmin2@test.net', 'sysadmin2@test.net');

INSERT INTO system_admins
  (id, account_id)
VALUES
  (1, 1),
  (2, 2);

-- institution admin users
WITH role_insert AS (
  INSERT INTO roles
    (name)
    VALUES
      ('ROLE_INSTITUTION_ADMIN')
    RETURNING
      id
)
INSERT INTO accounts
(id, first_name, last_name, email, hashed_password, role_id, created_by, last_modified_by)
VALUES
  (3, 'InsAdmin', 'User', 'insadmin@test.net', '$2a$10$4s.G7boZLt0RVvlQkl9RJuSbXF3XAol8zdriS9bqyrzUK0/tsJGhm', (SELECT id FROM role_insert), 'insadmin@test.net', 'insadmin@test.net'),
  (4, 'InsAdmin', 'User', 'insadmin2@test.net', '$2a$10$4s.G7boZLt0RVvlQkl9RJuSbXF3XAol8zdriS9bqyrzUK0/tsJGhm', (SELECT id FROM role_insert), 'insadmin2@test.net', 'insadmin2@test.net');

INSERT INTO institution_admins
(id, account_id)
VALUES
  (1, 3),
  (2, 4);

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
(id, first_name, last_name, email, hashed_password, role_id, created_by, last_modified_by)
VALUES
  (5, 'Mentor', 'User', 'mentor@test.net', '$2a$10$4s.G7boZLt0RVvlQkl9RJuSbXF3XAol8zdriS9bqyrzUK0/tsJGhm', (SELECT id FROM role_insert), 'mentor@test.net', 'mentor@test.net'),
  (6, 'Mentor', 'User', 'mentor2@test.net', '$2a$10$4s.G7boZLt0RVvlQkl9RJuSbXF3XAol8zdriS9bqyrzUK0/tsJGhm', (SELECT id FROM role_insert), 'mentor2@test.net', 'mentor2@test.net');

INSERT INTO mentors
  (id, account_id)
VALUES
  (1, 5),
  (2, 6);

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
(id, first_name, last_name, email, hashed_password, role_id, created_by, last_modified_by)
VALUES
  (7, 'Student', 'User', 'student@test.net', '$2a$10$4s.G7boZLt0RVvlQkl9RJuSbXF3XAol8zdriS9bqyrzUK0/tsJGhm', (SELECT id FROM role_insert), 'student@test.net', 'student@test.net'),
  (8, 'Student', 'User', 'student2@test.net', '$2a$10$4s.G7boZLt0RVvlQkl9RJuSbXF3XAol8zdriS9bqyrzUK0/tsJGhm', (SELECT id FROM role_insert), 'student2@test.net', 'student2@test.net');

INSERT INTO students
(id, account_id, mentor_id)
VALUES
  (1, 7, 1),
  (2, 8, 1);

-- INSERT countries & universities
WITH country AS (
  INSERT INTO countries
    (name, created_by, last_modified_by)
  VALUES
    ('Denmark', 'sysadmin@test.net', 'sysadmin@test.net')
  RETURNING
    id,
    name
)
INSERT INTO universities
  (country_id, name, abbreviation, address, created_by, last_modified_by)
VALUES
  ((SELECT id FROM country), 'Aarhus University', 'AU', '', 'sysadmin@test.net', 'sysadmin@test.net'),
  ((SELECT id FROM country), 'Roskilde University', 'RUC', '', 'sysadmin@test.net', 'sysadmin@test.net'),
  ((SELECT id FROM country), 'University of Copenhagen', 'KU', '', 'sysadmin@test.net', 'sysadmin@test.net');

WITH country AS (
  INSERT INTO countries
    (name, created_by, last_modified_by)
  VALUES
    ('Great Britain', 'sysadmin@test.net', 'sysadmin@test.net')
  RETURNING
    id,
    name
)
INSERT INTO universities
  (country_id, name, abbreviation, address, created_by, last_modified_by)
VALUES
  ((SELECT id FROM country), 'University of Oxford', 'UO', '', 'sysadmin@test.net', 'sysadmin@test.net');

WITH country AS (
  INSERT INTO countries
    (name, created_by, last_modified_by)
  VALUES
    ('United States', 'sysadmin@test.net', 'sysadmin@test.net')
  RETURNING
    id,
    name
)
INSERT INTO universities
  (country_id, name, abbreviation, address, created_by, last_modified_by)
VALUES
  ((SELECT id FROM country), 'New York University', 'NYU', '', 'sysadmin@test.net', 'sysadmin@test.net'),
  ((SELECT id FROM country), 'Harvard University', 'HU', '', 'sysadmin@test.net', 'sysadmin@test.net');

-- INSERT application_status
INSERT INTO application_status
  (name, created_by, last_modified_by)
VALUES
  ('Planned', 'sysadmin@test.net', 'sysadmin@test.net'),
  ('Submitted', 'sysadmin@test.net', 'sysadmin@test.net'),
  ('Withdrawn', 'sysadmin@test.net', 'sysadmin@test.net');

-- INSERT interview_status
INSERT INTO interview_status
  (name, created_by, last_modified_by)
VALUES
  ('No Interview', 'sysadmin@test.net', 'sysadmin@test.net'),
  ('Invited', 'sysadmin@test.net', 'sysadmin@test.net'),
  ('Not Invited', 'sysadmin@test.net', 'sysadmin@test.net');

-- INSERT offer_status
INSERT INTO offer_status
  (name, created_by, last_modified_by)
VALUES
  ('Unconditional', 'sysadmin@test.net', 'sysadmin@test.net'),
  ('Conditional', 'sysadmin@test.net', 'sysadmin@test.net'),
  ('Deferred', 'sysadmin@test.net', 'sysadmin@test.net'),
  ('Rejected', 'sysadmin@test.net', 'sysadmin@test.net');

-- INSERT response_status
INSERT INTO response_status
  (name, created_by, last_modified_by)
VALUES
  ('Firm Choice', 'sysadmin@test.net', 'sysadmin@test.net'),
  ('Insurance Choice', 'sysadmin@test.net', 'sysadmin@test.net'),
  ('Offer Declined', 'sysadmin@test.net', 'sysadmin@test.net');

-- INSERT final_destination_status
INSERT INTO final_destination_status
  (name, created_by, last_modified_by)
VALUES
  ('Final Destination', 'sysadmin@test.net', 'sysadmin@test.net'),
  ('Final Destination (Deferred Entry)', 'sysadmin@test.net', 'sysadmin@test.net'),
  ('Not Final Destination', 'sysadmin@test.net', 'sysadmin@test.net');

-- INSERT applications
INSERT INTO applications
  (student_id, country_id, university_id, course_name, programme_length, application_status_id, interview_status_id, offer_status_id, response_status_id, final_destination_status_id, created_by, last_modified_by)
VALUES
  (1, 1, 1, 'Business Administration', 3, 1, 1, 1, 1, 1, 'student@test.net', 'student@test.net'),
  (1, 1, 2, 'Logistics', 3, 1, 1, 1, 2, 3, 'student@test.net', 'student@test.net'),
  (1, 1, 3, 'Information Technology', 3, 1, 1, 1, 2, 3, 'student@test.net', 'student@test.net'),
  (1, 2, 4, 'Computer Science', 3, 2, 2, 3, 2, 3, 'student@test.net', 'student@test.net'),
  (1, 3, 5, 'Mathematics', 3, 2, 3, 3, 2, 3, 'student@test.net', 'student@test.net'),
  (2, 3, 6, 'Business Administration', 3, 3, 3, 3, 3, 3, 'student2@test.net', 'student2@test.net'),
  (2, 2, 4, 'Computer Science', 3, 2, 2, 3, 2, 3, 'student2@test.net', 'student2@test.net'),
  (2, 3, 5, 'Mathematics', 3, 2, 3, 3, 2, 3, 'student2@test.net', 'student2@test.net'),
  (2, 3, 6, 'Business Administration', 3, 3, 3, 3, 3, 3, 'student2@test.net', 'student2@test.net');
