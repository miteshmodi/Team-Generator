const Employee = require("./Employee");

class Manager extends Employee {
    constructor(name = null, id = null, email = null, officeNumber = null) {
        super(name, id, email);
        this.officeNumber = officeNumber;
    }

    getRole() {
        return "Manager";
    }

    getOfficeNumber() {
        return this.officeNumber;
    }
}

module.exports = Manager;