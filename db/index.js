// Note: This code was provided by the course instructor

const connection = require("./connection");

class DB {
    // Keeping a reference to the connection on the class in case we need it later
    constructor(connection) {
    this.connection = connection;   // here we reach out to the db so we can do a query
    }

    // Find all employees
    // THIS IS NOT THE FINAL QUERY. YOU WILL NEED TO MODIFY THIS QUERY SO THAT YOU JOIN 
    // THE EMPLOYEES WITH THEIR ROLES, SALARIES, DEPARTMENTS, AND MANAGERS
    // HINT: A TABLE CAN BE JOINED ON ITSELF WITH PROPER TABLE ALIASING
  
    findAllEmployees() {
        return this.connection.promise().query(
        "SELECT * FROM employees.employee;"
        );
    }

    // Helper function that returns all departments
    findAllDepartments() {
        return this.connection.promise().query(
        "SELECT * FROM employees.department;"
        );
    }

    // Helper function that returns all roles
    findAllRoles() {
        return this.connection.promise().query(
        `SELECT rl.id, rl.title AS "role title", rl.salary, dep.name AS "department"
        FROM employees.role rl
        INNER JOIN employees.department dep ON rl.department_id = dep.id;`
        );
    }

    // Helper function that returns all role titles
    findAllRoleTitles() {
        return this.connection.promise().query(
        "SELECT title FROM employees.role;"
        );
    }






  




  
}




module.exports = new DB(connection);