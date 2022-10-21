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
        this.connection.query(
        `SELECT CONCAT_WS(" ", first_name, last_name) AS whole_name FROM employees.employee;`,
        function(err, results) {
            let objArray = Object.values(results);
            let holder = [];
            objArray.forEach((elem) => {holder.push(elem.whole_name)});
            console.log(`holder in listAllEmployeeFullNames is ${holder}`);
            return structuredClone(holder); // Once again, JS pointers force me to deep copy
        }
        );
    }

    // Helper function that adds an employee
    addEmployee(givenName, familyName, employeeRole, manager) {
        if(manager == "" || manager == " ") {
            manager = null;
        }
        if(employeeRole == undefined) {
            employeeRole = "Error"
        }
        this.connection.query(
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
        this.connection.query(
        `INSERT INTO employees.department (name)
        VALUES
            (${name})`
        );
    }

    // Helepr function that returns all department names
    listAllDepartments() {
        this.connection.query(
        "SELECT name FROM employees.department",
        function(err, results) {
            let objArray = Object.values(results);
            let holder = [];
            objArray.forEach((elem) => {holder.push(elem.name)});
            return holder;
        }
        );
    }

    // Helper function that returns all roles
    findAllRoles() {
        return this.connection.promise().query(
        `SELECT rl.id, rl.title AS "role_title", rl.salary, dep.name AS "department"
        FROM employees.role rl
        INNER JOIN employees.department dep ON rl.department_id = dep.id;`
        );
    }

    addRole(title, salary, department) {

    }

    // Helper function that returns all role titles
    listAllRoleTitles() {
        this.connection.query(
        "SELECT title FROM employees.role;",
        function(err, results) {
            let objArray = Object.values(results);
            let holder = [];
            objArray.forEach((elem) => {holder.push(elem.title)});
            console.log(`${holder}`)
            return holder;
        }
        );
    }
}

module.exports = new DB(connection);