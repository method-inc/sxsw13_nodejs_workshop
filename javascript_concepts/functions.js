function foo() {

}

// realize that this actually creates an anon function
// that the var has a reference to
var bar = function() {

};

// by naming the function, when exceptions are thrown
// inside the function debugging is made easier
// as the function name will be output with the exception
var baz = function baz() {

};



// same concepts when declaring functions as properties of an object
var obj = {

  bar: function() {

  },

  baz: function baz() {

  }

}