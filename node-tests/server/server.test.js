const request = require('supertest'); // for testing express
const expect = require('expect');

var app = require('./server').app;

describe('Server', () => {

    it('should return hello world response', (done) => {
        request(app)
            .get('/')
            .expect(200) // status code (default)
            .expect('Hello World!')
            .end(done);
    });

    // Nested describe is allowed too
    describe('Failing tests', () => {

        it('should return hello andrew response', (done) => {
            request(app)
                .get('/')
                .expect(200) // status code (default)
                .expect('Hello Andrew!')
                .end(done);
        });

        // Fails, because /secret returns 404 code
        it('should return secrets', (done) => {
            request(app)
                .get('/secret')
                .expect(200)
                .expect('Secrets')
                .end(done);
        });

    });

    it('should not tell our secret to anyone', (done) => {
        request(app)
            .get('/secret')
            .expect(404) //expected status code
            .expect({ // we expect a json response
                error: 'Page not found.',
                name: 'Todo App v1.0'
            })
            .end(done);
    });

    // Use our own test function
    it('should test some function', (done) => {
        request(app)
            .get('/secret')
            .expect(404) //expected status code
            .expect((res) => {
                // this function is called by supertest
                // res contains all response information
                expect(res.body).toInclude({
                    error: 'Page not found.'
                })
            })
            .end(done);
    });

    // While testing servers, it is common to group test by the according endpoint and method
    describe('GET /users', () => {
        it('should return users', (done) => {
            request(app)
                .get('/users')
                .expect(200)
                .expect((res) => {
                    // this function is called by supertest
                    // res contains all response information
                    // test that I exist in /users
                    expect(res.body).toInclude({
                        name: 'Richard',
                        age: 21
                    })
                })
                .end(done);
        });
    });
});