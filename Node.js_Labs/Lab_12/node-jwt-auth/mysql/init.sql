CREATE DATABASE IF NOT EXISTS your_database;
USE your_database;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Sample user with hashed password (you can update this to generate hashed password before insertion)
INSERT INTO users (username, password) VALUES ('user1', '$2a$10$A9UBtTnUvQznU8lV7d/7A.O8u9FZqIoExGyHLFy9MX5p.yVSlW6yS');
