use libhub;

UPDATE users
SET password = '98765'
where email = 'user2@example.com';

SELECT * FROM users;
