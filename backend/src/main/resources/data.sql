-- INSERT countries
INSERT INTO countries
  (name, created_by, last_modified_by)
VALUES
  ('Hungary', 'sysadmin@test.net', 'sysadmin@test.net');

-- INSERT addresses
INSERT INTO addresses
  (id, street, city, country_id, zipcode)
VALUES
  (1, 'Main Street 1', 'Budapest', (SELECT id FROM countries WHERE name = 'Hungary'), '1097'),
  (2, 'Main Street 2', 'Budapest', (SELECT id FROM countries WHERE name = 'Hungary'), '1087'),
  (3, 'Main Street 3', 'Budapest', (SELECT id FROM countries WHERE name = 'Hungary'), '1077'),
  (4, 'Main Street 3', 'Budapest', (SELECT id FROM countries WHERE name = 'Hungary'), '1077');

-- INSERT institutions
INSERT INTO institutions
  (id, address_id, name, created_by, last_modified_by)
VALUES
  (1, 1, 'Budapesti Fazekas Mihály Gyakorló Általános Iskola és Gimnázium', 'sysadmin@test.net', 'sysadmin@test.net'),
  (2, 2, 'Budapest V. Kerületi Eötvös József Gimnázium', 'sysadmin@test.net', 'sysadmin@test.net'),
  (3, 3, 'ELTE Radnóti Miklós Gyakorló Általános Iskola és Gyakorló Gimnázium', 'sysadmin@test.net', 'sysadmin@test.net'),
  (4, 4, 'Toldy Ferenc Gimnázium', 'sysadmin@test.net', 'sysadmin@test.net');

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
  (id, address_id, first_name, last_name, email, hashed_password, role_id, created_by, last_modified_by)
VALUES
  (1, 1, 'SysAdmin', 'User', 'sysadmin@test.net', '$2a$10$4s.G7boZLt0RVvlQkl9RJuSbXF3XAol8zdriS9bqyrzUK0/tsJGhm', (SELECT id FROM role_insert), 'sysadmin@test.net', 'sysadmin@test.net'),
  (2, 2, 'SysAdmin', 'User', 'sysadmin2@test.net', '$2a$10$4s.G7boZLt0RVvlQkl9RJuSbXF3XAol8zdriS9bqyrzUK0/tsJGhm', (SELECT id FROM role_insert), 'sysadmin2@test.net', 'sysadmin2@test.net');

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
(id, address_id, first_name, last_name, email, hashed_password, role_id, created_by, last_modified_by)
VALUES
  (3, 1, 'InsAdmin', 'User', 'insadmin@test.net', '$2a$10$4s.G7boZLt0RVvlQkl9RJuSbXF3XAol8zdriS9bqyrzUK0/tsJGhm', (SELECT id FROM role_insert), 'insadmin@test.net', 'insadmin@test.net'),
  (4, 2, 'InsAdmin', 'User', 'insadmin2@test.net', '$2a$10$4s.G7boZLt0RVvlQkl9RJuSbXF3XAol8zdriS9bqyrzUK0/tsJGhm', (SELECT id FROM role_insert), 'insadmin2@test.net', 'insadmin2@test.net');

INSERT INTO institution_admins
(id, account_id, institution_id)
VALUES
  (1, 3, 1),
  (2, 4, 2);

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
(id, address_id, first_name, last_name, email, hashed_password, role_id, created_by, last_modified_by)
VALUES
  (5, 1, 'Mentor', 'User', 'mentor@test.net', '$2a$10$4s.G7boZLt0RVvlQkl9RJuSbXF3XAol8zdriS9bqyrzUK0/tsJGhm', (SELECT id FROM role_insert), 'mentor@test.net', 'mentor@test.net'),
  (6, 2, 'Mentor', 'User', 'mentor2@test.net', '$2a$10$4s.G7boZLt0RVvlQkl9RJuSbXF3XAol8zdriS9bqyrzUK0/tsJGhm', (SELECT id FROM role_insert), 'mentor2@test.net', 'mentor2@test.net');

INSERT INTO mentors
  (id, account_id, institution_id)
VALUES
  (1, 5, 1),
  (2, 6, 2);

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
(id, address_id, first_name, last_name, email, hashed_password, role_id, created_by, last_modified_by)
VALUES
  (7, 3, 'Student', 'User', 'student@test.net', '$2a$10$4s.G7boZLt0RVvlQkl9RJuSbXF3XAol8zdriS9bqyrzUK0/tsJGhm', (SELECT id FROM role_insert), 'student@test.net', 'student@test.net'),
  (8, 4, 'Student', 'User', 'student2@test.net', '$2a$10$4s.G7boZLt0RVvlQkl9RJuSbXF3XAol8zdriS9bqyrzUK0/tsJGhm', (SELECT id FROM role_insert), 'student2@test.net', 'student2@test.net');

INSERT INTO students
(id, account_id, mentor_id, institution_id)
VALUES
  (1, 7, 1, 1),
  (2, 8, 1, 2);

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
  (country_id, name, abbreviation, address_id, created_by, last_modified_by)
VALUES
  ((SELECT id FROM country), 'Aarhus University', 'AU', (SELECT id FROM addresses WHERE id = 4), 'sysadmin@test.net', 'sysadmin@test.net'),
  ((SELECT id FROM country), 'Roskilde University', 'RUC', (SELECT id FROM addresses WHERE id = 4), 'sysadmin@test.net', 'sysadmin@test.net'),
  ((SELECT id FROM country), 'University of Copenhagen', 'KU', (SELECT id FROM addresses WHERE id = 4), 'sysadmin@test.net', 'sysadmin@test.net');

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
  (country_id, name, abbreviation, address_id, created_by, last_modified_by)
VALUES
  ((SELECT id FROM country), 'University of Oxford', 'UO', (SELECT id FROM addresses WHERE id = 4), 'sysadmin@test.net', 'sysadmin@test.net');

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
  (country_id, name, abbreviation, address_id, created_by, last_modified_by)
VALUES
  ((SELECT id FROM country), 'New York University', 'NYU', (SELECT id FROM addresses WHERE id = 4), 'sysadmin@test.net', 'sysadmin@test.net'),
  ((SELECT id FROM country), 'Harvard University', 'HU', (SELECT id FROM addresses WHERE id = 4), 'sysadmin@test.net', 'sysadmin@test.net');

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
  (1, 2, 1, 'Business Administration', 3, 1, 1, 1, 1, 1, 'student@test.net', 'student@test.net'),
  (1, 2, 2, 'Logistics', 3, 1, 1, 1, 2, 3, 'student@test.net', 'student@test.net'),
  (1, 2, 3, 'Information Technology', 3, 1, 1, 1, 2, 3, 'student@test.net', 'student@test.net'),
  (1, 2, 4, 'Computer Science', 3, 1, 1, 1, 2, 3, 'student@test.net', 'student@test.net'),
  (1, 4, 5, 'Mathematics', 3, 1, 1, 1, 2, 3, 'student@test.net', 'student@test.net'),
  (2, 4, 6, 'Business Administration', 3, 1, 1, 1, 3, 3, 'student2@test.net', 'student2@test.net'),
  (2, 3, 4, 'Computer Science', 3, 1, 1, 1, 2, 3, 'student2@test.net', 'student2@test.net'),
  (2, 4, 5, 'Mathematics', 3, 1, 1, 1, 2, 3, 'student2@test.net', 'student2@test.net'),
  (2, 4, 6, 'Business Administration', 3, 1, 1, 1, 3, 3, 'student2@test.net', 'student2@test.net');
