/**
 * These objects represent some kind of data store
 */
var books = {
  "4gl8g4k7g83": { title: "Node Web Development", author: "23k4h2l345h" },
  "a987fas9d6g": { title: "Unicorn Diaries",      author: "afh89679asd" }
};

var authors = {
  "23k4h2l345h": { name: "David Herron", books: ["4gl8g4k7g83"] }
};


/**
 * These functions represent query methods to pull items from the stores above
 */
function getBook(book_id, callback) {
  setTimeout(function() { // use timeout to simulate async IO
    if (!books[book_id]) return callback(new Error("That book was not found"));
    return callback(null, books[book_id]);
  }, 1500);
}

function getAuthor(author_id, callback) {
  setTimeout(function() { // use timeout to simulate async IO
    if (!authors[author_id]) return callback(new Error("That author was not found"));
    return callback(null, authors[author_id]);
  }, 1000);
}


/**
 * This function represents a middleware or controller function after a request has been made
 *
 * Notice how commenting out the line that handles the error gracefully causes an uncaught
 * exception and crashes the server.
 */
function handleRequest(id, callback) {

  // run getBook with a valid ID
  getBook(id, function gettingBook(err, book) {
    if (err) return callback(err);  // if there is an error, return immediately COMMENT OUT THIS LINE TO TEST INVALID ERROR HANDLING

    getAuthor(book.author, callback);
  });
}


/**
 * run request with valid id
 */
handleRequest("4gl8g4k7g83", console.log);

/**
 * run request with valid id, but for a book that has an invalid author
 */
handleRequest("a987fas9d6g", console.log);


/**
 * run request with invalid id
 *
 * notice how commenting out this line allows previous valid call to return successfully
 * however, when this line is executed, it causes an uncaught exception and neither call returns.
 *
 * In the real world, it would be possible for either of these calls to finish first, so it would
 * be seemingly random whether the first call returns or not
 */
handleRequest("not_valid", console.log);
