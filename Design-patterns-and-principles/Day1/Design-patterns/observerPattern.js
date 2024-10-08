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