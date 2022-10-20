require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// const db = mysql.createConnection(
//     {
//         host: process.env.HOST,
//         user: process.env.USER,
//         password: process.env.PASS,
//         database: 'employees'
//     },
//     console.log(`Connected to the employees database.`)
// );

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
});