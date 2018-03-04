let empty = {};
console.log(empty.toString);
// → function toString(){…}
console.log(empty.toString());
// → [object Object]

/*
Most objects have a prototype.
A prototype is another object that is used as a fallback source of properties
When an object gets a request for a property that it does not have, its prototype will be search
for the property, then the prototype's prototype, and so on.

The entity behind almost all objects is Object.prototype.

(Nearly all objects in JavaScript are instances of Object; 
a typical object inherits properties (including methods) from Object.prototype,)
*/

// get prototype of the object
console.log(Object.getPrototypeOf({}) ==
    Object.prototype);
// → true
// Object.prototype doesn't have prototypes, thus it is the root
console.log(Object.getPrototypeOf(Object.prototype));
// → null

// Object.prototype provides a few methods, such as toString()
// More info: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype

// You can use Object.create to create an object with a specific prototype:
let protoRabbit = {
    // Create a function property (shorthand)
    speak(line) {
        console.log(`The ${this.type} rabbit says '${line}'`);
    }
};
let killerRabbit = Object.create(protoRabbit);
killerRabbit.type = "killer";
killerRabbit.speak("SKREEEE!");
// → The killer rabbit says 'SKREEEE!'