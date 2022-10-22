// Note: This code was provided by the course instructor

const connection = require("./connection");

class DB {
    // Keeping a reference to the connection on the class in case we need it later
    constructor(connection) {
    this.connection = connection;
    }

    // Helper function that returns all employees along with
    findAllEmployees() {
        return this.connection.promise().query(
        `SELECT e.id, e.first_name, e.last_name, title AS "role", dep.name as "department",
        salary, CONCAT_WS(" ", m.first_name, m.last_name) AS manager
        FROM employees.employee e
        LEFT JOIN employees.employee m ON e.manager_id = m.id
        INNER JOIN employees.role rl ON rl.id = e.role_id
        INNER JOIN employees.department dep ON dep.id = rl.department_id;`
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
            // console.log(`holder in listAllEmployeeFullNames is ${holder}`);
            return holder;
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
            ("${givenName}", "${familyName}", ${employeeRole}, ${manager})`
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
        return this.connection.promise().query(
        `INSERT INTO employees.department (name)
        VALUES
            ("${name}")`
        );
    }

    // Helper function that returns all department names
    listAllDepartments() {
        return this.connection.promise().query(
        "SELECT name FROM employees.department",
        function(err, results) {
            let objArray = Object.values(results);
            let holder = [];
            objArray.forEach((elem) => {holder.push(elem.name)});
            return holder;
        }
        );
    }

    // Helper function that returns a department's id number
    departmentIdFromName(name) {
        return this.connection.promise().query(
        `SELECT id FROM employees.department WHERE name="${name}";`
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

    // Helper function that adds a new role
    addRole(title, salary, department_id) {
        return this.connection.promise().query(
        `INSERT INTO employees.role (title, salary, department_id)
        VALUES
            ("${title}", ${salary}, ${department_id})`
        );
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