var fs = require('fs'),
    colors = require('colors'),
    stdin = process.stdin,
    stdout = process.stdout;


fs.readdir(process.cwd(), function(err, files) {

  // check that there are files in directory
  if (!files.length) {
    return console.log("\n    No files to show!\n".red);
  }

  console.log("\n  Select which file or directory you would like to see\n");

  // begin processing items
  processItem(0);

  // store stat of each item in directory for later reference
  var stats = [];

  function processItem(i) {
    var filename = files[i];
        output_string = "    "+(i+1)+" : "+filename;

    // get stat of item.
    // This could actually be done fine in this instance with the
    // sync method, but using the async method is good practice
    fs.stat(__dirname + '/' + filename, function(err, stat) {

      // store stat
      stats[i] = stat;

      // is item a directory or file?
      if (stat.isDirectory()) {
        console.log(output_string.cyan);
      }
      else {
        console.log(output_string);
      }

      // bump i to iterate to next item
      i++;

      // are there any more files?
      if (i == files.length) {
        getUserInput();
      }
      else {
        processItem(i);
      }

    });
  }

  /**
   * resume the stdin stream and take in data from the user
   */
  function getUserInput() {
    stdout.write("\n    Enter your choice: ".green);
    stdin.resume();
    stdin.setEncoding('utf8');

    // when data is submitted by user
    stdin.on('data', selectOption);
  }


  /**
   * receive data submitted by user.
   * the data will be converted to Number type and the function will
   * then show details about the selected item
   */
  function selectOption(data) {
    var num = Number(data)-1,
        filename = files[num];

    // make sure item number exists
    if (!filename) {
      stdout.write("    Enter your choice: ".red);
    }
    else {

      // pause stdin stream
      stdin.pause();

      // is item a directory?
      if (stats[num].isDirectory()) {

        // read all files in directory and log them to the console
        fs.readdir(__dirname+'/'+filename, function(err, files) {
          console.log(("\n"+"    "+files.length+" item(s) in directory:").yellow);
          files.forEach(function (file) {
            console.log("    -  " + file);
          });
          console.log("");
        });
      }

      else {

        // read content of file and print to console
        fs.readFile(__dirname+'/'+filename, 'utf8', function(err, data) {
          console.log("\n" + data.replace(/(.*)/g, '    $1').grey);
        });
      }

    }
  }

});