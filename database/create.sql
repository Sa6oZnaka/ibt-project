DROP DATABASE IF EXISTS ibt;
CREATE DATABASE ibt;
USE ibt;

CREATE TABLE users(
	id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(30) NOT NULL,
    password VARCHAR(100) NOT NULL,
	firstname VARCHAR(30) NULL,
	lastname VARCHAR(30) NULL,
	email VARCHAR(50),
	reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE admins(
	id INT AUTO_INCREMENT PRIMARY KEY,
	userId INT,

	FOREIGN KEY (userId)
        REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE TABLE items(
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(30) NULL,
	price int NULL,
    orderCount int DEFAULT 0
);

CREATE TABLE orderStatus(
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(30) NOT NULL
);

CREATE TABLE userOrders(
	id INT AUTO_INCREMENT PRIMARY KEY,
	userId INT NOT NULL,
    itemId INT NOT NULL,
    orderStatus INT DEFAULT 1,
    
    FOREIGN KEY (userId)
        REFERENCES users(id)
        ON DELETE NO ACTION,
        
	FOREIGN KEY (itemId)
        REFERENCES items(id)
        ON DELETE NO ACTION,
	
    FOREIGN KEY (orderStatus)
        REFERENCES orderStatus(id)
        ON DELETE NO ACTION
);

INSERT INTO orderStatus (name) VALUES ("New"), ("Confirmed"), ("Canceled"), ("Delivedred");