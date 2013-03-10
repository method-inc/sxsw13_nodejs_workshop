function add(x, y, callback) {
  setTimeout(function() {
    if(!x || !y) return callback(new Error("missing arguments"));
    callback(null, x+y);
  }, 0);
}

add(undefined, undefined, function(err, result){
  if (err) console.log(err);
  else console.log(result);
});
