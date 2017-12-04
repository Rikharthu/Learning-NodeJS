// Spies are built-in with expect
const expect = require('expect');
// rewire allows us to replace variables in our tests
// we will use it to replace the var db.. in app.js to use our spy
const rewire = require('rewire');

// specify which import we want to rewire (use rewire instead of require)
var app = rewire('./app');
// rewire works just like require, but also add 2 method: .__set__ and __get__ that allow us to mock data

describe('App', () => {

    it('should call the spy correctly', () => {
        // Creates a spy function that we are going to swap up with the real one
        var spy = expect.createSpy();
        spy('Andrew');
        // to success a test, spy() must be called with according (or noarg) arguments
        expect(spy).toHaveBeenCalled('Andrew');
    });

    // Swap out the 'db' variable in app.js with our spy function
    var db = {
        saveUser: expect.createSpy()
    };
    app.__set__('db', db);

    it('should call saveUser with user obect', () => {
        var email = 'andrew@example.com';
        var password = '123abc';
        app.handleSignup(email, password);
        // app.handleSignup() is going to fire db.saveUser(...), which we replaced with a spy
        expect(db.saveUser).toHaveBeenCalled({
            email,
            password
        });
    });

});