let launchMissiles = function () {
    console.log("Launching missiles!");
};

let safeMode = false;

if (safeMode) {
    launchMissiles = function () {/* do nothing */ };
}

launchMissiles();


// Declaration notation:
// When the 'function' keyword is used at the start of the statement
// it omits the regular top-to-bottom program flow.
// They are moved to the top of their scope and can be used by all the code in that scope
// Thus the following function can be used even before it is defined, opposite to arrow function and x=function(){} declarations
console.log("The future says:", future());

function future() {
    return "You'll never have flying cars";
}

// Error, vasya is used before it's defined
// console.log('The Vasya says', vasya());

let vasya = function () {
    return "I am top programmeister 100lvl";
};


// Optional Arguments
/* JavaScript is extremely broad-minded about the number of arguments you pass to a function. 
If you pass too many, the extra ones are ignored. 
If you pass too few, the missing parameters get assigned the value undefined.*/
function minus(a, b) {
    if (b === undefined) return -a;
    else return a - b;
}

console.log(minus(10));
// → -10
console.log(minus(10, 5));
// → 5

// Default Arguments
function power(base, exponent = 2) {
    let result = 1;
    for (let count = 0; count < exponent; count++) {
        result *= base;
    }
    return result;
}

console.log(power(4));
// → 16
console.log(power(2, 6));
// → 64


// Nested Scope
// You can define function inside functions and etc
const hummus = function (factor) {
    const ingredient = function (amount, unit, name) {
        let ingredientAmount = amount * factor;
        if (ingredientAmount > 1) {
            unit += "s";
        }
        console.log(`${ingredientAmount} ${unit} ${name}`);
    };
    ingredient(1, "can", "chickpeas");
    ingredient(0.25, "cup", "tahini");
    ingredient(0.25, "cup", "lemon juice");
    ingredient(1, "clove", "garlic");
    ingredient(2, "tablespoon", "olive oil");
    ingredient(0.5, "teaspoon", "cumin");
};
hummus(3);

// Recursion
function toPower(base, exponent) {
    if (exponent == 0) {
        return 1;
    } else {
        return base * power(base, exponent - 1);
    }
}

console.log(toPower(2, 3));
// → 8

function findSolution(target) {
    function find(current, history) {
        if (current == target) {
            return history;
        } else if (current > target) {
            return null;
        } else {
            return find(current + 5, `(${history} + 5)`) ||
                find(current * 3, `(${history} * 3)`);
        }
    }
    return find(1, "1");
}

console.log(findSolution(24));
// → (((1 * 3) + 5) * 3)


// Growing functions
function zeroPad(number, width) {
    let string = String(number);
    while (string.length < width) {
        string = "0" + string;
    }
    return string;
}

function printFarmInventory(cows, chickens, pigs) {
    console.log(`${zeroPad(cows, 3)} Cows`);
    console.log(`${zeroPad(chickens, 3)} Chickens`);
    console.log(`${zeroPad(pigs, 3)} Pigs`);
}

printFarmInventory(7, 16, 3);


// Exercise:
function isEven(x) {
    if (x == 0) {
        return true;
    } else if (x == 1) {
        return false;
    } else {
        return isEven(x - 2);
    }
}

console.log(isEven(50));
// → true
console.log(isEven(75));
// → false
// console.log(isEven(-1));
// → ?? CRASH