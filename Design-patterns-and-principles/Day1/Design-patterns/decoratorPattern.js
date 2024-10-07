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