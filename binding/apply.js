/*
When you have a reference of the function in hand, you can call the function with the context provided by you. 
It can be done by using two methods that functions provide:

call - it takes a context as the first argument. The rest of arguments are 
       arguments passed to the function being called this way.

apply - it takes a context as the first argument and an array of arguments 
        for the function being called as the second argument

*/

function addAndSetX(a, b) {
	this.x += a + b;
}

var obj1 = { x: 1, y: 2 };

addAndSetX.call(obj1, 1, 1); // this = obj1, obj1 after call = { x: 3, y : 2 }
// It is the same as:
// addAndSetX.apply(obj1, [1, 1]);
