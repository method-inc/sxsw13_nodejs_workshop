// a local relative module
var Classroom = require('./classroom');


function handleRequest(req, res) {

  var params = require('url').parse(req.url),
      id = params.path.replace("/", "");

  res.writeHead(200, {'Content-Type': 'text/plain'});

  // was a specific student requested?
  if(id) {
    Classroom.getStudentById(id, function(err, result){
      if (err) return res.end(err);
      return res.end(result);
    });
  }

  else {
    Classroom.getStudents(function(err, result){
      if (err) return res.end("Error: " + err);
      return res.end(result.join(", "));
    });
  }
}


// absolute module, required by name only
var http = require('http');

// you then have access to that modules exposed API
http.createServer(handleRequest).listen(1337, '127.0.0.1');
