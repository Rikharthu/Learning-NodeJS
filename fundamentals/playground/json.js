var obj = {
    name: 'Richard',
    surname: 'Kuodis'
};

var stringObj = JSON.stringify(obj);

console.log(obj, typeof obj)

console.log(stringObj, typeof stringObj)

// Convert JSON back into object
var personString = '{"name": "Richard","age": 21}'
var person = JSON.parse(personString)

// Make this breakpoint available. Next 'c' or 'continue' command will stop at it
debugger;
/*
PS D:\Documents\Projects\nodejs\fundamentals\playground> node inspect .\json.js
< Debugger listening on ws://127.0.0.1:9229/d3659cdc-7a60-48ce-a233-eb08939456e4
< For help see https://nodejs.org/en/docs/inspector
Break on start in json.js:1
> 1 (function (exports, require, module, __filename, __dirname) { var obj = {
  2     name: 'Richard',
  3     surname: 'Kuodis'
debug> c
< { name: 'Richard', surname: 'Kuodis' } 'object'
< {"name":"Richard","surname":"Kuodis"} string
break in json.js:16
 14 var person = JSON.parse(personString)
 15
>16 debugger;
 17
 18 console.log(person, typeof person)
debug>
(To exit, press ^C again or type .exit)
*/

console.log(person, typeof person)
console.log(person.name)
console.log(person.age)

// Persist javascript as json file and then read it back into object
const fs = require('fs')

var originalNote = {
    title: 'Some title',
    body: 'Some body'
}
fs.writeFileSync('notes.json', JSON.stringify(originalNote))

var noteString=fs.readFileSync('notes.json')
var note = JSON.parse(noteString)

console.log(note.title,note.body)