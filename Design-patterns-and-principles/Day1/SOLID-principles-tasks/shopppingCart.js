//2.

class ShoppingCart {
    calculateTotal(items) {
        let total = 0;
        items.forEach(item => {
            if (item.type === 'book') {
                total += item.price * 0.9; 
            } else if (item.type === 'electronics') {
                total += item.price;
            }
        });
        return total;
    }
}

const cart = new ShoppingCart();
const items = [{ type: 'book', price: 100 }, { type: 'electronics', price: 200 }];
console.log(cart.calculateTotal(items)); 

// SOLID Principles Violated

/* Single Responsibility Principle : The ShoppingCart class is responsible for both calculating the total and applying discounts for specific item types. This violates SRP because the logic for calculating totals and applying discounts should be handled by separate classes or functions.
Open/Closed Principle :The calculateTotal method in ShoppingCart needs to be modified every time a new product type is added or a new discount rule is applied. This violates OCP because the class is not closed for modification but must be changed to support new features. */

//We will be Factory Pattern to refactor this code. The Factory Pattern will help create different item types. 


class Discount {
    applyDiscount(item) {
        console.log("No discount");
    }
}

class BookDiscount extends Discount {
    applyDiscount(item) {
        return item.price * 0.9; 
    }
}

class ElectronicsDiscount extends Discount {
    applyDiscount(item) {
        return item.price;
    }
}

class DiscountFactory {
    static getDiscount(itemType) {
        if (itemType === 'book') {
            return new BookDiscount();
        } else if (itemType === 'electronics') {
            return new ElectronicsDiscount();
        } else {
            throw new Error("Unsupported item type");
        }
    }
}

class ShoppingCart {
    calculateTotal(items) {
        let total = 0;
        items.forEach(item => {
            const strategy = DiscountFactory.getDiscount(item.type);
            total += strategy.applyDiscount(item);
        });
        return total;
    }
}

const cart = new ShoppingCart();
const items = [
    { type: 'book', price: 100 },
    { type: 'electronics', price: 200 }
];

console.log(cart.calculateTotal(items)); 