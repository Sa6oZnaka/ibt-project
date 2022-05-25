DROP DATABASE IF EXISTS ibt;
CREATE DATABASE ibt;
USE ibt;

CREATE TABLE users(
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(30) NOT NULL,
    password VARCHAR(100) NOT NULL,
	firstname VARCHAR(30) NULL,
	lastname VARCHAR(30) NULL,
	email VARCHAR(50),
	reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)

CREATE TABLE items(
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(30) NULL,
	price int NULL,
)