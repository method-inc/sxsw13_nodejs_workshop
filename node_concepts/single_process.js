var start = Date.now();


/**
 * Notice how this will always return @1000, but never exact
 * because the anonomous function is added to the call stack
 * after 1000 but will not be actually executed until the event
 * loop reaches it will generally take a couple or more
 * additional ms
 */
setTimeout(function() {
  console.log(Date.now() - start);
}, 1000);


/**
 * Notice how this will behave similarly to the previous function
 * until the lotsOfProcessing function is uncommented at which point the
 * event loop is blocked and the time that function takes will be added
 * to the 2000 ms we may be expecting here
 */
setTimeout(function() {
  lotsOfProcessing();
  console.log(Date.now() - start);
}, 2000);


/**
 * this function will block the event loop, effectively
 * making the entire app and all other executions wait the time
 * it takes to finish
 */
function lotsOfProcessing() {
  var highest_number = 0;
  for (var i = 0; i < 1000000000; i++) {
    if (i > highest_number) {
      highest_number = i;
    }
  }
}