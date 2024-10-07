// Single Responsibility Principle

// BAD CODE EXAMPLE:
// A class that handles both user data and sending emails

class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }

    getUserDetails() {
        return `User: ${this.name}, Email: ${this.email}`;
    }

    sendWelcomeEmail() {
        console.log(`Sending welcome email to ${this.email}`);
    }
}



// GOOD CODE EXAMPLE:
// Separate class for separate work

class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }

    getUserDetails() {
        return `User: ${this.name}, Email: ${this.email}`;
    }
}

class EmailService {
    sendWelcomeEmail(user) {
        console.log(`Sending welcome email to ${user.email}`);
    }
}

const user = new User("John", "john@example.com");
const emailService = new EmailService();
emailService.sendWelcomeEmail(user);