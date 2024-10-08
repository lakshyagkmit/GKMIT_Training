// Open/Closed Principle


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
