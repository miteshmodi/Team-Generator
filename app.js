const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let team = [];

const generateTeam = async function () {
    // Ask for number of employees
    let numberOfEmployees = await inquirer.prompt([
        {
            type: "number",
            name: "NumberOfEmployees",
            message: "How many employees are in your team?"
        }
    ]).then(async function (data) {
        for (let employee = 1; employee <= data.NumberOfEmployees; employee++) {
            await inquirer.prompt([
                {
                    type: "input",
                    name: "employeeName",
                    message: "What is the employee's name?"
                },
                {
                    type: "number",
                    name: "employeeId",
                    message: "What is the employee's ID?"
                },
                {
                    type: "input",
                    name: "employeeEmail",
                    message: "What is the employee's email?"
                },
                {
                    type: "list",
                    name: "employeeType",
                    message: "What is the job title of employee?",
                    choices: ["Manager", "Engineer", "Intern"]
                }
            ]).then(async function (response) {
                await EmployeeType(response.employeeType, response.employeeName, response.employeeId, response.employeeEmail);
            });
        }
    });

    console.log(team);
    // Write code to use inquirer to gather information about the development team members,
    // and to create objects for each team member (using the correct classes as blueprints!)

};

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

generateTeam();

async function EmployeeType(role, name, id, email) {
    switch (role) {
        case "Engineer":
            let gitHub = await inquirer.prompt([
                {
                    type: "input",
                    name: "gitHubUrl",
                    message: "What's the engineer's GitHub URL?"
                }
            ]).then(async function (data){
                await team.push(createEngineer(name, id, email, data.gitHubUrl));
            });
            
            break;
        case "Manager":
            let office = await inquirer.prompt([
                {
                    type: "input",
                    name: "officeNumber",
                    message: "What's the manager's office number?"
                }
            ]).then(async function (data){
                await team.push(createManager(name, id, email, data.officeNumber));
            });
            
            break;
        case "Intern":
            let school = await inquirer.prompt([
                {
                    type: "input",
                    name: "schoolName",
                    message: "What's the intern's school?"
                }
            ]).then(async function (data){
                await team.push(createIntern(name, id, email, data.schoolName));
            });
            break;
    }
}


function createManager(name = null, id = null, email = null, officeNumber = null) {
    return new Manager(name, id, email, officeNumber);
}

function createEngineer(name = null, id = null, email = null, github = null) {
    return new Engineer(name, id, email, github);
}

function createIntern(name = null, id = null, email = null, school = null) {
    return new Intern(name, id, email, school);
}
