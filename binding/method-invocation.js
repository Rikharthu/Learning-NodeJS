/*
If your function is defined within an object, 
calling it directly from an object will set its 
context to the object on which the function is being called.
*/

var frog = {
	RUN_SOUND: 'POP!!',
	run: function() {
		return this.RUN_SOUND;
	}
};

frog.run(); // returns "POP!!" since this points to the `frog` object.
var runningFun = frog.run;
runningFun(); // returns "undefined" since this points to the window
