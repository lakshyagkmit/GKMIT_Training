// 4.

class UserManager {
    createUser(username) {
        console.log(`User ${username} created.`);
    }

    deleteUser(userId) {
        console.log(`User ${userId} deleted.`);
    }

    resetPassword(userId) {
        console.log(`Password for user ${userId} reset.`);
    }

    sendEmail(userId, message) {
        console.log(`Sending email to user ${userId}: ${message}`);
    }
}

// Usage
const userManager = new UserManager();
userManager.createUser("john_doe");
userManager.sendEmail(1, "Welcome!");

// SOLID Principle Violated

/* Single Responsibility Principle : The UserManager class handles multiple responsibilities */

// We will refactor this code using dicussed pattern.

class UserManager {
    createUser(username) {
        console.log(`User ${username} created.`);
    }

    deleteUser(userId) {
        console.log(`User ${userId} deleted.`);
    }
}

class PasswordService {
    resetPassword(userId) {
        console.log(`Password for user ${userId} reset.`);
    }
}

class EmailService {
    sendEmail(userId, message) {
        console.log(`Sending email to user ${userId}: ${message}`);
    }
}

const userManager = new UserManager();
const emailService = new EmailService();
const passwordService = new PasswordService();

userManager.createUser("john_doe");
emailService.sendEmail(1, "Welcome!");
passwordService.resetPassword(1);