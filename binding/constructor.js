// Every time you see a new followed by a function name,
// your this will point to a newly created empty object.

// Function that are designed to be used with the new syntax are called constructors.
// By convention their names begin by an upper case letter.
function Wizard() {
	this.castSpell = function() {
		return console.log('KABOOM');
	};
}

var merlin = new Wizard(); // this is set to an empty object {}. Returns `this` implicitly.
merlin.castSpell(); // returns "KABOOM";

/*
This is exactly how a constructor invocation pattern looks like. Function called with the new operator will cause two things:
    1) Function will have a `this` context pointing to an empty object.
    2) If you do not specify return, or this function will return a non-object value, 
       `this` will get returned from such function.
*/
