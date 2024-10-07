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