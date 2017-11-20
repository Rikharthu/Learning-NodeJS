// Define an arrow function
/*
var square = (x) => {
    var result = x * x;
    return result;
};
*/
// Same as:
// var square = (x) => x * x; 
// No parentheses needed for 1 argument
var square = x => x * x;

console.log(square(2))
console.log(square(3))

// First difference: arrow function do not bind 'this' keyword
// Arrow function binds to global 'this' and 'arguments'
// While regular function binds correctly as expected
var user = {
    name: 'Andrew',
    sayHi: () => {
        // console.log(arguments);
        console.log(`Hi. I'm ${this.name}`); // Would return "Hi. I'm undefined"
        // because 'this' is bound to global object instead of this one
    },
    // Regular function, correctly binds to 'this' keyword
    sayHiAlt (){
        // also binds arguments (doesn't work with arrow function)
        console.log(arguments);
        // "Hi. I'm Andrew"
        console.log(`Hi. I'm ${this.name}`);
    }
};
// Thus use regular functions instead of arrow-functions when creating methods in objects
// Though if you do not need 'arguments' and 'this', then you may use arrow-functions
// In other cases use arrow-functions whenever possible

user.sayHi();
user.sayHiAlt(1,2,3);
user.sayHi(1,2,3);
