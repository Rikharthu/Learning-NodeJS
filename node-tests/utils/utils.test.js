// Tests for utils.js module
const utils = require('./utils');
const expect = require('expect');

// describe(), just like it() function is injected by mocha
// It lets us group up the tests (see output)
describe('Utils', () => {

    // Nested describe blocks are also allowed
    describe('#add', () => {

        // No need to import mocha since we will run tests through it 
        // Behavior Driven Development: "It should add two numbers"
        it('should add two numbers', () => {
            var res = utils.add(33, 11);
            if (res !== 44) {
                throw new Error(`Expected 44 but got ${res}`);
            }
        });
    });


    describe('#async tests', () => {

        // Testing asynchronous code
        // that 'done' argument teslls mocha that this is an async test
        // and it should wait for it to complete (call done())
        it('should add two numbers asynchronously', (done) => {
            utils.asyncAdd(33, 11, res => {
                expect(res).toBe(44);
                // mark test as finished
                done();
            })
        });

        it('square a number asynchronously', (done) => {
            utils.asyncSquare(2, res => {
                expect(res).toBe(4);
                // mark test as finished
                done();
            })
        });

    })

    it('should square a number', () => {
        var res = utils.square(4);
        if (res !== 16) {
            throw new Error(`Expected 16 but got ${res}`);
        }
    });

    // Same with 'expect' library
    it('should add two numbers', () => {
        var res = utils.add(33, 11);
        // expect assertions can be nested
        expect(res).toBeA('number').toBe(44);
    });

    it('should square a number', () => {
        var res = utils.square(4);
        expect(res).toBeA('number').toBe(16);
    });

    it('should set user name and surname', () => {
        var user = {
            age: 25,
            location: 'Philadelphia'
        }
        utils.setName(user, 'Andrew Mead');
        expect(user).toBeA('object').toInclude({
            firstName: 'Andrew',
            lastName: 'Mead'
        })
    });

});

it('should expect some values', () => {
    // expect(12).toNotBe(12);

    // expect({name: 'Andrew'}).toBe({name: 'Andrew'}) // Fails
    // It fails because 'toBe' under the hood used the '===' which check for instance equality for objects
    // For object equality use 'toEqual'
    expect({
        name: 'Andrew'
    }).toEqual({
        name: 'Andrew'
    }); // Fails

    // Check if object/array includes some things:
    expect([2, 3, 4]).toInclude(3).toExclude(17);
    // Works for object properties too:
    expect({
        name: 'Andrew',
        age: 25,
        location: 'Philadelphia'
    }).toInclude({
        age: 25
    });
});