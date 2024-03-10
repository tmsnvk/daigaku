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
    (id, name)
    VALUES
      (1, 'Denmark')
    RETURNING
      uuid,
      name
)
INSERT INTO universities
(id, country_id, name, abbreviation, country, address)
VALUES
  (1, (SELECT uuid FROM country), 'Aarhus University', 'AU', (SELECT name FROM country), ''),
  (2, (SELECT uuid FROM country), 'Roskilde University', 'RUC', (SELECT name FROM country), ''),
  (3, (SELECT uuid FROM country), 'University of Copenhagen', 'KU', (SELECT name FROM country), '');

WITH country AS (
  INSERT INTO countries
    (id, name)
    VALUES
      (2, 'Great Britain')
    RETURNING
      uuid,
      name
)
INSERT INTO universities
(id, country_id, name, abbreviation, country, address)
VALUES
  (4, (SELECT uuid FROM country), 'University of Oxford', 'UO', (SELECT name FROM country), '');

WITH country AS (
  INSERT INTO countries
    (id, name)
    VALUES
      (3, 'United States')
    RETURNING
      uuid,
      name
)
INSERT INTO universities
(id, country_id, name, abbreviation, country, address)
VALUES
  (5, (SELECT uuid FROM country), 'New York University', 'NYU', (SELECT name FROM country), ''),
  (6, (SELECT uuid FROM country), 'Harvard University', 'HU', (SELECT name FROM country), '');


-- INSERT APPLICATION STATUS
INSERT INTO application_status
  (id, name)
VALUES
  (1, 'Planned'),
  (2, 'Submitted'),
  (3, 'Withdrawn');


-- INSERT INTERVIEW STATUS
INSERT INTO interview_status
(id, name)
VALUES
  (1, 'No Interview'),
  (2, 'Invited'),
  (3, 'Not Invited');


-- INSERT OFFER STATUS
INSERT INTO offer_status
(id, name)
VALUES
  (1, 'Unconditional'),
  (2, 'Conditional'),
  (3, 'Deferred'),
  (4, 'Rejected');


-- INSERT RESPONSE STATUS
INSERT INTO response_status
(id, name)
VALUES
  (1, 'Firm Choice'),
  (2, 'Insurance Choice'),
  (3, 'Offer Declined');


-- INSERT FINAL DESTINATION STATUS
INSERT INTO final_destination_status
(id, name)
VALUES
  (1, 'Final Destination'),
  (2, 'Final Destination (Deferred Entry)'),
  (3, 'Not Final Destination');
