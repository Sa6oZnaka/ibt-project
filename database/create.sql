DROP DATABASE IF EXISTS ibt;
CREATE DATABASE ibt;
USE ibt;

CREATE TABLE users(
	id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(30) NOT NULL,
    password VARCHAR(100) NOT NULL,

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
	description VARCHAR(200) NULL,
	price float NULL,
    src VARCHAR(500) NULL
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
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (userId)
        REFERENCES users(id)
        ON DELETE NO ACTION,
        
	FOREIGN KEY (itemId)
        REFERENCES items(id)
        ON DELETE CASCADE,
	
    FOREIGN KEY (orderStatus)
        REFERENCES orderStatus(id)
        ON DELETE NO ACTION
);

CREATE TABLE userReviews(
	id INT AUTO_INCREMENT PRIMARY KEY,
	userId INT NOT NULL,
    itemId INT NOT NULL,
    text varchar(50) NULL,
    rating INT NOT NULL,

    FOREIGN KEY (userId)
        REFERENCES users(id)
        ON DELETE NO ACTION,
        
	FOREIGN KEY (itemId)
        REFERENCES items(id)
        ON DELETE CASCADE
);

INSERT INTO orderStatus (name) VALUES ("Нова"), ("Потвърдена"), ("Отказана"), ("Завършена");
INSERT INTO items (name, description, price, src) VALUES 
("Когато Над Витоша Мръкне", "Тениските “Когато Над Витоша Мръкне” вече са в продажба!", 29.99, "https://scontent.fsof9-1.fna.fbcdn.net/v/t1.6435-9/118780189_1844054425745298_1820077001096607349_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=n-WG48GPLUsAX8Zhj4n&_nc_ht=scontent.fsof9-1.fna&oh=00_AT_XKdViyN9IOikspeoZcb702oYVHts94i_SkNcuHtozUw&oe=62B6A78A"),
("Спаси и Сохрани", "Нови суичери Спаси и Сохрани вече са в продажба в неограничено количество", 59.99, "https://scontent.fsof9-1.fna.fbcdn.net/v/t1.6435-9/142200508_1980487448768661_1962692230367439682_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=6BkZNvFzCLgAX8nVGyv&_nc_ht=scontent.fsof9-1.fna&oh=00_AT9OZZNZM0qq8pGPnuOS-lpOWrDiOBesffalzLVQfGnihg&oe=62B598A0"),
("СМЪРТ ПРЕДИ ПОЗОРА", "Тениските “СМЪРТ ПРЕДИ ПОЗОРА” вече са в продажба в ограничено количество!", 39.99, "https://scontent.fsof9-1.fna.fbcdn.net/v/t1.6435-9/166186582_2033654213451984_3978099561441522413_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=0hKHnUdw8vwAX-vj8Vh&_nc_ht=scontent.fsof9-1.fna&oh=00_AT8GbBvwe3L7eX9hcj75ZCl2R6FureaSZyd_D5Ov4RvsOw&oe=62B766E9"),
("Тениска школата Hustle", "Новите тениски “Школа ХЪСTLE” са в продажба в ограничено количество!!", 29.99, "https://scontent.fsof9-1.fna.fbcdn.net/v/t39.30808-6/240992857_2161784560638948_1408458206096410975_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=HWF5K0AvdUoAX-YRyHS&_nc_oc=AQmMy57URIJYAy5n2SRv4J6_oz4gCL1X-dNVZ5VmiNzFYpJkJzLnd__7VLjMD7o70Ts&_nc_ht=scontent.fsof9-1.fna&oh=00_AT-B8AaDNqkrUhsY83G2zRaAdlMCD7Ff7INMSo4uBNYR_A&oe=62963ABD");
