-- DATA INSERT
INSERT INTO
  roles(id, name)
VALUES
  (1, 'ROLE_STUDENT'),
  (2, 'ROLE_MENTOR'),
  (3, 'ROLE_ADMIN');

INSERT INTO accounts
  (id, uuid, registered_at, last_updated_at, first_name, last_name, email, hashed_password)
VALUES
  (1, gen_random_uuid(), current_timestamp, current_timestamp, 'Admin', 'Admin', 'admin@test.net', '$2a$10$pBXmk1FKMWW4ywbMBBVbj.LyvC4uiQpZVJOX2zg.Exc3QmTjifzQO');
