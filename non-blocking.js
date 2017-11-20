var getUserSync = require('./getUser')

// We just start the request, we are not waiting for the data
var user1 = getUser('123',function(user1){
    // Non blocking, executed when user is fetched
    console.log('user1',user1);
});

var user2 = getUser('321',function(user2){
    console.log('user2',user2);
});

var sum = 1 + 2;
console.log('The sum is '+sum);