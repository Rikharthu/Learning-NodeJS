/*
Bounded function in JavaScript is a function that is bounded to a given context. 
That means no matter how you call it, the context of the call will stay the same. 
The only exception is the new operator which always return a new context.

To create a bounded function out of the regular function, the bind method is used
`.bind` method take context to which you want to bind your function as a first argument. 
The rest of arguments are arguments that will be always passed to such function. 
It returns a bounded function as a result. Let’s see an example:
*/

function add(x, y) {
	this.result += x + y;
}

var computation1 = { result: 0 };
var boundedAdd = add.bind(computation1);

boundedAdd(1, 2); // `this` is set to `computation1`.
//  computation1 after call: { result: 3 }
console.log(computation1);

var boundedAddPlusTwo = add.bind(computation1, 2);
boundedAddPlusTwo(4); // `this` is set to `computation1`.
// computation1 after call: { result: 9 }
console.log(computation1);

/*
Bounded function can’t be changed even by manually calling call and apply! 
See these examples:
*/
var obj = { boundedPlusTwo: boundedAddPlusTwo };
obj.boundedPlusTwo(4);
// `this` is set to `computation1`.
// even though method is called on `obj`.
// computation1 after call: { result: 15 }
console.log(computation1);

var computation2 = { result: 0 };
boundedAdd.call(computation2, 1, 2);
// `this` is set to `computation1`.
// even though context passed to call is
// `computation2`
// computation1 after call: { result: 18 }

console.log(computation1);
