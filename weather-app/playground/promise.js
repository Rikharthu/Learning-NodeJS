var somePromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Hey, it worked!');

        resolve('This won\'t get called twice');
        reject('Can\'t call reject() after resolve()');
    }, 2500);
});

var failingPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // TODO why if chained together, this doesn't have delay?
        reject('It did not work :(')
    }, 2500);
});

var greeterPromise = new Promise((resolve, reject) => {
    resolve('Hello, World!');
})

somePromise
    .then((message) => {
        // promise got fullfilled (resolve(...))
        console.log(`Success: ${message}`);
        // chaining with another promise
        return failingPromise
    })
    .then(console.log, console.error)   // just pass functions to be executed with the results
// second argument - error (reject(...))

greeterPromise
    .then(message => {
        // You can also return any other value and the next onFulfilled will be passed
        // the value as an argument
        return message.toUpperCase();
    })
    .then(console.log)


errorPromise = new Promise((resolve, reject) => {
    throw new Error('Some unepxected error')
})

errorPromise
    .then(console.log)  // won't handle error, since there is no onRejected handler, thus going forward to next 'then'
    .then(undefined, error => {
        console.log('Handling error: ' + error)
    });

var asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof a === 'number' && typeof b === 'number') {
                resolve(a + b);
            } else {
                reject(`Arguments must be numbers (${a}, ${b})`);
            }
        }, 1500);
    })
}

asyncAdd(3, 4)
    .then(result => {
        console.log(`Result: ${result}`)
        return asyncAdd(result, 7); // returning another promise
    })
    .then(result => {
        console.log(`Result: ${result}`)
        return result;  //returning a value
    })
    .then(prevResult => {
        return asyncAdd(prevResult, 'Seven')
    })
    .catch(errorMsg => {
        // catch() is a callback only for 'reject' part that's gonna fire for all the previos failures
        // basically the same as .then(undefined, console.log)
        console.error(errorMsg);
    })