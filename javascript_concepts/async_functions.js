
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
