/**
 * Person class
 * @author Jim Snodgrass
 * @property {String} name the person's name
 * @property {Number} walk_speed the person's walking speed
 * @property {Number} run_speed the person's running speed
 */

function Person(options) {

  // options needs to be initialized with a default if none were passed in

  options = options || {};

  // instance properties
  // the use of guards makes sure the property is initialized as the correct type if
  // that particular option was not passed in

  this.name       = options.name || "Jon Doe";
  this.walk_speed = options.walk_speed || 5;
  this.run_speed  = options.run_speed || 12;


}

// Now we defined methods on the class by definining it's prototype
// you could also start with another class's prototype as a base

Person.prototype = {

  speak: function speak() {
    console.log(this.name + " speaks");
  },

  walk: function walk() {
    console.log(this.name + " is walking at a speed of " + this.walk_speed);
  },

  run: function run() {
    console.log(this.name + " is running at a speed of " + this.run_speed);
  }

};



var John = new Person({
  name      : "John Doe",
  walk_speed: 6,
  run_speed : 11
});


John.walk();

// John Doe is walking at a speed of 6

John.run();

// John Doe is running at a speed of 11







/**
 * Male class
 */
function Male(options) {
  options = options || {};

  this.gender = 'male';
}

// important to know that the Person class is initialized at this time which might be undesirable
Male.prototype = new Person();

// override method
Male.prototype.speak = function(says) {
  says = says || "nothing";
  console.log(this.name + " says " + says);
};


/**
 * Female class
 */
function Female(options) {
  options = options || {};

  this.gender = 'female';
}

// better way that doesn't initialize Person class immediately
Female.prototype._proto_ = Person.prototype;

// override method
Female.prototype.speak = function(says) {
  says = says || "nothing";
  console.log(this.name + " says " + says);
};