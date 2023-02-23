const inquirer = require('inquirer');
const mysql = require('mysql2');

// create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '@Amani2015', // enter your MySQL password here
  database: 'tracker_db' // enter your database name here
});

// connect to the database
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database!');
  displayMenu();
});

// function to start the application
function start() {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'mainMenu',
      message: 'What would you like to do?',
      choices: [
        'View All Departments',
        'View All Roles',
        'View All Employees',
        'Add a Department',
        'Add a Role',
        'Add an Employee',
        'Update an Employee Role',
        'Delete a Department',
        'Delete a Role',
        'Delete an Employee',
        'Exit Application',
      ]
    }
  ]).then(menuResponse => {
    switch (menuResponse.mainMenu) {
      case 'View All Departments':
        viewDepartments();
        break;
      case 'View All Roles':
        viewRoles();
        break;
      case 'View All Employees':
        viewEmployees();
        break;
      case 'Add a Department':
        addDepartment();
        break;
      case 'Add a Role':
        addRole();
        break;
      case 'Add an Employee':
        addEmployee();
        break;
      case 'Update an Employee Role':
        updateEmployee();
        break;
      case 'Delete a Department':
        deleteDepartment();
        break;
      case 'Delete a Role':
        deleteRole();
        break;
        case 'Delete an Employee':
          deleteEmployee();
          break;
      case 'Exit Application':
        console.log('Goodbye!');
        displayMenu();
        break;
      default:
        process.exit();
    }
  });
};

// function to display the main menu
function displayMenu() {
  console.log('');
  // console.log('*****************************************');
  console.log('Welcome to the Employee Management System');
  // console.log('*****************************************');
  console.log('');
  start();
}

// function to view all departments
function viewDepartments() {
  db.query('SELECT * FROM departments', (err, results) => {
    if (err) throw err;
    console.table(results);
    displayMenu();
  });
}

// function to view all roles
function viewRoles() {
  db.query('SELECT * FROM roles', (err, results) => {
    if (err) throw err;
    console.table(results);
    displayMenu();
  });
}

// function to view all employees
function viewEmployees() {
  db.query('SELECT * FROM employees', (err, results) => {
    if (err) throw err;
    console.table(results);
    displayMenu();
  });
}

function addDepartment() {
  return inquirer.prompt({
    type: 'input',
    name: 'name',
    message: 'What is the name of the new department?',
    validate: input => {
      if (input) {
        return true;
      } else {
        return 'Please enter a department name.';
      }
    }
  }).then(answer => {
    db.query('INSERT INTO departments SET ?', { name: answer.name }, (err, result) => {
      if (err) throw err;
      console.log(`Successfully added ${answer.name} department!`);
      displayMenu();
    });
  });
}


// function to add new roles
function addRole() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter role title:'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter role salary:'
    },
    {
      type: 'input',
      name: 'department_id',
      message: 'Enter department id:'
    }
  ]).then((response) => {
    const { title, salary, department_id } = response;
    db.query(
      `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`,
      [title, salary, department_id],
      (err) => {
        if (err) throw err;
        console.log('Role added successfully!');
        displayMenu();
      }
    );
  });
}


