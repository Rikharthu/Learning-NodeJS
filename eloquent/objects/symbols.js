class Racoon {
    constructor(type) {
        this.type = type;
    }
    speak(line) {
        console.log(`The ${this.type} racoon says '${line}`);
    }
}

/*
Symbols are values created with the Symbol function. 
Unlike strings, newly created symbols are unique - you cannot create the same symbol twice.
*/

let sym = Symbol("name");
console.log(sym == Symbol("name"));
// → false
Racoon.prototype[sym] = 55;
let blackRacoon = new Racoon('black');
console.log(blackRacoon[sym]);
// → 55

/*
Being both unique and useable as property names makes symbols suitable for defining interfaces 
that can peacefully live alongside other properties, no matter what their names are.
*/
const toStringSymbol = Symbol("toString");
Array.prototype[toStringSymbol] = function () {
    return `${this.length} cm of blue yarn`;
};

console.log([1, 2].toString());
// → 1,2
console.log([1, 2][toStringSymbol]());
// → 2 cm of blue yarn

let stringObject = {
    [toStringSymbol]() { return "a jute rope"; }
};
console.log(stringObject[toStringSymbol]());
// → a jute rope