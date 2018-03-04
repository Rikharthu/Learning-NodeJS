/*
The object given to a for/of loop is expected to be iterable. 
This means that it has a method named with the Symbol.iterator symbol (a symbol value defined by the language, 
    stored as a property of the Symbol function).
That method should return an object that provides a second interface, iterator, which:
- has a 'next' method that returns the next result
that result should be an object that contains:
    * next() method that returns the next result
    * done property, which should be true when there are no more results

next, value, and done property names are plain strings, not symbols.
*/

let okIterator = "OK"[Symbol.iterator]();
console.log(okIterator.next());
// → {value: "O", done: false}
console.log(okIterator.next());
// → {value: "K", done: false}
console.log(okIterator.next());
// → {value: undefined, done: true}

// Matrix class (two-dimensional array)
class Matrix {
    constructor(width, height, content = (x, y) => undefined) {
        this.width = width;
        this.height = height;
        this.content = [];

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                // store everything in a 1D array
                this.content[y * width + x] = content(x, y);
            }
        }
    }

    get(x, y) {
        return this.content[y * this.width + x];
    }
    set(x, y, value) {
        this.content[y * this.width + x] = value;
    }
}

// Create an iterator
class MatrixIterator {
    constructor(matrix) {
        this.x = 0;
        this.y = 0;
        this.matrix = matrix;
    }

    next() {
        if (this.y == this.matrix.height) return { done: true };

        let value = {
            x: this.x,
            y: this.y,
            value: this.matrix.get(this.x, this.y)
        };
        this.x++;
        if (this.x == this.matrix.width) {
            this.x = 0;
            this.y++;
        }
        return { value, done: false };
    }
}

// Make Matrix class iterable
Matrix.prototype[Symbol.iterator] = function () {
    return new MatrixIterator(this);
};

// Loop over a matrix with for/of
let matrix = new Matrix(2, 2, (x, y) => `value ${x},${y}`);
for (let { x, y, value } of matrix) {
    console.log(x, y, value);
}
// → 0 0 value 0,0
// → 1 0 value 1,0
// → 0 1 value 0,1
// → 1 1 value 1,1

module.exports = {
    Matrix
};