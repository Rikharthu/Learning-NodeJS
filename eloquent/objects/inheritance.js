const { Matrix } = require('./iterator');

// Lets create a Symmetrical matrix that extends base Matrix class
class SymmetricMatrix extends Matrix {
    constructor(size, content = (x, y) => undefined) {
        // call super constructor
        super(size, size, (x, y) => {
            if (x < y) return content(y, x);
            else return content(x, y);
        });
    }

    set(x, y, value) {
        super.set(x, y, value);
        if (x != y) {
            super.set(y, x, value);
        }
    }
}

let matrix = new SymmetricMatrix(5, (x, y) => `${x},${y}`);
console.log(matrix.get(2, 3));
// → 3,2

console.log(Object.getPrototypeOf(matrix));
// SymmetricMatrix {}
console.log(
    Object.getPrototypeOf(
        Object.getPrototypeOf(matrix)
    ));
// Matrix { [Symbol(Symbol.iterator)]: [Function] }
console.log(
    Object.getPrototypeOf(
        Object.getPrototypeOf(
            Object.getPrototypeOf(matrix)
        )));
// {}
console.log(Object.getPrototypeOf(SymmetricMatrix.prototype));
// Matrix { [Symbol(Symbol.iterator)]: [Function] }

// instanceof operator
console.log(new SymmetricMatrix(2) instanceof SymmetricMatrix);
// → true
console.log(new SymmetricMatrix(2) instanceof Matrix);
// → true
console.log(new SymmetricMatrix(2) instanceof Object);
// → true
console.log(new Matrix(2, 2) instanceof SymmetricMatrix);
// → false
console.log([1] instanceof Array);
// → true