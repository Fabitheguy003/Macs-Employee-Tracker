CREATE DATABASE tracker_db;

USE tracker_db;

CREATE TABLE departments (
  id INT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
  id INT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  department_id INT NOT NULL,
  FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE
);

CREATE TABLE employees (
  id INT PRIMARY KEY,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  role_id INT,
  manager_id INT,
  UNIQUE (first_name, last_name, role_id, manager_id)
);
