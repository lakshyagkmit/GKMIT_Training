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