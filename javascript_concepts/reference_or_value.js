// passing in primitive type

function myfunction(x) {
  // x is equal to 4
  x = 5;
  // x is now equal to 5
}

var x = 4;
alert(x); // x is equal to 4
myfunction(x);
alert(x); // x is still equal to 4




// passing in object

function myobject() {
  this.value = 5;
}
var o = new myobject();
alert(o.value); // o.value = 5

function objectchanger(fnc) {
  fnc.value = 6;
}
objectchanger(o);
alert(o.value); // o.value is now equal to 6



// passing in method

function myobject() {
  this.value = 5;
}

myobject.prototype.add = function() {
  this.value++;
};

var o = new myobject();
alert(o.value); // o.value = 5
o.add();
alert(o.value); // o.value = 6

function objectchanger(fnc) {
  fnc(); // runs the function being passed in
}

objectchanger(o.add);
alert(o.value); // sorry, still just 6