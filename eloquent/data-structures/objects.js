let day1 = {
    squirrel: false,
    events: ["work", "touched tree", "pizza", "running"]
};
console.log(day1.squirrel);
// → false
console.log(day1.wolf);
// → undefined
day1.wolf = false;
console.log(day1.wolf);
// → false

// Properties whose names are not valid binding names or valid numbers have to be quoted
let descriptions = {
    work: "Went to work",
    "touched tree": "Touched a tree"
};
console.log(descriptions);
console.log(descriptions.work);
console.log(descriptions["touched tree"]);
// It's possible to add new properties:
descriptions.foo = "Bar";
console.log(descriptions);
// And delete existing ones:
delete descriptions.work;
console.log(descriptions);
// Use Object.keys to find out what properties an object has
console.log(Object.keys(descriptions));

// Use Object.assign to copy all properties from one object into another
let descriptionsAndDay1 = Object.assign(descriptions, day1);
console.log(descriptionsAndDay1);

// Mutability
let object1 = { value: 10 };
let object2 = object1;
let object3 = { value: 10 };

console.log(object1 == object2);
// → true because they grasp the same binding
console.log(object1 == object3);
// → false

object1.value = 15;
// also changed object2.value
console.log(object2.value);
// → 15
console.log(object3.value);
// → 10

// The Lycanthrope's Log
let journal = [];

function addEntry(events, squirrel) {
    journal.push({ events, squirrel });
}
addEntry(["work", "touched tree", "pizza", "running",
    "television"], false);
addEntry(["work", "ice cream", "cauliflower", "lasagna",
    "touched tree", "brushed teeth"], false);
addEntry(["weekend", "cycling", "break", "peanuts",
    "beer"], true);

// 00 - no pizza, no squirrel (0)
// 10 - pizza, no squirrel (2)
// 01 - no pizza, squirrel (1)
// 11 - pizza, squirrel (3)
function phi(table) {
    return (table[3] * table[0] - table[2] * table[1]) /
        Math.sqrt((table[2] + table[3]) *
            (table[0] + table[1]) *
            (table[1] + table[3]) *
            (table[0] + table[2]));
}

console.log(phi([76, 9, 4, 1]));

journal = require('./journal').JOURNAL;

function tableFor(event, journal) {
    let table = [0, 0, 0, 0];
    for (let entry of journal) {
        let index = 0;
        if (entry.events.includes(event)) index += 1;
        if (entry.squirrel) index += 2;
        table[index] += 1;
    }
    return table;
}

console.log(tableFor("pizza", journal));
// → [76, 9, 4, 1]

function journalEvents(journal) {
    let events = [];
    for (let entry of journal) {
        for (let event of entry.events) {
            if (!events.includes(event)) {
                events.push(event);
            }
        }
    }
    return events;
}

console.log(journalEvents(journal));
// → ["carrot", "exercise", "weekend", "bread", …]

for (let event of journalEvents(journal)) {
    console.log(event + ":", phi(tableFor(event, journal)));
}
// → carrot:   0.0140970969
// → exercise: 0.0685994341
// → weekend:  0.1371988681
// → bread:   -0.0757554019
// → pudding: -0.0648203724
// and so on...

// Eating peanuts has a strong positive effect on the chance of turning into a squirrel, 
// whereas brushing his teeth has a significant negative effect.
for (let entry of journal) {
    if (entry.events.includes("peanuts") &&
        !entry.events.includes("brushed teeth")) {
        entry.events.push("peanut teeth");
    }
}
console.log(phi(tableFor("peanut teeth", journal)));
// → 1
// The phenomenon occurs precisely when Jacques eats peanuts and fails to brush his teeth. 
// If only he weren’t such a slob about dental hygiene, he’d have never even noticed his affliction.

// Destructuring
let { name } = { name: "Faraji", age: 23 };
console.log(name);
let someData = [75, 1, 9, 23];
let [n00, n01, n10, n11] = someData;
console.log(n00);
console.log(n01);
console.log(n10);
console.log(n11);

function range(a, b, step = 1) {
    let result = [];
    if (step > 0) {
        for (let i = a; i <= b; i += step) {
            result.push(i);
        }
    } else {
        for (let i = a; i >= b; i += step) {
            result.push(i);
        }
    }
    return result;
}

console.log(range(1, 10));
// → [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(range(5, 2, -1));
// → [5, 4, 3, 2]
//console.log(sum(range(1, 10)));
// → 55

// List
function arrayToList(array) {
    let list = {};
    for (let i = array.length - 1; i >= 0; i--) {
        let x = array[i];
        list = { value: x, rest: list };
        if (i == array.length - 1) {
            list.rest = null;
        }
    }
    return list;
}

function listToArray(list) {
    let array = [];
    for (let node = list; node; node = node.rest) {
        array.push(node.value);
    }
    return array;
}

function prepend(element, list) {
    return { value: element, rest: list };
}

function nth(list, n) {
    let counter = 0;
    for (let node = list; node; node = node.rest) {
        if (counter == n) {
            return node.value;
        }
        counter++;
    }
    return null;
}

// Recursive version
function nthRec(list, n) {
    if (n == 0) {
        return list.value;
    } else {
        return nthRec(list.rest, n - 1);
    }
}

console.log(arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20
console.log(nthRec(arrayToList([10, 20, 30]), 1));
// → 20