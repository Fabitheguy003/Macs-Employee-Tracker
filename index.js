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


// function to add new employees
function addEmployee() {
  inquirer.prompt([
    {
      name: 'firstName',
      message: "Enter the employee's first name:",
      validate: input => input.trim() !== ''
    },
    {
      name: 'lastName',
      message: "Enter the employee's last name:",
      validate: input => input.trim() !== ''
    },
    {
      name: 'roleId',
      message: "Enter the employee's role ID:",
      validate: input => Number.isInteger(Number(input))
    },
    {
      name: 'managerId',
      message: "Enter the employee's manager ID:",
      validate: input => Number.isInteger(Number(input))
    }
  ]).then(answer => {
    db.query('INSERT INTO employees SET ?', {
      first_name: answer.firstName,
      last_name: answer.lastName,
      role_id: answer.roleId,
      manager_id: answer.managerId
    }, (err) => {
      if (err) throw err;
      console.log(`\nSuccessfully added ${answer.firstName} ${answer.lastName} to the database.\n`);
      displayMenu();
    });
  });
}

// function to update rmployees
function updateEmployee() {
  let employees = [];
  let roles = [];

  // get all employees
  db.query('SELECT * FROM employees', (err, results) => {
    if (err) throw err;
    employees = results;

    // get all roles
    db.query('SELECT * FROM roles', (err, results) => {
      if (err) throw err;
      roles = results;

      inquirer.prompt([
        {
          type: 'list',
          name: 'employeeId',
          message: 'Which employee would you like to update?',
          choices: employees.map((employee) => {
            return {
              name: `${employee.first_name} ${employee.last_name}`,
              value: employee.id
            };
          })
        },
        {
          type: 'list',
          name: 'roleId',
          message: 'What is the employee\'s new role?',
          choices: roles.map((role) => {
            return {
              name: role.title,
              value: role.id
            };
          })
        }
      ]).then((answers) => {
        // update the employee's role in the database
        db.query(
          'UPDATE employees SET role_id = ? WHERE id = ?',
          [answers.roleId, answers.employeeId],
          (err) => {
            if (err) throw err;
            console.log('Employee role updated successfully!');
            displayMenu();
          }
        );
      });
    });
  });
}

// function to delete departments
function deleteDepartment() {
  db.query('SELECT * FROM departments', (err, results) => {
  if (err) throw err;

  const departmentChoices = results.map(({ id, name }) => ({
    value: id,
    name: name
  }));
  
  inquirer.prompt([
    {
      type: 'list',
      name: 'department',
      message: 'Which department would you like to delete?',
      choices: departmentChoices
    }
  ]).then(answer => {
    const { department } = answer;
    db.query('DELETE FROM departments WHERE id = ?', department, (err) => {
      if (err) throw err;
      console.log(`Successfully deleted department with ID ${department}!`);
      displayMenu();
    });
  });
  });
  }

// function to delete roles
function deleteRole() {
  // prompt the user to choose a role to delete
  inquirer.prompt([
    {
      name: 'role',
      type: 'input',
      message: 'Enter the title of the role you want to delete:'
    }
  ]).then((answers) => {
    // execute a DELETE query to remove the role from the database
    db.query(
      'DELETE FROM roles WHERE title = ?',
      [answers.role],
      (err) => {
        if (err) throw err;
        console.log(' role deleted!\n');
      }
    );
  });
}

// function to delete employees
function deleteEmployee() {
  // get all employees
  db.query('SELECT * FROM employees', (err, results) => {
    if (err) throw err;

    // prompt user to select an employee to delete
    inquirer.prompt([
      {
        type: 'list',
        name: 'employee',
        message: 'Select an employee to delete:',
        choices: results.map((employee) => {
          return {
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id,
          };
        }),
      },
    ]).then((answer) => {
      // execute SQL DELETE statement to remove employee from database
      db.query('DELETE FROM employees WHERE id = ?', [answer.employee], (err) => {
        if (err) throw err;
        console.log('Employee deleted successfully!');
        displayMenu();
      });
    });
  });
}
