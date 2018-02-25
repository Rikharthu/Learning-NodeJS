// Deep comparison
/*
The == operator compares objects by identity. 
But sometimes, you would prefer to compare the values of their actual properties.
*/
function deepEqual(a, b) {
    if (typeof a == 'object' && a != null && typeof b == 'object' && b != null) {
        let aKeys = Object.keys(a);
        let bKeys = Object.keys(b);
        if (aKeys.length != bKeys.length) {
            return false;
        }
        for (let key of aKeys) {
            if (!bKeys.includes(key)) {
                return true;
            }
            if (!deepEqual(a[key], b[key])) {
                return false;
            }
        }
        return true;
    } else {
        return a === b;
    }
    return true;
}

let obj = { here: { is: "an" }, object: 2 };
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, { here: 1, object: 2 }));
// → false
console.log(deepEqual(obj, { here: { is: "an" }, object: 2 }));
// → true