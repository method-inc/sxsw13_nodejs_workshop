/**
 * start this small app by running 'node shared_state.js'
 * and then open localhost:1337 in a browser
 *
 * Notice the first time you load the page, all books will be output, but
 * the second time you load the page, there are no books.
 */


var books = [
  { title: "Smashing Node.js", author: "Guillermo Rauch" },
  { title: "Javascript: The Good Parts", author: "Douglas Crockford" },
  { title: "Eloquent Javascript", author: "Marijn Haverbeke" }
];

function handleRequest(req, res) {

  var output = "All Books: \n", book;

  while(books.length) {
    // this is changing the books array, so the next request will get the modified array
    // which is generally not what is expected
    book = books.pop();
    output += book.title + " by " + book.author + "\n";
  }

  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end(output);
}


// two line http server
var http = require('http');
http.createServer(handleRequest).listen(1337, '127.0.0.1');