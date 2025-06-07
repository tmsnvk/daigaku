-- INSERT countries
INSERT INTO countries
  (uuid, name, created_by, last_modified_by, created_at, last_updated_at)
VALUES
  (gen_random_uuid(), 'Hungary', 'sysadmin@test.net', 'sysadmin@test.net', current_timestamp, current_timestamp);

-- INSERT addresses
INSERT INTO addresses
  (street, city, country_id, zipcode)
VALUES
  ('Main Street 1', 'Budapest', (SELECT id FROM countries WHERE name = 'Hungary'), '1097'),
  ('Main Street 2', 'Budapest', (SELECT id FROM countries WHERE name = 'Hungary'), '1087'),
  ('Main Street 3', 'Budapest', (SELECT id FROM countries WHERE name = 'Hungary'), '1077'),
  ('Main Street 4', 'Budapest', (SELECT id FROM countries WHERE name = 'Hungary'), '1067');

-- INSERT institutions
INSERT INTO institutions
  (uuid, address_id, name, created_by, last_modified_by, created_at, last_updated_at)
VALUES
  (gen_random_uuid(), (SELECT id FROM addresses LIMIT 1), 'Budapesti Fazekas Mihály Gyakorló Általános Iskola és Gimnázium', 'sysadmin@test.net', 'sysadmin@test.net', current_timestamp,  current_timestamp),
  (gen_random_uuid(), (SELECT id FROM addresses OFFSET 1 LIMIT 1), 'Budapest V. Kerületi Eötvös József Gimnázium', 'sysadmin@test.net', 'sysadmin@test.net', current_timestamp, current_timestamp),
  (gen_random_uuid(), (SELECT id FROM addresses OFFSET 2 LIMIT 1), 'ELTE Radnóti Miklós Gyakorló Általános Iskola és Gyakorló Gimnázium', 'sysadmin@test.net',
   'sysadmin@test.net', current_timestamp, current_timestamp),
  (gen_random_uuid(), (SELECT id FROM addresses OFFSET 3 LIMIT 1), 'Toldy Ferenc Gimnázium', 'sysadmin@test.net', 'sysadmin@test.net', current_timestamp, current_timestamp);

-- INSERT roles & accounts
-- system admin users
WITH role_insert AS (
  INSERT INTO roles
    (uuid, name)
  VALUES
    (gen_random_uuid(), 'ROLE_SYSTEM_ADMIN')
  RETURNING
    id
)
INSERT INTO accounts
  (uuid, address_id, first_name, last_name, email, hashed_password, institution_id, role_id, created_by, last_modified_by, created_at, last_updated_at)
VALUES
  (gen_random_uuid(), (SELECT id FROM addresses LIMIT 1), 'SysAdmin', 'User', 'sysadmin@test.net', '$2a$10$4s.G7boZLt0RVvlQkl9RJuSbXF3XAol8zdriS9bqyrzUK0/tsJGhm', (SELECT id FROM institutions WHERE id = 1), (SELECT id FROM role_insert), 'sysadmin@test.net', 'sysadmin@test.net', current_timestamp, current_timestamp);

INSERT INTO system_admins
  (account_id)
VALUES
  ((SELECT id FROM accounts WHERE email = 'sysadmin@test.net'));

-- institution admin users
WITH role_insert AS (
  INSERT INTO roles
    (uuid, name)
  VALUES
    (gen_random_uuid(), 'ROLE_INSTITUTION_ADMIN')
  RETURNING
    id
)
INSERT INTO accounts
  (uuid, address_id, first_name, last_name, email, hashed_password, institution_id, role_id, created_by, last_modified_by, created_at, last_updated_at)
VALUES
  (gen_random_uuid(), (SELECT id FROM addresses LIMIT 1), 'InsAdmin', 'User', 'insadmin@test.net', '$2a$10$4s.G7boZLt0RVvlQkl9RJuSbXF3XAol8zdriS9bqyrzUK0/tsJGhm', (SELECT id FROM institutions WHERE id = 1), (SELECT id FROM role_insert), 'insadmin@test.net', 'insadmin@test.net', current_timestamp, current_timestamp);

