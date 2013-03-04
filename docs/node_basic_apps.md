# Node Basic Apps

### CLI Apps
Node may not be the first thing many people think of when writing a basic CLI script or app, but it actually works quite well. Node is able to access all of the arguments passed in through CLI using the `process.argv` array. The first two items are always node itself and the path of the script being executed. You can easily slice off these elements to get just an array of the rest of the arguments passed in. In a production app with the need for arguments and flags, I would recommend using the [Commander.js](https://github.com/visionmedia/commander.js/) node module.

A couple of other things to keep in mind. You have access to the environment variables through `process.env`. You also have access to the current working directory through `process.cwd()` which is different than `__dirname` that will give you the directory where the script resides.

One interesting function node gives you is the ability to watch files. You can put a listener on a file with a callback function that will be called anytime the file is updated. A common area where I've used this is for auto reloading my Node app on file changes. You could also do custom parsing of files on change for things like CSS preprocessing or client side Javascript compiling.

Node has become my go-to language for writing scripts now as Javascript is just much more natural to write than something like a bash script. I'll also use Python at times, but I don't use Python as much so I'm not as comfortable in it.

  CLI DEMO
    * Calculator
    * File Explorer



### Express Apps
Express.js is one of the main frameworks in use today for building web apps in Node and was built on top of connect. Express handles the http requests that come into node as well as all of the framework that needs to accompany a web app like routing and html views.



### Restfuljs Apps

