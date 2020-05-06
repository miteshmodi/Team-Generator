const Employee = require("./Employee");

class Intern extends Employee {
    constructor(name = null, id = null, email = null, school = null) {
        super(name, id, email);
        this.school = school;
    }

    getRole() {
        return "Intern";
    }

    getSchool() {
        return this.school;
    }
}

module.exports = Intern;