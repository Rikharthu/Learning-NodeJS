console.log("Starting app.");

// See built-in node modules here: https://nodejs.org/api/index.html
// We will use the Filesystem (fs) module and OS module to create a new file

// Load in required modules
const fs = require('fs'); // Loads all the contents of the 'fs' module and stores it in fs variable
const os = require('os')
// Load external file as module
const notes = require('./notes')
// Load NPM module (npm install <package_name> --save)
const _ = require('lodash') // Lodash library contains a lot of utility functions
// nodemon is responsible for watching for changes and restarting the app when changes occur

/*
// get current user info
var user = os.userInfo();
console.log(user);

// More info: https://nodejs.org/api/fs.html#fs_fs_appendfile_file_data_options_callback
fs.appendFile('greetings.txt', `Hello, ${user.username}! You are ${notes.age}.\n`, function (err) {
    // This callback gets executed when data is writter or error occured (err will be non-null)
    if (err) {
        console.log('Unable to write to file');
    } else {
        console.log('Successfully written data to the file');
    }
});

// Or synchronously:
// fs.appendFileSync('greetings.txt','Labdien, Pasaule!\n');
*/

var res = notes.addNote()
console.log(res)

console.log(notes.sum(2, 3))

// Lodash demo
console.log(_.isString(true))       // false
console.log(_.isString('Hello'))    // true
console.log(_.isString(4))          // false

var filteredArray = _.uniq([7,4,2,0,3,'Andrew',4,true,false,0,true,'Richard',9,'Richard'])
// duplicates are removed
console.log(filteredArray)