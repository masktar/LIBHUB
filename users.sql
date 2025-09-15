use libhub;

UPDATE users
SET password = '12'
where email = 'test@gmail.com';

SELECT * FROM users;
