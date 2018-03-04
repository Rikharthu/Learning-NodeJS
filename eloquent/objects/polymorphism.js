class Racoon {
    constructor(type) {
        this.type = type;
    }
    speak(line) {
        console.log(`The ${this.type} racoon says '${line}`);
    }
}

let killerRacoon = new Racoon('killer');
console.log(killerRacoon);
console.log(String(killerRacoon));
console.log("Killer racoon: " + killerRacoon);

// Override toString() method
Racoon.prototype.toString = function () {
    return `a ${this.type} racoon`;
};
console.log(killerRacoon);
console.log(String(killerRacoon));
console.log("Killer racoon: " + killerRacoon);