// Note: This code was provided by the course instructor

require('dotenv').config();
const mysql = require("mysql2");

const connection = mysql.createConnection(
    {
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASS,
        database: "employees"
    },
    console.log(`Connected to the employees database.`)
);

connection.connect(function (err) {
    if (err) throw err;
});

module.exports = connection;