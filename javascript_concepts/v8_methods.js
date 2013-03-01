/**
 * Getting the keys of an object
 * without iterating through and using hasOwnProperty
 */
var book = {
  name     : "The Hitchhiker's Guide to the Galaxy",
  author   : "Douglas Adams",
  num_pages: 224
};

Object.keys(book);
//[ 'name', 'author', 'num_pages' ]



/**
 * accurately checking for an array type
 */
var array = [];

var type = typeof array1;
// object

Array.isArray(array1);
// true



/**
 * native array iteration
 */

["jim", "david", 23].forEach( function(value) {
  console.log(value);
});
// jim
// david
// 23


/**
 * native array filter
 */

["jim", "david", 23].filter( function(value) {
  return typeof value == "string";
});
// [ 'jim', 'david' ]


/**
 * Native string trim
 */

"  hello world ".trim();
// 'hello world'



/**
 * function binding
 */
function a() {
  return this.hello == 'world';
}

a();
// false

var b = { hello: 'world' };

var c = a.bind(b); // sets scope of 'this' to b

c();
// true



// Accessor methods (__defineGetter__, __defineSetter__)

Date.prototype.__defineGetter__('ago', function() {
  // define logic to return string for how long ago the date was
    var diff = new Date() - this;

    var conversions = [
      ["years", 31518720000],
      ["months", 2626560000 /* assumes there are 30.4 days in a month */],
      ["days", 86400000],
      ["hours", 3600000],
      ["minutes", 60000],
      ["seconds", 1000]
    ];

    for (var i = 0; i < conversions.length; i++) {
      var result = Math.floor(diff / conversions[i][1]);
      if (result >= 2) {
        return result + " " + conversions[i][0] + " ago";
      }
    }

    return "just now";
});

var my_bd = new Date('3/24/1978');

my_bd.ago;
// '34 years ago'