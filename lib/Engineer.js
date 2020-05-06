const Employee = require("./Employee");

class Engineer extends Employee {
    constructor(name = null, id = null, email = null, gitHubUrl = null) {
        super(name, id, email);
        this.github = gitHubUrl;
    }

    getRole() {
        return "Engineer";
    }

    getGithub(){
        return this.github;
    }
}


module.exports = Engineer;
