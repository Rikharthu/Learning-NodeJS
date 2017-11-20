var getUserSync = require('./getUserSync')

var user1 = getUserSync('123');
// Waiting on user1
console.log('user1',user1);
// Printing user1

var user2 = getUserSync('321');
// Waiting on user2
console.log('user2',user2);
// Printing user2

var sum = 1 + 2;
// Printing sum
console.log('The sum is '+sum);