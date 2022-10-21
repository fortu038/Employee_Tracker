// Note: This code was provided by the course instructor

const connection = require("./connection");

class DB {
    // Keeping a reference to the connection on the class in case we need it later
    constructor(connection) {
    this.connection = connection;   // here we reach out to the db so we can do a query
    }

    // Helper function that returns all employees
    // THIS IS NOT THE FINAL QUERY. YOU WILL NEED TO MODIFY THIS QUERY SO THAT YOU JOIN 
    // THE EMPLOYEES WITH THEIR ROLES, SALARIES, DEPARTMENTS, AND MANAGERS
    // HINT: A TABLE CAN BE JOINED ON ITSELF WITH PROPER TABLE ALIASING
    findAllEmployees() {
        return this.connection.promise().query(
        "SELECT * FROM employees.employee;"
        );
    }

    // Helper function that returns all employees full names, with given name being listed first and
    // family name being listed last.
    listAllEmployeeFullNames() {
        return this.connection.promise().query(
        `SELECT CONCAT_WS(" ", first_name, last_name) AS whole_name FROM employees.employee;`
        );
    }

    // Helper function that adds an employee
    addEmployee(givenName, familyName, employeeRole, manager) {
        this.connection.promise.query(
        `INSERT INTO emplyees.employee (first_name, last_name, role_id, manager_id)
        VALUES
            (${givenName}, ${familyName}, ${employeeRole}, ${manager})`
        );
    }

    // Helepr function that updates an employee's role
    updateEmployeeRole(employeeName, newRole) {

    }

    // Helper function that returns all departments
    findAllDepartments() {
        return this.connection.promise().query(
        "SELECT * FROM employees.department;"
        );
    }

    // Helper function that adds a department
    addDepartment(name) {
        this.connection.promise().query(
        `INSERT INTO employees.department (name)
        VALUES
            (${name})`
        );
    }

    // Helepr function that returns all department names
    listAllDepartments() {
        return this.connection.promise().query(
        "SELECT name FROM employees.department"
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

    addRole(title, salary, department) {

    }

    // Helper function that returns all role titles
    listAllRoleTitles() {
        return this.connection.promise().query(
        "SELECT title FROM employees.role;"
        );
    }
}




module.exports = new DB(connection);