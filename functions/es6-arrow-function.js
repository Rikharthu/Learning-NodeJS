const squareArrow = (x) => {
    return x * x;
};

const squareFun = function (x) {
    return x * x;
};

function squareFunction(x) {
    return x * x;
}

console.log(typeof squareArrow); // function
console.log(typeof squareFun); // function
console.log(typeof squareFunction); // function

console.log(squareArrow(2));

const cubeArrow = (x) => x * x * x;
console.log(cubeArrow(2));

const getFirstName = (fullName) => {
    return fullName.split(' ')[0];
};

console.log(getFirstName('Mike Smith'));


function doSomething() {
    console.log(arguments);
}

doSomething();
doSomething(1, 2, 3, 5);

const doSomethingArrow = () => {
    console.log(arguments);
};

doSomethingArrow();
doSomethingArrow(1, 2, 3, 5);