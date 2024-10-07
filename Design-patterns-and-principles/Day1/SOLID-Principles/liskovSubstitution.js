// Liskov’s Substitution Principle


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