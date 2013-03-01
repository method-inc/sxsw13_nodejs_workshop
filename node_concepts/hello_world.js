require('http').createServer(function handleRequest(req, res) {

  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end("Hello World");

}).listen(1337, '127.0.0.1');

console.log("web server listening on: 127.0.0.1:1337");
