// Numbers
// In JavaScript numbers are double-precision 64-bit binary format IEEE 754 value (numbers between -(253 -1) and 253 -1)

var a = 4;
console.log('a=' + a + ', type is ' + (typeof a));

// Number type has three symbolic values: +Infinity, -Infinity, and NaN (not-a-number).
var positiveInfinity = +Infinity;
var negativeInfinity = -Infinity;
console.log('a=' + positiveInfinity + ', type is ' + (typeof positiveInfinity));
console.log('a=' + negativeInfinity + ', type is ' + (typeof negativeInfinity));

console.log(42 / 0);
console.log(42 / -0);

// Get the max possible number value:
var maxValue = Number.MAX_VALUE;
console.log(`Max number value: ${maxValue}`);

// It's possible to use scientific notation:
var bigNumber = 2.998e8;
console.log('2.998e8 = ' + bigNumber);


// Strings
var stringA = `Down on the sea`;
var stringB = "Lie on the ocean";
var stringC = 'Float on the ocaea';
console.log(`${stringA}\n${stringB}\n${stringC}`);