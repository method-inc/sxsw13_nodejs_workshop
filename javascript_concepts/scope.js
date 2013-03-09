var aNumber = 100;
tweak();

function tweak(){

  // This prints "undefined", because aNumber is also defined locally below.
  // the declaration is hoisted as such:
  // var aNumber = undefined;
  document.write(aNumber);

  if (false) {
    var aNumber = 123;
  }
}

// common misuses

for (var i = 0; i < things.length; i++) {
  var thing = things[i];
};

if (thing) {
	var newThing = thing;
}
else {
  var newThing = {};
}