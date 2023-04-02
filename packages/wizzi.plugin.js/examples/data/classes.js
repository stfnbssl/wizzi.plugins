class Polygon {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }
    get area() {
        return this.calcArea()
    }
    calcArea() {
        return this.height * this.width;
    }
    static distance(a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
}
class Lion extends Cat {
    speak() {
        super.speak();
        console.log(this.name + ' roars.');
    }
}
var Rectangle = class {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }
    area() {
        return this.height * this.width;
    }
}

class MyArray extends Array {
    // Overwrite species to the parent Array constructor
    static get [Symbol.species]() { return Array; }
}

let a = new MyArray(1, 2, 3);
let mapped = a.map(x => x * x);

class Cat {
    constructor(name) {
        this.name = name;
    }

    speak() {
        console.log(`start ${this.name} makes a 
noise ${this.hello} and so on.`);
    }
}

class Lion extends Cat {
    speak() {
        super.speak();
        console.log(`${this.name} roars.`);
    }
}
let l = new Lion('Fuzzy');
l.speak();
let calculatorMixin = Base => class extends Base {
    calc() { }
};
let randomizerMixin = Base => class extends Base {
    randomize() { }
};

class Foo { }
class Bar extends calculatorMixin(randomizerMixin(Foo)) { }
