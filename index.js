const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
require("console.table");

// This file leads to a class we've created to contain all our database queries
const db = require("./db");

// Use this function to display the ascii art logo and to begin the main prompts
function init() {

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
          name: "Add an employees",
          value: "ADD_EMPLOYEE"
        },
        {
          name: "Update an employee's role",
          value: "UPDATE_EMPLOYEE"
        },
        {
          name: "Add a department",
          value: "ADD_DEPARTMENT"
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
        addEmployee();
        break;
      case "UPDATE_EMPLOYEE":
        updateEmployee();
        break;
      case "ADD_DEPARTMENT":
        addDepartment();
        break;
      case "ADD_ROLE":
        addRole();
        break;
      case "QUIT":
        break;
      default:
        console.log(">>>Something else");
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
  console.log(">>>Adding employees");
}

function updateEmployee() {
  console.log(">>>Updated employees");
}

function addDepartment() {
  console.log(">>>Added department");
}

function addRole() {
  console.log(">>>Added a role");
}

/* ======= END Controllers ============================================================ */


/* 
  You will write lots of other functions here for the other prompt options.
  Note that some prompts will require you to provide more prompts, and these 
  may need functions of their own.
*/


// Everything starts here!
init();