console.log("Hello World!")

var http = require('http');

var server = http.createServer(function(req, res) {
  res.writeHead(200);
  res.end('Hello Http');
});
server.listen(8080);

// 'global', node's equivalent of browser's 'window' object. For instance it also stores 'console' object and etc
// thus console.log("Hello") is the same as global.console.log("Hello")
// browser's equivalent to 'document' (stores DOM of the shown page) is 'process'
// run process.exit(0) to exit without error

// node is a javascript runtime that use a v8 engine
// v8 engine is an open-source javascript engine written in c++ that takes javascript code and compiles it into machine code