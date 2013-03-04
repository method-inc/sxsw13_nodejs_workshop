var fs = require('fs'),
    colors = require('colors');


fs.readdir(process.cwd(), function(err, files) {

  console.log('');

  if (!files.length) {
    return console.log("    No files to show!\n".red);
  }

  console.log("    Select which file or directory you would like to see\n");

  function file(i) {

  }


  console.log(files);
});