// TODO more info:
// http://2ality.com/2015/02/es6-classes-final.html

class Person {
    constructor(name = 'Anonymous Anonymous', age = 0) {
        console.log(`Person constructor called for ${name}`);
        let fullname = name.trim().split(' ');
        this.firstname = fullname[0];
        this.lastname = fullname[1];
        this.age = age;
    }

    getGreeting() {
        return `Hello, ${this.firstname} ${this.lastname}!`;
    }

    getDescription() {
        return `${this.firstname} ${this.lastname} is ${this.age} year(s) old`;
    }
}

const me = new Person('Andrew Mead', 24);
console.log(me);
console.log(me.getGreeting());
console.log(me.getDescription());

const anon = new Person();
console.log(anon);
console.log(anon.getGreeting());


class Student extends Person {
    constructor(name, age, major) {
        // call super constructor
        super(name, age);
        this.major = major;
    }

    // no need to override getGreeting() method

    getDescription() {
        let description = super.getDescription();
        if (this.hasMajor()) {
            description += " and has major in " + this.major;
        }
        return description;
    }

    hasMajor() {
        return !!this.major;
    }
}

const student = new Student('Andrew Mead', 26, 'Computer Science');
const anonStudent = new Student();
console.log(student);
console.log(student.getGreeting());
console.log(student.getDescription());
console.log(anonStudent.getDescription());

console.log(student.methods);

console.log(student instanceof Person);     // true
console.log(student instanceof Student);    // true

console.log(me instanceof Person);          // true
console.log(me instanceof Student);         // false

console.log(Student.prototype.hasMajor);

// Constructor functions
function PersonFun(first, last, age, eyecolor) {
    this.firstName = first;
    this.lastName = last;
    this.age = age;
    this.eyeColor = eyecolor;
}

const funPerson = new PersonFun("Andrew", "Mead", 21, "red");
console.log(funPerson);

PersonFun.prototype.nationality = "English";

console.log(funPerson); // nothing changed
console.log(funPerson.nationality); // English

PersonFun.prototype.getDescription = function () {
    return `${this.firstName} ${this.lastName} is ${this.age} year(s) old. ${this.firstName} is ${this.nationality} and has ${this.eyeColor} eyes.`;
};

console.log(funPerson.getDescription());