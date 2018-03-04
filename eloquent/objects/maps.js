// A map is a data structure that associates values with other values
let ages = {
    Boris: 39,
    Liang: 22,
    Julia: 62
};

console.log(`Julia is ${ages["Julia"]}`);
// → Júlia is 62
console.log("Is Jack's age known?", "Jack" in ages);
// → Is Jack's age known? false
console.log("Is toString's age known?", "toString" in ages);
// → Is toString's age known? true

// We did not list anyone named 'toString', but since plain objects derive from Object.prototype
// the 'toString' property is there, thus
// USING PLAIN OBJECTS AS MAPS IS DANGEROUS!
// To avoid it:
// 1. create objects with no prototype via Object.create(null)
console.log('toString' in Object.create(null));
// → false

// Use the Map class
ages = new Map();
ages.set("Boris", 39);
ages.set("Liang", 22);
ages.set("Júlia", 62);

console.log(`Júlia is ${ages.get("Júlia")}`);
// → Júlia is 62
console.log("Is Jack's age known?", ages.has("Jack"));
// → Is Jack's age known? false

// Onjet.keys only returns an object's own keys, not those in the prototype
console.log({ x: 1 }.hasOwnProperty("x"));
// → true
console.log({ x: 1 }.hasOwnProperty("toString"));
// → false