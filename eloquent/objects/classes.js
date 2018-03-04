/*
In order to create an instance of a given class, make an object that derives from the proper prototype
and make sure it, itself has the properties that instances of this class are supposed to have.
*/
// Create a prototype
let protoRabbit = {
    speak(line) {
        console.log(`The ${this.type} rabbit says '${line}'`);
    }
};
// This is what a constructor function does:
function makeRabbit(type) {
    let rabbit = Object.create(protoRabbit);
    rabbit.type = type;
    return rabbit;
}

let lazyRabbit = makeRabbit('lazy');
lazyRabbit.speak('...');

/*
If you put the keyword 'new' in front of a function call, the function is treated as a constructor:
an object with the right prototype is automatically created, bound to 'this' in the function
and returned at the end of the function
*/
function Rabbit(type) {
    this.type = type;
}
// The new object’s prototype will be the object found in the prototype property of the constructor. 
Rabbit.prototype.speak = function (line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
};
let weirdRabbit = new Rabbit('weird');
weirdRabbit.speak('Show titties');
/*
Constructors (all functions, in fact) automatically get a property named prototype, which by default holds a plain, 
empty object that derives from Object.prototype. 
You can overwrite it with a new object if you want.
Or you can add properties to the existing object, as the example does.
*/
// Function's prototype property is an empty object that derives from Object.prototype
console.log(Rabbit.prototype);
// -> Rabbit { speak: [Function] }
console.log(Object.getPrototypeOf(Rabbit.prototype));
// -> {}

/* !!!
The actual prototype of a constructor is Function.prototype since constructors are functions. 
Its prototype property holds the prototype used for instances created through it.
*/
console.log(Object.getPrototypeOf(weirdRabbit));

/* Class notation
JavaScript classes are constructor functions with a prototype property.
The class keyword starts a class declaration, which allows us to define:
 - a constructor
 - set of methods
*/

class Racoon {
    // 'constructor' is a constructor function which will be bound to the name 'Racoon'
    constructor(type) {
        this.type = type;
    }
    speak(line) {
        console.log(`The ${this.type} racoon says '${line}`);
    }
    // Class declarations only allow methods
}

let killerRacoon = new Racoon("killer");
let blackRacoon = new Racoon("black");
killerRacoon.speak("A");
blackRacoon.speak("B");

// 'class' can also be used in an expression
let object = new class { getWord() { return "Hello"; } };
console.log(object.getWord());


/*
Overriding derived properties

When you add a property to an object, whether it is present in the prototype or not, 
the property is added to the object itself, which will henceforth have it as its own property. 
If there is a property by the same name in the prototype, this property will no longer affect the object, 
as it is now hidden behind the object’s own property.
*/
Racoon.prototype.teeth = "small";
console.log(killerRacoon.teeth);
// -> small
killerRacoon.teeth = "long, sharp and bloody";
console.log(killerRacoon.teeth);
// -> long, sharp, and bloody

// It is also used to give the standard function and array prototypes a different toString method than the basic object prototype.
console.log(Array.prototype.toString ==
    Object.prototype.toString);
// → false
console.log([1, 2].toString());
// → 1,2

// Emulates a call to <some_array>.toString(), but from Object's prototype instead of Array.prototype
console.log(Object.prototype.toString.call([1, 2])); 
// → [object Array]