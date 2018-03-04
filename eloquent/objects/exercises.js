class Vec {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    plus(vec) {
        this.x += vec.x;
        this.y += vec.y;
        return this;
    }

    minus(vec) {
        this.x -= vec.x;
        this.y -= vec.y;
        return this;
    }

    get length() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }
}

console.log(new Vec(1, 2).plus(new Vec(2, 3)));
// → Vec{x: 3, y: 5}
console.log(new Vec(1, 2).minus(new Vec(2, 3)));
// → Vec{x: -1, y: -1}
console.log(new Vec(3, 4).length);
// → 5

class Group {
    constructor() {
        this.values = [];
    }
    add(value) {
        let valueIndex = this.values.indexOf(value);
        if (valueIndex == -1) {
            // Add
            this.values.push(value);
        } else {
            // Replace
            this.values[valueIndex] = value;
        }
    }
    delete(value) {
        let valueIndex = this.values.indexOf(value);
        if (valueIndex != -1) {
            this.values.splice(valueIndex, 1);
        }
    }

    has(value) {
        return this.values.includes(value);
    }

    static from(values) {
        let group = new Group();
        values.forEach(element => {
            group.add(element);
        });
        return group;
    }
}

let group = Group.from([10, 20]);
console.log(group.has(10));
// → true
console.log(group.has(30));
// → false
group.add(10);
group.delete(10);
console.log(group.has(10));
// → false
console.log(group.values);

// Make Group iterable
class GroupIterator {
    constructor(group) {
        this.currentIndex = 0;
        this.group = group;
    }

    next() {
        if (this.currentIndex < this.group.values.length) {
            return {
                value: this.group.values[this.currentIndex++],
                done: false
            };
        } else {
            return { done: true };
        }
    }
}
Group.prototype[Symbol.iterator] = function () {
    return new GroupIterator(this);
};

for (let value of Group.from(["a", "b", "c"])) {
    console.log(value);
}
// → a
// → b
// → c

let map = { one: true, two: true, hasOwnProperty: true };

// Fix this call
// console.log(map.hasOwnProperty("one"));
console.log(Object.prototype.hasOwnProperty.call(map, "one"));