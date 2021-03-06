const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

const employeeQuestions = [
    {
        type: "list",
        choices: [
            "Engineer",
            "Intern",
            "Manager"
        ],
        name: "employeeType",
        message: "Which kind of employee are you?"
    },
    {
        type: "input",
        name: "name",
        message: "What is your name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is your id number?"
    },
    {
        type: "input",
        name: "email",
        message: "What is your email?"
    }
];

const employeeArray = [];
let employeeHTML = "";
function askUser(){
    inquirer.prompt(employeeQuestions).then(function (response) {
        if (response.employeeType === "Engineer") {
            inquirer.prompt([{
                type: "input",
                name: "github",
                message: "What is your GitHub username?"
            }]).then(function (response2) {
                const engineer = new Engineer(response.name, response.id, response.email, response2.github);
                employeeArray.push(engineer);
                inquirer.prompt([{
                    type: "confirm",
                    name: "continue",
                    message: "Would you like to add another employee?"
                }]).then(function(response3){
                    if(response3.continue){
                        askUser();
                    }
                    else{
                        employeeHTML = render(employeeArray);
                        if (!fs.existsSync(OUTPUT_DIR)){
                            fs.mkdirSync(OUTPUT_DIR);
                            fs.writeFile(outputPath, employeeHTML, function(err){
                                if(err){
                                    console.log(err);
                                }
                                else{
                                    console.log("Success, created directory and wrote to file!");
                                }
                            });
                        }
                        else{
                            fs.writeFile(outputPath, employeeHTML, function(err){
                                if(err){
                                    console.log(err);
                                }
                                else{
                                    console.log("Success!");
                                }
                            });
                        }
                    }
                });
            });
        }
        else if (response.employeeType === "Intern") {
            inquirer.prompt([{
                type: "input",
                name: "school",
                message: "What school do you attend?"
            }]).then(function (response2) {
                const intern = new Intern(response.name, response.id, response.email, response2.school);
                employeeArray.push(intern);
                inquirer.prompt([{
                    type: "confirm",
                    name: "continue",
                    message: "Would you like to add another employee?"
                }]).then(function(response3){
                    if(response3.continue){
                        askUser();
                    }
                    else{
                        employeeHTML = render(employeeArray);
                        if (!fs.existsSync(OUTPUT_DIR)){
                            fs.mkdirSync(OUTPUT_DIR);
                            fs.writeFile(outputPath, employeeHTML, function(err){
                                if(err){
                                    console.log(err);
                                }
                                else{
                                    console.log("Success, created directory and wrote to file!");
                                }
                            });
                        }
                        else{
                            fs.writeFile(outputPath, employeeHTML, function(err){
                                if(err){
                                    console.log(err);
                                }
                                else{
                                    console.log("Success!");
                                }
                            });
                        }
                    }
                });
            });
        }
        else if (response.employeeType === "Manager") {
            inquirer.prompt([{
                type: "input",
                name: "officeNumber",
                message: "What is your office number?"
            }]).then(function (response2) {
                const manager = new Manager(response.name, response.id, response.email, response2.officeNumber);
                employeeArray.push(manager);
                inquirer.prompt([{
                    type: "confirm",
                    name: "continue",
                    message: "Would you like to add another employee?"
                }]).then(function(response3){
                    if(response3.continue){
                        askUser();
                    }
                    else{
                        employeeHTML = render(employeeArray);
                        if (!fs.existsSync(OUTPUT_DIR)){
                            fs.mkdirSync(OUTPUT_DIR);
                            fs.writeFile(outputPath, employeeHTML, function(err){
                                if(err){
                                    console.log(err);
                                }
                                else{
                                    console.log("Success, created directory and wrote to file!");
                                }
                            });
                        }
                        else{
                            fs.writeFile(outputPath, employeeHTML, function(err){
                                if(err){
                                    console.log(err);
                                }
                                else{
                                    console.log("Success!");
                                }
                            });
                        }
                    }
                });
            });
        }
    });
}

askUser();