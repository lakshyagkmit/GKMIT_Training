/*------ Singleton pattern ------*/

//The Singleton method or Singleton Design pattern is one of the simplest design patterns. It ensures a class only has one instance, and provides a global point of access to it. 

// BAD CODE EXAMPLE: 

let counter = 0;

class Counter {
  getInstance() {
    return this;
  }

  getCount() {
    return counter;
  }

  increment() {
    return ++counter;
  }

  decrement() {
    return --counter;
  }
}

const counter1 = new Counter();
const counter2 = new Counter();

console.log(counter1.getInstance() === counter2.getInstance());




// GOOD CODE EXAMPLE: 

let instance;
let counter = 0;

class Counter {
  constructor() {
    if (instance) {
      throw new Error("You can only create one instance!");
    }
    instance = this;
  }

  getInstance() {
    return this;
  }

  getCount() {
    return counter;
  }

  increment() {
    return ++counter;
  }

  decrement() {
    return --counter;
  }
}

const counter1 = new Counter();
const counter2 = new Counter();


/*------ Factory pattern ------*/

//Define an interface for creating an object, but let subclasses decide which class to instantiate. The Factory method lets a class defer instantiation it uses to subclasses.


// BAD CODE EXAMPLE:

function createVehicle(type) {
    if (type === "car") {
        return {
            type: "car",
            wheels: 4,
            drive: function() {
                console.log("Driving a car.");
            }
        };
    } else if (type === "truck") {
        return {
            type: "truck",
            wheels: 6,
            drive: function() {
                console.log("Driving a truck.");
            }
        };
    } else {
        return null;
    }
}


const car = createVehile("car");
const truck = createVehicle("truck");

car.drive(); 
truck.drive();


// GOOD CODE EXAMPLE:

class Vehicle {
    constructor() {
        this.wheels = 4;
    }

    drive() {
        console.log("Driving a vehicle.");
    }
}

class Car extends Vehicle {
    constructor() {
        super();
        this.type = "car";
    }

    drive() {
        console.log("Driving a car.");
    }
}

class Truck extends Vehicle {
    constructor() {
        super();
        this.wheels = 6;
        this.type = "truck";
    }

    drive() {
        console.log("Driving a truck.");
    }
}

class CarFactory {
    static createCar(type) {
        switch (type) {
            case "car":
                return new Car();
            case "truck":
                return new Truck();
            default:
                throw new Error("Unknown car type.");
        }
    }
}


const car = CarFactory.createCar("car");
const truck = CarFactory.createCar("truck");

car.drive(); 
truck.drive();


/*------ Observer pattern ------*/

// Defines a one-to-many dependency between objects, where one object (the subject) notifies its dependents of any state changes.


// BAD CODE EXAMPLE:

class Subject {
    constructor() {
        this.state = 0;
        this.listener = null; 
    }
    setState(newState) {
        this.state = newState;
        this.updateListener(); 
    }
    addListener(listener) {
        this.listener = listener; 
    }
    updateListener() {
        if (this.listener) {
            this.listener(); 
        }
    }
}


const subject = new Subject();
subject.addListener(() => {
    console.log("State updated, but hard to manage if more listeners are needed");
});
subject.setState(1);


//GOOD CODE EXAMPLE:

