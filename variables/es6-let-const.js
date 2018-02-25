var nameVar = 'Andrew';
nameVar = 'Bob';
var nameVar = 'Mike';
console.log('nameVar', nameVar);

let nameLet = 'Jen';
nameLat = 'Sarah'; // can reassign
// let nameLet = 'Jen'; ERROR, can't redefine 'let'
console.log('nameLet', nameLet);

const nameConst = 'Vasja';
// nameConst = 'Petrek'; // can't reassign const const nameConst = 'Gosha' //
// can't redefine 'const'
console.log('nameConst', nameConst);

// Scope demo 'var' are function-scoped each var is scoped to a function it is
// defined and can't be accessed outside this function
function getPetName() {
    var petName = 'Hal';
    return petName;
}

getPetName();
// console.log(petName); // petName is not available in this scope

var fullName = 'Jen Mead';

if(fullName){
    var firstName = fullName.split(' ')[0];
    console.log(firstName);
}
// OK, firstName is visible here
console.log(firstName);

if(fullName){
    let secondName = fullName.split(' ')[1];
    console.log(secondName);
}
// ERROR, secondName let is not visible here
// console.log(secondName);

if(fullName){
    const secondName = fullName.split(' ')[1];
    console.log(secondName);
}
// ERROR, secondName const is not visible here
// console.log(secondName);