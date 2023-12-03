CREATE DATABASE employee;
USE employee;


CREATE TABLE data(
    id integer PRIMARY KEY AUTO_INCREMENT,
    empid VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    dob varchar(255) NOT NULL,
    salary integer NOT NULL,
    experience integer NOT NULL,
    address TEXT NOT NULL,
    dept VARCHAR(255) NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW()
)