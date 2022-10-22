# Employee_Tracker

## Description

The goal of this project was to build a Javascript program that manipulate data taken from a SQL database in order to get practice performing such operations. The created program acts as a employee and workplace database building tool. During this assigment I learned how to manipulate a MySQL database using JavaScript and practiced using promises.

## Installation

The modules Inquirer (version 8.2.4), Express, Dotenv, Console.Table, Asciiart-Logo, and MySQL2 must be installed using npm and the runtime Node.js must be installed. A SQL dialect and workbench must be also be installed, and it is recommended that MySQL be used as this was the version testing was performed with.

## Usage

This program acts as a workplace and employee database building tool. To run the program the user must open the terminal and type "node index.js". After doing so the user will see "Employee Tracker version 1.0.0" in large ascii art followed by a prompt to select an action to perfrom. "View all empoyees" will display, in columns, each employee's ID number, given name, family name, role, department, salary in USD, and manager, if the employee is not themselves a manager. "Add an employee" is supposed to allow the user to enter a new employee by entering a given name, family name, role, and manager, if one is needed. "Update an employee's role" is supposed to allow the user to select an employee by thier full name a then select a new role for that employee. "View all departments" will display, in columns, each department's ID number and name. "Add department" allows the user to enter a new department. "View all roles" will display, in columns, each role's ID number, role title, salary in USD, and deaprtment. "Add role" is supposed to allow the user to enter a new role by entering in the role's name, its salary, and selecting its department. "Quit" will cause the program to stop running.

It should be noted all of the adding and update functions except "Add deparment" are bugged and are currently not functioning.

## Credits

N/A

## License

Please refer to the license in the repo

## Links and Images
Github Repo URL: https://github.com/fortu038/Employee_Tracker