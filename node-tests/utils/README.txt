Install 'mochajs' for testing via command:
npm install mocha@3.0.0 --save-dev
Becase we do need it only for testing, not for heroku, for example
It is added to devDependencies

Write some tests
Configure the test script in package.json to use mocha
'mocha **/*.test.js'
Run 'npm test'

Or using nodemon:
nodemon --exec 'npm test'
P.S. we also added our custom 'test-watch' task to package.json started with 'npm run test-watch' command

We use 'mjackson expect' as assertion library
https://github.com/mjackson/expect

mocha will throw the following error, if asynchronous test did not call done() in 2 seconds (or was not called at all)
Error: timeout of 2000ms exceeded. Ensure the done() callback is being called in this test.