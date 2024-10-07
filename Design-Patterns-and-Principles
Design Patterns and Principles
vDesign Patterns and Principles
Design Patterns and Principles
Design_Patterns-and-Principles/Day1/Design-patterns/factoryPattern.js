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