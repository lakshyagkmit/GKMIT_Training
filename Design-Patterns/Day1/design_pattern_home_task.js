/* -------- Identifying which SOLID principles are violated in each example.
Refactoring the Code, applying the design patterns which discussed. --------- */

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


//2.

class ShoppingCart {
    calculateTotal(items) {
        let total = 0;
        items.forEach(item => {
            if (item.type === 'book') {
                total += item.price * 0.9; 
            } else if (item.type === 'electronics') {
                total += item.price;
            }
        });
        return total;
    }
}

const cart = new ShoppingCart();
const items = [{ type: 'book', price: 100 }, { type: 'electronics', price: 200 }];
console.log(cart.calculateTotal(items)); 

// SOLID Principles Violated

/* Single Responsibility Principle : The ShoppingCart class is responsible for both calculating the total and applying discounts for specific item types. This violates SRP because the logic for calculating totals and applying discounts should be handled by separate classes or functions.
Open/Closed Principle :The calculateTotal method in ShoppingCart needs to be modified every time a new product type is added or a new discount rule is applied. This violates OCP because the class is not closed for modification but must be changed to support new features. */

//We will be Factory Pattern to refactor this code. The Factory Pattern will help create different item types. 


class Discount {
    applyDiscount(item) {
        console.log("No discount");
    }
}

class BookDiscount extends Discount {
    applyDiscount(item) {
        return item.price * 0.9; 
    }
}

class ElectronicsDiscount extends Discount {
    applyDiscount(item) {
        return item.price;
    }
}

class DiscountFactory {
    static getDiscount(itemType) {
        if (itemType === 'book') {
            return new BookDiscount();
        } else if (itemType === 'electronics') {
            return new ElectronicsDiscount();
        } else {
            throw new Error("Unsupported item type");
        }
    }
}

class ShoppingCart {
    calculateTotal(items) {
        let total = 0;
        items.forEach(item => {
            const strategy = DiscountFactory.getDiscount(item.type);
            total += strategy.applyDiscount(item);
        });
        return total;
    }
}

const cart = new ShoppingCart();
const items = [
    { type: 'book', price: 100 },
    { type: 'electronics', price: 200 }
];

console.log(cart.calculateTotal(items)); 

// 3. 

class Shape {
    area() {
        throw new Error("Method 'area()' must be implemented.");
    }
}

class Rectangle extends Shape {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }

    area() {
        return this.width * this.height;
    }
}

class Square extends Rectangle {
    constructor(side) {
        super(side, side);
    }
}

// Usage
function printArea(shape) {
    console.log(`Area: ${shape.area()}`);
}

const shape = new Square(5);
printArea(shape);

// SOLID Principle Violated
/* Liskov Substitution Principle: The problem arises because Square inherits the behavior of Rectangle, and Rectangle has two independent properties (width and height), but a Square should have the same width and height. */

// We will be aplying here factory pattern as well because the Shape class acts as the base class, and specific shapes like Rectangle and Square inherit from it.

class Shape {
    area() {
        throw new Error("Method 'area()' must be implemented.");
    }
}

class Rectangle extends Shape {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }

    area() {
        return this.width * this.height;
    }
}

class Square extends Shape {
    constructor(side) {
        super();
        this.side = side;
    }

    area() {
        return this.side * this.side;
    }
}


function printArea(shape) {
    console.log(`Area: ${shape.area()}`);
}


const square = new Square(5);
printArea(square);

const rectangle = new Rectangle(4, 6);
printArea(rectangle);

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

// 5. 

class PayPalPayment {
    pay(amount) {
        console.log(`Paid ${amount} using PayPal.`);
    }
}

class StripePayment {
    pay(amount) {
        console.log(`Paid ${amount} using Stripe.`);
    }
}

class PaymentProcessor {
    constructor() {
        this.paymentMethod = new PayPalPayment(); 
    }

    processPayment(amount) {
        this.paymentMethod.pay(amount);
    }
}

const processor = new PaymentProcessor();
processor.processPayment(100);

// SOLID Principle Violated
// Open/Closed Principle : The current implementation of PaymentProcessor violates the Open/Closed Principle because if you want to change the payment method from PayPal to another (like Stripe), you'll need to modify the PaymentProcessor class directly.

// We will refactor this code with factory pattern as well

class PaymentStrategy {
    pay(amount) {
        throw new Error("Method 'pay()' must be implemented.");
    }
}

class PayPalPayment extends PaymentStrategy {
    pay(amount) {
        console.log(`Paid ${amount} using PayPal.`);
    }
}

class StripePayment extends PaymentStrategy {
    pay(amount) {
        console.log(`Paid ${amount} using Stripe.`);
    }
}

class PaymentProcessor {
    constructor(paymentMethod) {
        this.paymentMethod = paymentMethod; 
    }

    processPayment(amount) {
        this.paymentMethod.pay(amount);
    }
}

const paypalProcessor = new PaymentProcessor(new PayPalPayment());
paypalProcessor.processPayment(100); 

const stripeProcessor = new PaymentProcessor(new StripePayment());
stripeProcessor.processPayment(150);


