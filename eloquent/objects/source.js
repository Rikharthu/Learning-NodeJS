let rabbit = {};
// Create a method
rabbit.speak = function (line) {
    console.log(`The rabbit says '${line}'`);
};

rabbit.speak("I'm alive.");

function speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
};

let whiteRabbit = { type: 'white', speak };
let hungryRabbit = { type: 'hungry', speak };

whiteRabbit.speak("Oh my ears and whiskers, how lat it's getting!");
hungryRabbit.speak("I could use a carrot right now.");

/*
You can think of this as an extra parameter that is passed in a different way. 
If you want to pass it explicitly, you can use a function’s call method, 
which takes the this value as first argument, and treats further arguments as normal parameters.
*/
speak.call(hungryRabbit, "Burp!");

function normalize() {
    console.log(this.coords.map(n => n / this.length));
}
normalize.call({ coords: [0, 2, 3], length: 5 });
