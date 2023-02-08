CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE DATABASE jwttest;

CREATE TABLE users (
    user_id uuid  PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name TEXT NOT NULL,
    user_email TEXT NOT NULL,
    user_password TEXT NOT NULL
);


SELECT * FROM users;

INSERT INTO users (user_name, user_email, user_password) VALUES('anas','anas@gmail.com','1699');
INSERT INTO users (user_name, user_email, user_password) VALUES('anas2','anas2@gmail.com','1699');

--psql -U postgres
--\c jwttest
--\dt 
--heroku pg:psql