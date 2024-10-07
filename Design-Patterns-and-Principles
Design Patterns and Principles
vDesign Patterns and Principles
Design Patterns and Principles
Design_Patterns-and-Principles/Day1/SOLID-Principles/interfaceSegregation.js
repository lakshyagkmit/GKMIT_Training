// Interface Segregation Principle

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