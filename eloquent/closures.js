/*
It defines a function, wrapValue, which creates a local binding. 
It then returns a function that accesses and returns this local binding
*/
function wrapValue(n) {
    let local = n;
    return () => local;
}

let wrap1 = wrapValue(1);
let wrap2 = wrapValue(2);
console.log(wrap1());
// → 1
console.log(wrap2());
// → 2

/*
both instances of the binding can still be accessed. 
This situation is a good demonstration of the fact that LOCAL BINDINGS ARE CREATED ANEW FOR EVERY CALL, 
and DIFFERENT CALLS CAN'T TRAMPLE ON ONE ANOTHER'S LOCAL BINDINGS.
*/

/*
Closure is a:
1) Being able to reference a specific instance of a local binding in an enclosing scope
2) Function that closes over some local bindings
*/

function multiplier(factor) {
    return number => number * factor;
}

let twice = multiplier(2);
console.log(twice(5));
// → 10

/*
Thinking about programs like this takes some practice. 
A good mental model is to think of function values as containing both the code in their body 
and the environment in which they are created. When called, the function body sees its original environment, 
not the environment in which the call is made.

In the example, multiplier is called, and creates an environment in which its factor parameter is bound to 2. 
The function value it returns, which is stored in twice, remembers this environment. 
So when that is called, it multiplies its argument by 2.
*/