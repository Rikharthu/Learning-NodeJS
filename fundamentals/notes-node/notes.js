// module - represents module for a current file
// Use it's .exports property to specify objects/functions/etc that this module will provide through it's 'require'

const fs = require('fs')

var fetchNotes = () => {
    try {
        var notesString = fs.readFileSync('notes-data.json')
        return JSON.parse(notesString);
    } catch (e) {
        return [];
    }
};

var saveNotes = (notes) => {

    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) => {
    var notes = fetchNotes();
    var note = {
        title,
        body
    };

    var duplicateNotes = notes.filter((note) => note.title === title);

    if (duplicateNotes.length === 0) {
        // No duplicate notes => Ok
        notes.push(note);
        saveNotes(notes);
        return note;
    } else {
        return null;
    }
}

var getAll = () => {
    return fetchNotes();
}

var getNote = (title) => {
    var notes = fetchNotes();
    var filteredNotes = notes.filter((note) => {
        return note.title === title;
    });
    return filteredNotes[0];
}

var removeNote = (title) => {
    var notes = fetchNotes();
    var filteredNotes = notes.filter((note) => note.title !== title)
    saveNotes(filteredNotes);

    // true if note was deleted
    return notes.length !== filteredNotes.length;
}

var logNote = (note) => {
    console.log('--');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
};

module.exports = {
    // addNote: addNote
    addNote, // New ES6 syntax (if name and variable name is the same)
    getAll,
    getNote,
    removeNote,
    logNote
}
// Export a function through 'arrow function'
/*
module.exports.addNote = ()=>{
    console.log('Adding note');
    return 'New Note'
}
*/