INSERT INTO institution_admins
(account_id, institution_id)
VALUES
  ((SELECT id FROM accounts WHERE email = 'insadmin@test.net'), (SELECT id FROM institutions LIMIT 1));

-- mentor users
WITH role_insert AS (
  INSERT INTO roles
    (uuid, name)
  VALUES
    (gen_random_uuid(), 'ROLE_MENTOR')
  RETURNING
    id
)
INSERT INTO accounts
  (uuid, address_id, first_name, last_name, email, hashed_password, institution_id, role_id, created_by, last_modified_by, created_at, last_updated_at)
VALUES
  (gen_random_uuid(), (SELECT id FROM addresses LIMIT 1), 'Mentor', 'User', 'mentor@test.net', '$2a$10$4s.G7boZLt0RVvlQkl9RJuSbXF3XAol8zdriS9bqyrzUK0/tsJGhm', (SELECT id FROM institutions WHERE id = 1), (SELECT id FROM role_insert), 'mentor@test.net', 'mentor@test.net', current_timestamp, current_timestamp);

INSERT INTO mentors
  (account_id, institution_id)
VALUES
  ((SELECT id FROM accounts WHERE email = 'mentor@test.net'), (SELECT id FROM institutions LIMIT 1));

-- student users
WITH role_insert AS (
  INSERT INTO roles
    (uuid, name)
  VALUES
    (gen_random_uuid(), 'ROLE_STUDENT')
  RETURNING
    id
)
INSERT INTO accounts
  (uuid, address_id, first_name, last_name, email, hashed_password, institution_id, role_id, created_by, last_modified_by, created_at, last_updated_at)
VALUES
  (gen_random_uuid(), (SELECT id FROM addresses OFFSET 2 LIMIT 1), 'Student', 'User', 'student@test.net', '$2a$10$4s.G7boZLt0RVvlQkl9RJuSbXF3XAol8zdriS9bqyrzUK0/tsJGhm', (SELECT id FROM institutions WHERE id = 1), (SELECT id FROM role_insert), 'student@test.net', 'student@test.net', current_timestamp, current_timestamp);

INSERT INTO students
  (account_id, mentor_id, institution_id)
VALUES
  ((SELECT id FROM accounts WHERE email = 'student@test.net'), (SELECT id FROM mentors LIMIT 1), (SELECT id FROM institutions LIMIT 1)),
  ((SELECT id FROM accounts WHERE email = 'student2@test.net'), (SELECT id FROM mentors OFFSET 1 LIMIT 1), (SELECT id FROM institutions OFFSET 1 LIMIT 1));

-- INSERT countries & universities
WITH country_insert AS (
  INSERT INTO countries
    (uuid, name, created_by, last_modified_by, created_at, last_updated_at)
  VALUES
    (gen_random_uuid(), 'Denmark', 'sysadmin@test.net', 'sysadmin@test.net', current_timestamp, current_timestamp)
  RETURNING
    id
)
INSERT INTO universities
  (uuid, country_id, name, abbreviation, address_id, created_by, last_modified_by, created_at, last_updated_at)
VALUES
  (gen_random_uuid(), (SELECT id FROM country_insert), 'Aarhus University', 'AU', (SELECT id FROM addresses WHERE id = 4), 'sysadmin@test.net', 'sysadmin@test.net', current_timestamp, current_timestamp),
  (gen_random_uuid(), (SELECT id FROM country_insert), 'Roskilde University', 'RUC', (SELECT id FROM addresses WHERE id = 4), 'sysadmin@test.net', 'sysadmin@test.net', current_timestamp, current_timestamp),
  (gen_random_uuid(), (SELECT id FROM country_insert), 'University of Copenhagen', 'KU', (SELECT id FROM addresses WHERE id = 4), 'sysadmin@test.net', 'sysadmin@test.net', current_timestamp, current_timestamp);

