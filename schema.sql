CREATE DATABASE IF NOT EXISTS vault;

USE vault;

DROP TABLE IF EXISTS recipes;
DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
  id INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY(id),
  name VARCHAR(900)
);

CREATE TABLE IF NOT EXISTS recipes (
  id INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY(id),
  recipe_url VARCHAR(900),
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < schema.sql
 *  to create the database and the tables.*/

