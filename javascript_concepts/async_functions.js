var messages = [
  { username: "snodgrass23", body: "How's the dog doing?" },
  { username: "dbecher", body: "Great, my pillow is not so great after she ripped it apart" },
  { username: "snodgrass23", body: "Have fun cleaning that up!" }
];

function getMessagesForUsername(username, callback) {
  // some logic to iterate through messages and return one with requested username
  callback(null, messages);
}

getMessagesForUsername("snodgrass23", function(err, messages1) {
  getMessagesForUsername("dbecher", function(err, messages2) {
    // do something with messages
  });
});


node -e 'console.log(process.versions)'

{ http_parser: '1.0',
  node: '0.8.18',
  v8: '3.11.10.25',
  ares: '1.7.5-DEV',
  uv: '0.8',
  zlib: '1.2.3',
  openssl: '1.0.0f' }


$("#button").click(function() {
  // do something when button is clicked
});


require('fs').readFile('/var/logs/app', function (err, data) {
  if (err) throw err;
  console.log(data);
});


var UserModel    = require('./models/user'),
    CommentModel = require('./models/comment');

UserModel.findById(id, function(err, user) {
      
    CommentModel.find({username: result.username}, function(err, comments)) {
      comments.forEach(function(comment) {
        console.log(comment);
      });
    }
});




// example DB class
function DBConnection() {
  this.run_query = function(query, callback) {
setTimeout(function() {
  callback(null, query);
}, 1000);
  };
}

function logQueryResults(err, result) {
  if (err) return console.log("ERROR:", err);
  console.log("Query Returned For: " + result);
}

// declare new connection variable with new instance of DBConnection
var connection = new DBConnection();

//request
console.log("handle http request");
connection.run_query("SELECT * FROM users", function(err, result) {
  logQueryResults(err, result);
});

//request
console.log("handle another http request for static asset");

//request
console.log("do some more cool stuff");

//request
console.log("handle http request");
connection.run_query("SELECT name, description FROM projects", logQueryResults);

//request
console.log("handle yet another http request for static asset");

//request
console.log("do some more cool stuff");