WITH country_insert AS (
  INSERT INTO countries
    (uuid, name, created_by, last_modified_by, created_at, last_updated_at)
  VALUES
    (gen_random_uuid(), 'Great Britain', 'sysadmin@test.net', 'sysadmin@test.net', current_timestamp, current_timestamp)
  RETURNING
    id
)
INSERT INTO universities
  (uuid, country_id, name, abbreviation, address_id, created_by, last_modified_by, created_at, last_updated_at)
VALUES
  (gen_random_uuid(), (SELECT id FROM country_insert), 'University of Oxford', 'UO', (SELECT id FROM addresses WHERE id = 4), 'sysadmin@test.net', 'sysadmin@test.net', current_timestamp, current_timestamp);

WITH country_insert AS (
  INSERT INTO countries
    (uuid, name, created_by, last_modified_by, created_at, last_updated_at)
  VALUES
    (gen_random_uuid(), 'United States', 'sysadmin@test.net', 'sysadmin@test.net', current_timestamp, current_timestamp)
  RETURNING
    id
)
INSERT INTO universities
  (uuid, country_id, name, abbreviation, address_id, created_by, last_modified_by, created_at, last_updated_at)
VALUES
  (gen_random_uuid(), (SELECT id FROM country_insert), 'New York University', 'NYU', (SELECT id FROM addresses WHERE id = 4), 'sysadmin@test.net', 'sysadmin@test.net', current_timestamp, current_timestamp),
  (gen_random_uuid(), (SELECT id FROM country_insert), 'Harvard University', 'HU', (SELECT id FROM addresses WHERE id = 4), 'sysadmin@test.net', 'sysadmin@test.net', current_timestamp, current_timestamp);

-- INSERT applications
INSERT INTO applications
  (uuid, student_id, country_id, university_id, course_name, programme_length, application_status, interview_status, offer_status, response_status, final_destination_status,
   created_by, last_modified_by, created_at, last_updated_at, is_removable)
VALUES
  (gen_random_uuid(), 1, 2, 1, 'Business Administration', 3, 'SUBMITTED', 'INVITED', 'UNCONDITIONAL', 'INSURANCE_CHOICE', 'NOT_FINAL_DESTINATION', 'student@test.net', 'student@test.net', current_timestamp, current_timestamp, false),
  (gen_random_uuid(), 1, 2, 2, 'Logistics', 3, 'SUBMITTED', 'INVITED', 'UNCONDITIONAL', 'INSURANCE_CHOICE', 'NOT_FINAL_DESTINATION', 'student@test.net', 'student@test.net', current_timestamp, current_timestamp, false),
  (gen_random_uuid(), 1, 2, 3, 'Information Technology', 3, 'SUBMITTED', 'INVITED', 'UNCONDITIONAL', 'INSURANCE_CHOICE', 'NOT_FINAL_DESTINATION', 'student@test.net', 'student@test.net', current_timestamp, current_timestamp, false),
  (gen_random_uuid(), 1, 3, 4, 'Computer Science', 3, 'SUBMITTED', 'INVITED', 'UNCONDITIONAL', 'FIRM_CHOICE', 'FINAL_DESTINATION', 'student@test.net', 'student@test.net', current_timestamp, current_timestamp, false),
  (gen_random_uuid(), 1, 4, 5, 'Mathematics', 3, 'SUBMITTED', 'INVITED', 'UNCONDITIONAL', 'INSURANCE_CHOICE', 'NOT_FINAL_DESTINATION', 'student@test.net', 'student@test.net', current_timestamp, current_timestamp, false);

-- INSERT comments
INSERT INTO comments
  (uuid, application_id, account_id, content, created_by, last_modified_by, created_at, last_updated_at)
VALUES
  (gen_random_uuid(), 1, 4, 'This is the very first test comment.', 'student@test.net', 'student@test.net', current_timestamp, current_timestamp),
  (gen_random_uuid(), 1, 4, 'This is the second test comment.', 'student@test.net', 'student@test.net', current_timestamp, current_timestamp),
  (gen_random_uuid(), 1, 4, 'This is the third test comment.', 'student@test.net', 'student@test.net', current_timestamp, current_timestamp);
