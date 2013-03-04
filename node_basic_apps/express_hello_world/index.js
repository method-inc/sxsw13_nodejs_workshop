var express = require('express');
var app = express();

// routing functions built in
app.get('/', function(req, res){

  // helper methods that set headers and send data for you
  res.send('Hello World');
});


app.listen(3000);
console.log('Listening on port 3000');