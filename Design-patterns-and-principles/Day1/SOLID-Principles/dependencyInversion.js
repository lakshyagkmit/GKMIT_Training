// 5. Dependency Inversion Principle


// BAD CODE EXAMPLE:
// High-level module depends on low-level module directly

class Frontend {
    constructor() {
        this.backend = new Backend();
    }

    render() {
        return this.backend.getData();
    }
}

class Backend {
    getData() {
        return "Data from backend";
    }
}



// GOOD CODE EXAMPLE:
// Abstraction for backend operations

class BackendService {
    getData() {
        throw new Error("Method not implemented");
    }
}

class Backend extends BackendService {
    getData() {
        return "Data from backend";
    }
}

class Frontend {
    constructor(backendService) {
        this.backendService = backendService;
    }

    render() {
        return this.backendService.getData();
    }
}

const backend = new Backend();
const frontend = new Frontend(backend);
console.log(frontend.render());