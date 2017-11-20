// Load in required modules bundled with node
const fs = require('fs');
const os = require('os')
// Load external file as module
const notes = require('./notes')
// Load NPM module (npm install <package_name> --save)
// const _ = require('lodash')
const yarg = require('yargs')

// To access command-line arguments use the 'process' object
// 1st position - node executable
// 2nd position - this file
// 3rd+ positions - user arguments
// var command = process.argv[2]

// yargs by default provides the --help and --version options
const titleOptions = {
    describe: 'Title of note',  // command description
    demand: true,               // demand, whether this argument is required (default false)
    alias: 't'                  // shortcut
};
const argv = yarg
    .command('add', 'Add a new note', {
        title: titleOptions,
        body: {
            describe: ' Body of note',
            demand: true,
            alias: 'b'
        }
    })
    .command('list', 'List all notes')
    .command('read', 'Read a note', {
        title: titleOptions
    })
    .command('delete', 'Delete a note', {
        title: titleOptions
    })
    .help() // sets up yargs to provide some helpful information through --help flag (will generate)
    .argv;
// User yargs to get first non-option argument
var command = argv._[0]

if (command === 'add') {
    var note = notes.addNote(argv.title, argv.body);
    if (note) {
        console.log('Note created')
        notes.logNote(note);
    } else {
        console.log("Note title taken")
    }
} else if (command === 'list') {
    var allNotes = notes.getAll()
    console.log(`Printing ${allNotes.length} note(s).`)
    allNotes.forEach(note => {
        notes.logNote(note);
    });
} else if (command === 'read') {
    var note = notes.getNote(argv.title);
    if (note) {
        console.log('Note found')
        notes.logNote(note);
    } else {
        console.log('Note not found');
    }
} else if (command === 'remove') {
    var noteRemoved = notes.removeNote(argv.title)
    var message = noteRemoved ? "Note was removed" : "Note not found";
    console.log(message);
} else {
    console.log('Command not recognized');
}