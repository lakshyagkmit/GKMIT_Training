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