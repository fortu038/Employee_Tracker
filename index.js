// Note: Parts of this code were provided by the course instructor

const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
require("console.table");

// This file leads to a class we've created to contain all our database queries
const db = require("./db");

// Use this function to display the ascii art logo and to begin the main prompts
function init() {
  console.log(
    logo({
      name: "Employee Tracker",
      font: 'Soft',
      lineChars: 10,
      padding: 2,
      margin: 3,
      borderColor: 'grey',
      logoColor: 'grey',
      textColor: 'grey',
    })
    .emptyLine()
    .right('version 1.0.0')
    .render()
  );

  loadMainPrompts();
}


// Here we load the initial prompts with a series of options. The first option is provided for you.
function loadMainPrompts() {
  prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        {
          name: "View all employees",
          value: "VIEW_EMPLOYEES"
        },
        {
          name: "Add an employee",
          value: "ADD_EMPLOYEE"
        },
        {
          name: "Update an employee's role",
          value: "UPDATE_EMPLOYEE_ROLE"
        },
        {
          name: "View all departments",
          value: "VIEW_DEPARTMENTS"
        },
        {
          name: "Add a department",
          value: "ADD_DEPARTMENT"
        },
        {
          name: "View all roles",
          value: "VIEW_ROLES"
        },
        {
          name: "Add a role",
          value: "ADD_ROLE"
        },
        {
          name: "Quit",
          value: "QUIT"
        }

        // add more options here
      ]
    }
  ]).then(res => {
    let choice = res.choice;
    // Call the appropriate function depending on what the user chose
    
    switch (choice) {
      case "VIEW_EMPLOYEES":
        viewEmployees();
        break;
      case "ADD_EMPLOYEE":
        // let holder = db.listAllRoleTitles();
        // console.log(holder);
        // db.listAllEmployeeFullNames();
        // db.listAllRoleTitles();
        addEmployee();
        break;
      case "UPDATE_EMPLOYEE_ROLE":
        updateEmployeeRole();
        break;
      case "VIEW_DEPARTMENTS":
        viewDepartments();
        break;
      case "ADD_DEPARTMENT":
        addDepartment();
        break;
      case "VIEW_ROLES":
        viewRoles();
        break;
      case "ADD_ROLE":
        addRole();
        break;
      case "QUIT":
        console.log("Quitting program, have a nice day.");
        process.exit(0);
      default:
        console.log(">>>Error: Invalid action choice received. Quitting program.");
        process.exit(0);
    }
  }
)}


/* ======= Controllers ============================================================ */

// Here is a function which handles the first prompt option:  View all employees
function viewEmployees() {
  // Here we call the method in the db file for finding all employees.
  // we get the result back, and then display the result 
  db.findAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      console.log("\n");
      console.table(employees);
    })
    .then(() => loadMainPrompts());
}

function addEmployee() {
  // console.log(`db.listAllRoleTitles is ${db.listAllRoleTitles()}`);
  db.listAllRoleTitles()
    .then((roles) => {
      prompt([
        {
          type: "input",
          name: "givenName",
          message: "What is the employee's given name (limit of 30 characters)?",
        },
        {
          type: "input",
          name: "familyName",
          message: "What is the employee's family name (limit of 30 characters)?",
        },
        {
          type: "list",
          name: "employeeRole",
          message: "What is the employee's role?",
          choices: roles,
        },
        {
          type: "input",
          name: "manager",
          message: "Who is this employee's manager? Leave blank if the employee has no manager",
        },
      ])
        .then((resp) => {
          // db.addEmployee(resp.givenName, resp.familyName, resp.employeeRole, resp.manager);
          console.log(resp);
        })
        .then(() => loadMainPrompts());
    });
};

function updateEmployeeRole() {
  db.listAllRoleTitles()
    .then ((roles) => {
      db.listAllEmployeeFullNames()
        .then ((fullNames) => {
          prompt([
            {
              type: "list",
              name: "employeeFullName",
              message: "Which employee's role do you want to change?",
              choices: fullNames
            },
            {
              type: "list",
              name: "newRole",
              message: "What role do you wish to assign to the employee?",
              choices: roles
            }
          ])
            .then((resp) => {
              // db.updateEmployeeRole(resp.employeeFullName, resp.newROle)
              console.log(resp);
            })
            .then(() => loadMainPrompts());
        });
    });
};

function viewDepartments() {
  db.findAllDepartments()
    .then(([rows]) => {
      let departments = rows;
      console.log("\n");
      console.table(departments);
    })
    .then(() => loadMainPrompts());
}

function addDepartment() {
  prompt([
    {
      type: "input",
      name: "name",
      message: "What is the name of the department?"
    }
  ])
    .then((resp) => {
      db.addDepartment(resp.name)
        .then(() => loadMainPrompts());
    })
};

function viewRoles() {
  db.findAllRoles()
    .then(([rows]) => {
      let roles = rows;
      console.log("\n");
      console.table(roles);
    })
    .then(() => loadMainPrompts());
};

function addRole() {
  db.listAllDepartments()
    .then((depArray) => {
      console.log(`depArray is ${depArray}`);
      prompt([
        {
          type: "input",
          name: "name",
          message: "What is the name of the role?"
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary of the role (Please in USD)?"
        },
        {
          type: "input",
          name: "department",
          message: "What department is this role in?",
          choices: depArray
        }
      ])
      .then((resp) => {
        db.departmentIdFromName(resp.department)
          .then((id) => {
            db.addRole(resp.name, resp.salary, id)
              .then(() => loadMainPrompts());
          });
      });
    });
};

/* ======= END Controllers ============================================================ */


/* 
  You will write lots of other functions here for the other prompt options.
  Note that some prompts will require you to provide more prompts, and these 
  may need functions of their own.
*/


// Everything starts here!
init();