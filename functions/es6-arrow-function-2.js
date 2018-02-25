// arguments object - no longer bound with arrow functions

const add = function (a, b) {
    console.log(arguments); // all the arguments passed to the function, regardless of what is defined on the args list
    return a + b;
};
console.log(add(55, 1));
console.log(add(55, 1, 1001));

const addArrow = (a, b) => {
    // arrow functions do not have access to 'arguments' console.log(arguments);
    return a + b;
};
console.log(addArrow(55, 1));
console.log(addArrow(55, 1, 1001));

// this keyword - no longer bound
const user = {
    name: 'Andrew',
    cities: [
        'Phildalephia', 'New York', 'Dublin'
    ],
    printPlacesLived: function () {
        // 'this' keyword is bounded to an object we have access to this.cities and
        // this.name
        const that = this;
        this
            .cities
            .forEach(function (city) {
                // we can not access 'this.name' and etc from here 'this' keyword is rebound,
                // use a hack above
                console.log(`${that.name} has lived in ${city}`);
            });

        // Arrow functions do rebind their own 'this', thus we can easily do this
        // without hack:
        this
            .cities
            .forEach((city) => {
                console.log(`${this.name} has lived in ${city}`);
            });
    },
    printPlacesLivedArrow: () => {
        // arrow function is not bound to object 'this' keyword instead it is bound to
        // the global context We can't access this.name and this.cities of the object
    },
    // ES6 method syntax
    printPlacesLivedMethod() {
        const cityMessages = this
            .cities
            .map((city) => `${this.name} has lived in ${city}`);
        return cityMessages;
    }
};

user.printPlacesLived();
user.printPlacesLivedArrow();
console.log(user.printPlacesLivedMethod());

const multiplier = {
    numbers: [
        10, 20, 30
    ],
    multiplyBy: 3,
    multiply() {
        return this
            .numbers
            .map((number) => number * this.multiplyBy);
    }
};

console.log(multiplier.multiply());