function foo(x) {
  var tmp = 3;

  return function (y) {
    alert(x + y + (++tmp));
  };

}

var bar = foo(2); // bar is now a closure.
bar(10);