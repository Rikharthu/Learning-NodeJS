const express = require('express');

var app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.get('/secret', (req, res) => {
    res.status(404).send({
        error: 'Page not found.',
        name: 'Todo App v1.0'
    });
})

app.get('/users', (req, res) => {
    res.status(200).send([{
        name: 'Andrew',
        age: 32
    }, {
        name: 'Richard',
        age: 21
    }, {
        name: 'Lyokha',
        age: 21
    }, ])
});

app.listen(3000);

module.exports.app = app;