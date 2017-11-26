var getUser = (id, callback) => {
    var user = {
        id: id,
        name: 'Wick'
    };
    // simulate the delay
    setTimeout(() => {
        // call the callback function with result
        callback(user);
    }, 3000);
};

getUser(31, (user) => {
    console.log(user);
})