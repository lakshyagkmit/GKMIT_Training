// 1.

class NotificationService {
    sendEmail(email, message) {
        // Sending email logic
        console.log(`Sending email to ${email}: ${message}`);
    }

    sendSMS(phoneNumber, message) {
        // Sending SMS logic
        console.log(`Sending SMS to ${phoneNumber}: ${message}`);
    }

    logNotification(message) {
        // Logging logic
        console.log(`Logging notification: ${message}`);
    }

    notify(method, recipient, message) {
        if (method === "email") {
            this.sendEmail(recipient, message);
            this.logNotification(`Email sent to ${recipient}`);
        } else if (method === "sms") {
            this.sendSMS(recipient, message);
            this.logNotification(`SMS sent to ${recipient}`);
        } else {
            throw new Error("Unsupported notification method");
        }
    }
}

// Usage
const service = new NotificationService();
service.notify("email", "user@example.com", "Hello via Email!");

// SOLID Principles Violated

/* ----  Single Responsibility Principle : The NotificationService class is responsible for sending emails, sending SMS, and logging notifications. This violates SRP, as each responsibility should belong to a separate class.
Open/Closed Principle : The notify method uses if-else conditions to handle different notification types (email, SMS). This violates OCP because the class must be modified if a new notification method is added.
Dependency Inversion Principle : The NotificationService class directly depends on the concrete methods (sendEmail, sendSMS), which violates DIP. Instead, it should depend on abstractions. -----*/

// Design Pattern applied code

/* We will be using Factory Pattern and Command Pattern to refactor this code. The Factory Pattern will help create different notification types, and the Command Pattern can abstract the notify behavior to execute commands for each type of notification. */


class NotificationCommand {
    execute(recipient, message) {
        console.log("Nothing Implemented");
    }
}

class EmailNotificationCommand extends NotificationCommand {
    constructor(emailService, logger) {
        super();
        this.emailService = emailService;
        this.logger = logger;
    }

    execute(recipient, message) {
        this.emailService.sendEmail(recipient, message);
        this.logger.log(`Email sent to ${recipient}`);
    }
}

class SMSNotificationCommand extends NotificationCommand {
    constructor(smsService, logger) {
        super();
        this.smsService = smsService;
        this.logger = logger;
    }

    execute(recipient, message) {
        this.smsService.sendSMS(recipient, message);
        this.logger.log(`SMS sent to ${recipient}`);
    }
}

class EmailService {
    sendEmail(email, message) {
        console.log(`Sending email to ${email}: ${message}`);
    }
}

class SMSService {
    sendSMS(phoneNumber, message) {
        console.log(`Sending SMS to ${phoneNumber}: ${message}`);
    }
}

class LogNotification {
    log(message) {
        console.log(`Logging Notification: ${message}`);
    }
}

class NotificationFactory {
    constructor(emailService, smsService, logNotification) {
        this.emailService = emailService;
        this.smsService = smsService;
        this.logNotification = logNotification;
    }

    createNotification(method) {
        if (method === "email") {
            return new EmailNotificationCommand(this.emailService, this.logNotification);
        } else if (method === "sms") {
            return new SMSNotificationCommand(this.smsService, this.logNotification);
        } else {
            throw new Error("Unsupported notification method");
        }
    }
}

class NotificationService {
    constructor(notificationFactory) {
        this.notificationFactory = notificationFactory;
    }

    notify(method, recipient, message) {
        const notificationCommand = this.notificationFactory.createNotification(method);
        notificationCommand.execute(recipient, message);
    }
}


const emailService = new EmailService();
const smsService = new SMSService();
const logNotification = new LogNotification();


const notificationFactory = new NotificationFactory(emailService, smsService, logNotification);


const service = new NotificationService(notificationFactory);


service.notify("email", "lakshya@gkmit.co", "Hello via Email!"); 


service.notify("sms", "7890122435", "Hello via SMS!"); 