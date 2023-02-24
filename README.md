# Macs-Employee-Tracker


# SQL Challenge: Employee Tracker

To manage a business, this terminal application allows the user to view and manage employees, roles, and departments of the company.


## 🚀 Description

With this applicaion, user can:
- view all departments, all roles, all employees, add a department, a role, an employee, and update an employee role
- Displaying the names and IDs of departments
- view all roles' job title, role id, the department that role belongs to, and the salary for that role
- Employee data can be viewed in a formatted table, including employee ID numbers, first names and last names, job titles, departments, salaries, and supervisors.
- view department infomation
- remove a role, an employee or a department

## 📺 Demo


[Click here for walk through video](https://user-images.githubusercontent.com/112605297/218927199-f4fce049-907c-447e-aa58-7154347dbe35.mov)
## 🛠 Technologies 


**Dependencies:** 

    "console.table": "^0.10.0",
    "inquirer": "^8.2.4",
    "mysql": "^2.18.1",
    "mysql2": "^3.1.2"

## 💾 Installation


With the package.json file, use jest to excute the tests in the terminal by the following command:
```
npm i
```

Or install all the following dependencices:
```
npm instal console.table

npm install inquirer

npm install mysql2

npm install express
```
For npm scripts:
```
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node index.js"
  }
```
## Usage

To excute MySQL shell in the terminal by the following command:
```
mysql -u root
```
or if you have a password for database try:
```
mysql -u root -p
```
then source the schema file:
```
SOURCE db/schema.sql;
```
To seed the database:
```
SOURCE db/seeds.sql;
```
To run the application:
```
node index.js
```


## Badges

Add badges from somewhere like: [shields.io](https://shields.io/)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

