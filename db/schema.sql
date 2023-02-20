DROP DATABASE IF EXISTS management_db;
CREATE DATABASE management_db;

USE management_db;

-- Create departments table
CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

-- Create roles table
CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  salary DECIMAL(10, 2) NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_department_id
    FOREIGN KEY (department_id)
    REFERENCES departments(id)
    ON DELETE CASCADE
);

-- Create employees table
CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT,
  PRIMARY KEY (id),
  CONSTRAINT fk_role_id
    FOREIGN KEY (role_id)
    REFERENCES roles(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_manager_id
    FOREIGN KEY (manager_id)
    REFERENCES employees(id)
    ON DELETE SET NULL
);


