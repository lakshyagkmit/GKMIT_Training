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



//Use Case :-  a single UserManager class handling user authentication, data validation, and profile management


//Before (Violates SRP):
class UserManager {
  constructor(authService, db) {
    this.authService = authService;
    this.db = db;
  }
  authenticate(username, password) {
    // Authentication logic using authService
  }
  validateUserData(data) {
    // Data validation logic
  }
  createUserProfile(data) {
    // Profile creation logic using db
  }
  getUserProfile(userId) {
    // Profile retrieval logic using db
  }
}


// After (SRP Applied):
class AuthenticationService {
  authenticate(username, password) {
    // Authentication logic
  }
}
class UserDataValidator {
  validate(data) {
    // Data validation logic
  }
}
class UserDatabase {
  createUserProfile(data) {
    // Profile creation logic
  }
  getUserProfile(userId) {
    // Profile retrieval logic
  }
}



// 2. Open/Closed Principle



/*Use Case :-  Create an AbstractShape interface with methods for calculating area and perimeter. Concrete shapes like Circle and Square can implement this interface without modifying the original code.*/


// Before (Violates OCP):
class ManageSalaries {
  constructor() {
    this.salaryRates = [
      { id: 1, role: 'developer', rate: 100 },
      { id: 2, role: 'architect', rate: 200 },
      { id: 3, role: 'manager', rate: 300 },
    ];
  }
  calculateSalaries(empId, hoursWorked) {
    let salaryObject = this.salaryRates.find((o) => o.id === empId);
    return hoursWorked * salaryObject.rate;
  }
}
const mgtSalary = new ManageSalaries();
console.log("Salary : ", mgtSalary.calculateSalaries(1, 100));


// After (OCP Applied):
class ManageSalaries {
  constructor() {
    this.salaryRates = [
      { id: 1, role: 'developer', rate: 100 },
      { id: 2, role: 'architect', rate: 200 },
      { id: 3, role: 'manager', rate: 300 },
    ];
  }
  calculateSalaries(empId, hoursWorked) {
    let salaryObject = this.salaryRates.find((o) => o.id === empId);
    return hoursWorked * salaryObject.rate;
  }
  addSalaryRate(id, role, rate) {
    this.salaryRates.push({ id: id, role: role, rate: rate });
  }
}
const mgtSalary = new ManageSalaries();
mgtSalary.addSalaryRate(4, 'developer', 250);
console.log('Salary : ', mgtSalary.calculateSalaries(4, 100));




// 3. Liskov’s Substitution Principle
//UseCase:-   If a function expects a Shape object to calculate its area, any valid subtype like Circle or Square should seamlessly replace it, maintaining the expected behavior.


// Before (LSP Violates):
interface Shape {
  calculateArea(): number;
}
class Rectangle implements Shape {
  width: number;
  height: number;
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
  calculateArea(): number {
    return this.width * this.height;
  }
}
class Square extends Rectangle {
  constructor(size: number) {
    super(size, size);
  }
  setWidth(width: number) {
    this.width = width;
    this.height = width;
  }
  setHeight(height: number) {
    this.width = height;
    this.height = height;
  }
}


function drawShape(shape: Shape) {
  const area = shape.calculateArea();
}
const mySquare = new Square(5);
mySquare.setWidth(4);
drawShape(mySquare);


// (LSP Applied):
interface Shape {
  calculateArea(): number;
}
class Rectangle implements Shape
{
  width: number;
  height: number;
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
  calculateArea(): number {
    return this.width * this.height;
  }
}
function drawShape(shape: Shape) {
  const area = shape.calculateArea();
}
drawShape(new Rectangle(5, 4));




// 4. Interface Segregation Principle

/* Use Case:-Instead of a single UserInterface with methods for both admin and user features, create separate interfaces (AdminInterface and UserInterface) exposing only relevant methods for each type of user.*/


// Before (Violates ISP):
Class DrivingTest {
  constructor(userType) {
    this.userType = userType;
  }
  startCarTest() {
    console.log(“This is for Car Drivers”’);
  }
  startTruckTest() {
    console.log(“This is for Truck Drivers”);
  }
}
class CarDrivingTest extends DrivingTest {
  constructor(userType) {
    super(userType);
  }
  startCarTest() {
    return “Car Test Started”;
  }
  startTruckTest() {
    return null;
  }
}
class TruckDrivingTest extends DrivingTest {
  constructor(userType) {
    super(userType);
  }
  startCarTest() {
    return null;
  }
  startTruckTest() {
    return “Truck Test Started”;
  }
}
const carTest = new CarDrivingTest(carDriver );
console.log(carTest.startCarTest());
console.log(carTest.startTruckTest());
const truckTest = new TruckDrivingTest( ruckdriver );
console.log(truckTest.startCarTest());
console.log(truckTest.startTruckTest());



// After (ISP Applied):
Class DrivingTest {
  constructor(userType) {
    this.userType = userType;
  }
}
class CarDrivingTest extends DrivingTest {
  constructor(userType) {
    super(userType);
  }
}
class TruckDrivingTest extends DrivingTest {
  constructor(userType) {
    super(userType);
  }
}
const carUserTests = {
  startCarTest() {
    return ‘Car Test Started’;
  },
}
const truckUserTests = {
  startTruckTest() {
    return ‘Truck Test Started’;
  },
}
Object.assign(CarDrivingTest.prototype, carUserTests);
Object.assign(TruckDrivingTest.prototype, truckUserTests);
const carTest = new CarDrivingTest(carDriver );
console.log(carTest.startCarTest());
console.log(carTest.startTruckTest()); // Will throw an exception
const truckTest = new TruckDrivingTest( ruckdriver );
console.log(truckTest.startTruckTest());
console.log(truckTest.startCarTest()); // Will throw an exception



// 5. Dependency Inversion Principle


//Instead of directly referencing a specific data storage implementation in your application logic, rely on an abstract DataStore interface.


// Before (Violates DIP):
class EmailController {
  sendEmail(emailDetails) {
     // Need to change this line in every controller that uses YahooAPI.const response = YahooAPI.sendEmail(emailDetails);
    if (response.status == 200) {
       return true;
    } else {
       return false;
    }
  }
}


// After (DIP Applied):
class EmailController {
  sendEmail(emailDetails) {
    const response = EmailApiController.sendEmail(emailDetails);
    if (response.status == 200) {
       return true;
    } else {
       return false;
    }
  }
}
class EmailApiController {
  sendEmail(emailDetails) {
    // Only need to change this controller. return YahooAPI.sendEmail(emailDetails);
  }
}