class Subject {
  constructor() {
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  notify() {
    this.observers.forEach(observer => observer.update());
  }
}

class Observer {
  update() {
    console.log("State updated");
  }
}

const subject = new Subject();
const observer = new Observer();
subject.addObserver(observer);
subject.notify();


/*------ Decorator pattern ------*/

// It allows behavior to be added to individual objects, dynamically, without affecting the behavior of other objects from the same class.

//BAD CODE EXAMPLE:

class Car {
    constructor() {
        this.price = 10000;
        this.description = "Basic Car";
    }
    getPrice() {
        return this.price;
    }
    getDescription() {
        return this.description;
    }
    addSunroof() {
        this.price += 1500;
        this.description += " with Sunroof";
    }
    addLeatherSeats() {
        this.price += 2000;
        this.description += " with Leather Seats";
    }
}
// Usage
const car = new Car();
car.addSunroof();
car.addLeatherSeats();
console.log(car.getPrice());
console.log(car.getDescription()); 


//GOOD CODE EXAMPLE:

class Car {
    getPrice() {
        return 10000;
    }
    getDescription() {
        return "Basic Car";
    }
}
class CarDecorator {
    constructor(car) {
        this.car = car;
    }
    getPrice() {
        return this.car.getPrice();
    }
    getDescription() {
        return this.car.getDescription();
    }
}
class SunroofDecorator extends CarDecorator {
    getPrice() {
        return this.car.getPrice() + 1500;
    }
    getDescription() {
        return this.car.getDescription() + " with Sunroof";
    }
}
class LeatherSeatsDecorator extends CarDecorator {
    getPrice() {
        return this.car.getPrice() + 2000;
    }
    getDescription() {
        return this.car.getDescription() + " with Leather Seats";
    }
}
let myCar = new Car();
myCar = new SunroofDecorator(myCar);  
myCar = new LeatherSeatsDecorator(myCar);
console.log(myCar.getPrice()); 
console.log(myCar.getDescription()); 

/*------ Proxy pattern ------*/

// The Proxy pattern provides a surrogate or placeholder object for another object and controls access to this other object.

// BAD CODE EXAMPLE:

class DBOperation {
    fetchData() {
        console.log("Fetching data from the server...");
        return "Data from server";
    }
}
const db = new DBOperation();
console.log(db.fetchData()); 



// GOOD CODE EXAMPLE:


class DBOperation {
    fetchData() {
        console.log("Fetching data from the server...");
        return "Data from server";
    }
}
class ProxyOperation {
    constructor() {
        this.realOperation = new DBOperation();
        this.cache = null;
    }
    fetchData() {
        if (!this.cache) {
            this.cache = this.realOperation.fetchData(); 
        } else {
            console.log("Returning cached data...");
        }
        return this.cache;
    }
}

const proxyOp = new ProxyOperation();
console.log(proxyOp.fetchData());
console.log(proxyOp.fetchData()); 


/*------ Command pattern ------*/

// The Command Design Pattern is a behavioral design pattern that turns a request into a stand-alone object, allowing parameterization of clients with different requests, queuing of requests, and support for undoable operations.


// BAD CODE EXAMPLE:

Bad code: Direct method calls on an object without abstraction
class Television {
    turnOn() {
        console.log("Television is ON");
    }
    turnOff() {
        console.log("Television is OFF");
    }
}
class RemoteControl {
    constructor(tv) {
        this.tv = tv;
    }
    pressButton(action) {
        if (action === "on") {
            this.tv.turnOn();
        } else if (action === "off") {
            this.tv.turnOff();
        }
    }
}

const tv = new Television();
const remote = new RemoteControl(tv);
remote.pressButton("on"); 
remote.pressButton("off");



// GOOD CODE EXAMPLE:


class Command {
    execute() {}
}

class TurnOnCommand extends Command {
    constructor(device) {
        super();
        this.device = device;
    }
    execute() {
        this.device.turnOn();
    }
}

class TurnOffCommand extends Command {
    constructor(device) {
        super();
        this.device = device;
    }
    execute() {
        this.device.turnOff();
    }
}

class Television {
    turnOn() {
        console.log("Television is ON");
    }
    turnOff() {
        console.log("Television is OFF");
    }
}

class RemoteControl {
    setCommand(command) {
        this.command = command;
    }
    pressButton() {
        this.command.execute();
    }
}

const tv = new Television();
const remote = new RemoteControl();

const turnOn = new TurnOnCommand(tv);
const turnOff = new TurnOffCommand(tv);
remote.setCommand(turnOn);
remote.pressButton();  
remote.setCommand(turnOff);
remote.pressButton(); 


/* -----  SOLID Principles ------- */

// 1. Single Responsibility Principle

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




// 2. Open/Closed Principle


// BAD CODE EXAMPLE:
// Directly modifying the class to add new features

class Discount {
    getDiscount(type) {
        if (type === "student") {
            return 10;
        } else if (type === "senior") {
            return 20;
        } else {
            return 0;
        }
    }
}



// GOOD CODE EXAMPLE:
// Extending class and not modifying a single class

class Discount {
    getDiscount() {
        return 0; 
    }
}


class StudentDiscount extends Discount {
    getDiscount() {
        return 10;
    }
}

class SeniorDiscount extends Discount {
    getDiscount() {
        return 20;
    }
}

// Usage
const discounts = [new StudentDiscount(), new SeniorDiscount()];
discounts.forEach(discount => console.log(discount.getDiscount()));





// 3. Liskov’s Substitution Principle


// BAD CODE EXAMPLE:
// Not following LSP

class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    getArea() {
        return this.width * this.height;
    }
}


class Square extends Rectangle {
    constructor(size) {
        super(size, size); 
    }

    setWidth(width) {
        this.width = width;
        this.height = width; 
    }
}



// GOOD CODE EXAMPLE:
// Following LSP

class Shape {
    getArea() {
        throw new Error("Method not implemented");
    }
}

class Rectangle extends Shape {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }

    getArea() {
        return this.width * this.height;
    }
}

class Square extends Shape {
    constructor(size) {
        super();
        this.size = size;
    }

    getArea() {
        return this.size * this.size;
    }
}

const shapes = [new Rectangle(5, 10), new Square(6)];
shapes.forEach(shape => console.log(shape.getArea()));





// 4. Interface Segregation Principle

// BAD CODE EXAMPLE:
// Interface with unrelated methods

class Worker {
    work() {
        throw new Error("Method not implemented");
    }

    eat() {
        throw new Error("Method not implemented");
    }
}

class RobotWorker extends Worker {
    work() {
        console.log("Robot working");
    }

    eat() {
        throw new Error("Robots don't eat");
    }
}



// GOOD CODE EXAMPLE:
// Separate interfaces for related functionality

class Workable {
    work() {
        throw new Error("Method not implemented");
    }
}

class Eatable {
    eat() {
        throw new Error("Method not implemented");
    }
}

class HumanWorker extends Workable {
    work() {
        console.log("Human working");
    }

    eat() {
        console.log("Human eating");
    }
}

class RobotWorker extends Workable {
    work() {
        console.log("Robot working");
    }
}

const humanWorker = new HumanWorker();
humanWorker.work();
humanWorker.eat();

const robotWorker = new RobotWorker();
robotWorker.work();




// 5. Dependency Inversion Principle


// BAD CODE EXAMPLE:
// High-level module depends on low-level module directly

class Frontend {
    constructor() {
        this.backend = new Backend();
    }

    render() {
        return this.backend.getData();
    }
}

class Backend {
    getData() {
        return "Data from backend";
    }
}



// GOOD CODE EXAMPLE:
// Abstraction for backend operations

class BackendService {
    getData() {
        throw new Error("Method not implemented");
    }
}

class Backend extends BackendService {
    getData() {
        return "Data from backend";
    }
}

class Frontend {
    constructor(backendService) {
        this.backendService = backendService;
    }

    render() {
        return this.backendService.getData();
    }
}

const backend = new Backend();
const frontend = new Frontend(backend);
console.log(frontend.render());






