/*
Functions that operate on other functions, either by taking them as arguments or by returning them, 
are called higher-order functions.
*/

function repeat(n, action) {
    for (let i = 0; i < n; i++) {
        action(i);
    }
}

repeat(3, console.log);
// → 0
// → 1
// → 2
repeat(3, (x) => { console.log(`Value is ${x}`) });
let labels = [];
repeat(5, i => {
    labels.push(`Unit ${i + 1}`);
});
console.log(labels);
// → ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5"]

function greaterThan(n) {
    return m => m > n;
}
let greaterThan10 = greaterThan(10);
console.log(greaterThan10(11));
// → true

// You can have functions that change other functions.
function noisy(f) {
    return (...args) => {
        console.log("calling with", args);
        let result = f(...args);
        console.log("called with", args, ", returned", result);
        return result;
    };
}
console.log(noisy(Math.min)(3, 2, 1));
// → calling with [3, 2, 1]
// → called with [3, 2, 1] , returned 1

// You can even write functions that provide new types of control flow.
function unless(test, then) {
    if (!test) then();
}

repeat(3, n => {
    unless(n % 2 == 1, () => {
        console.log(n, "is even");
    });
});
// → 0 is even
// → 2 is even

// Build in:
["A", "B"].forEach(l => console.log(l));
// → A
// → B


// Scripts example
const ANCESTORS = JSON.parse(require('./ancestry'));
function filter(array, test) {
    let passed = [];
    for (let element of array) {
        if (test(element)) {
            passed.push(element);
        }
    }
    return passed;
}

// Find ancestor that are born in period [1700; 1720]
//console.log(filter(ANCESTORS, ancestor => ancestor.born >= 1700 && ancestor.born <= 1720));

function map(array, transform) {
    let mapped = [];
    for (let element of array) {
        mapped.push(transform(element));
    }
    return mapped;
}

function birthFilter(start, end) {
    return (it) => {
        return it.born >= start && it.born <= end;
    };
}

console.log(map(filter(ANCESTORS, birthFilter(1700, 1720)), (ancestor) => { return ancestor.name }));

function reduce(array, combine, start) {
    let current = start;
    for (let element of array) {
        current = combine(current, element);
    }
    return current;
}

console.log(reduce([1, 2, 3, 4], (a, b) => a + b, 0));
// → 10

// Get ancestors born in 1700 - 1720, get their names and create a string list from it
console.log(
    reduce(
        map(
            filter(
                ANCESTORS,
                birthFilter(1700, 1720)
            ),
            (ancestor) => { return ancestor.name })
        ,
        (a, b) => {
            return a == null ? b : `${a}, ${b}`;
        },
        null
    )
);

// How many are males are out there
console.log(
    reduce(
        ANCESTORS,
        (a, b) => {
            return a + (b.sex == 'm' ? 1 : 0);
        },
        0
    )
);

// Get longest name (using built in reduce function)
console.log(ANCESTORS.reduce((a, b) => {
    return a.name.length > b.name.length ? a : b;
}).name);

// Average value
function average(array) {
    return array.reduce((a, b) => a + b) / array.length;
}
// Average birth year of all males and females
console.log(Math.round(average(
    ANCESTORS.filter(a => a.sex == "m").map(s => s.born))));
// → 1722
console.log(Math.round(average(
    ANCESTORS.filter(a => a.sex == "f").map(s => s.born))));
// → 1723

// Find ancestor
let person = { "name": "Jacobus Bernardus van Brussel", "sex": "m", "born": 1736, "died": 1809, "father": "Jan van Brussel", "mother": "Elisabeth Haverbeke" };
function findAncestors(p) {
    return ANCESTORS.filter(a => a.name == p.mother || a.name == p.father).map((a) => a.name);
}
console.log(findAncestors(person));

// Finds all ascendants (if list is sorted), including non-direct ones
function findAscendants(parent) {
    let people = [parent];
    return ANCESTORS.filter(
        a => {
            if (people.includes(a.father) || people.includes(a.mother)) {
                people.push(a.name);
                return true;
            }
            return false;
        }
    );
}
console.log(findAscendants('Pieter Haverbeke'));

/*
JavaScript strings are encoded as a sequence of 16-bit numbers
JavaScript strings use UTF-16 format. It describes most common characters using a single 16-bit code unit, 
but uses a pair of two such units for others.
*/
// Character codes
// Two emoji characters, horse and shoe
let horseShoe = "🐴👟";
console.log(horseShoe.length);
// → 4
console.log(horseShoe[0]);
// → (Invalid half-character)
console.log(horseShoe.charCodeAt(0));   // get Code Unit (not a full characted code)
// → 55357 (Code of the half-character)
console.log(horseShoe.codePointAt(0));  // get full Unicode character
// → 128052 (Actual code for horse emoji)

console.log('a'.charCodeAt(0));     //97
console.log('a'.codePointAt(0));    //97

// 
let roseDragon = "🌹🐉";
for (let char of roseDragon) {
    console.log(char);
}
// → 🌹
// → 🐉

// The countBy function expects a collection (anything that we can loop over with for/of) and a grouping function. 
// It returns an array of objects, each of which names a group and tells you the amount of elements that were found in that group.
function countBy(items, groupName) {
    let counts = [];
    for (let item of items) {
        let name = groupName(item);
        let known = counts.findIndex(c => c.name == name);
        if (known == -1) {
            // Create new group
            counts.push({ name, count: 1 });
        } else {
            // Add to existing group
            counts[known].count++;
        }
    }
    return counts;
}

console.log(countBy([1, 2, 3, 4, 5], n => n > 2));
// → [{name: false, count: 2}, {name: true, count: 3}]
// Group ancestors by sex
console.log(countBy(ANCESTORS, a => a.sex));

// Flattening
/*
Use the reduce method in combination with the concat method to “flatten” an array of arrays 
into a single array that has all the elements of the original arrays.
*/
let arrays = [[1, 2, 3], [4, 5], [6]];
console.log(arrays.reduce((a, b) => a.concat(b)));
// → [1, 2, 3, 4, 5, 6]

// Your own loop
function loop(value, test, update, body) {
    if (!test(value)) {
        return;
    }
    body(value);
    value = update(value);
    loop(value, test, update, body);
}
loop(3, n => n > 0, n => n - 1, console.log);
// → 3
// → 2
// → 1

// Everything
function every(array, test) {
    for (let element of array) {
        if (!test(element)) {
            return false;
        }
    }
    return true;
}

function everySome(array, test) {
    // To check whether test() function is true for every element of the array
    // check whether there is at least one element for whom the test() function fails
    return array.some((x) => !test(x));
}

console.log(every([1, 3, 5], n => n < 10));
// → true
console.log(every([2, 4, 16], n => n < 10));
// → false
console.log(every([], n => n < 10));
// → true
console.log(everySome([1, 3, 5], n => n < 10));
// → true
console.log(everySome([2, 4, 16], n => n < 10));
// → false
console.log(everySome([], n => n < 10));
// → true

// Dominant Gender
console.log(ANCESTORS.map((a) => a.sex).reduce((a, b, i, arr) => {
    return (arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a : b)
}, null
));

// Find average mother-child age difference
var byName = {};
// First group persons by name
ANCESTORS.forEach(function (person) {
    byName[person.name] = person;
});

// Get only those persons who have mother listed
// And then get age differences with their mother
var differences = ANCESTORS.filter(function (person) {
    return byName[person.mother] != null;
}).map(function (person) {
    return person.born - byName[person.mother].born;
});

console.log(average(differences));