# Node Concepts

## Why node?
Node.js represents a major departure from most web technologies in that all IO operations are handled asynchronously. I'll go into more details on some specific instances later, but the idea is that anytime an IO operation is performed (such as DB operations or file system access) the operation will be performed asynchronously. This means while the application is waiting to get the results from that call, it can continue handling other requests and performing other tasks. This is a key aspect of the desirability of a Node.js application.

Speed is another quality generally talked about and is a byproduct of both V8 being a really fast engine and the asynchronous nature of Node apps because of the event loop. It's not hard to look around and see amazing benchmarks when Node is being included.

Scaling will also come up quite often when discussing the merits of Node. The primary benefit of this is that every Node web app is a self contained web server doing everything from handling the http requests to serving up the output. This means there is no bottleneck. Everything doesn't have to go through a separate server like Apache which then has to pass it off to a new process in whichever language handles the request.

Another personal reason to use it for myself is the abundance of tools and other things that make my life easier when developing. I use Jade and Stylus exclusively and they have been updated and improved regularly and they integrate seamlessly into my apps. The servers also start up and run extremely fast. Whether it's running unit tests or deploying code to a production environment and causing a restart, the startup time in almost imperceptible. I could ssh into a production server and continuously restart the app and unless the app was extremely busy it's barely noticeable to the end user. We had an app that connected hundreds of mobile devices in real time that got a bug right before we used it for the first time in production. We just calmly restarted the app and sometimes servers (we had two being load balanced) and nobody knew the difference.

An additional reason I love Node.js is that it introduced me to MongoDB and the world of NoSQL. Working in this DB environment has been awesome and makes me cringe anytime I have to go back to a SQL database and write migrations and join queries. Being able to work with Javascript both in the queries and stored objects makes things so much nicer to deal with in most instances.

Another huge benefit is that it's just Javascript. This means that there is a wealth of knowledge for any kind of problem you may have. Any Javascript can be used. Something like JQuery may not have much use on the server side (unless you're parsing html), but libraries like underscore are very helpful and it even has a dedicated node module that be installed with a package manager. Async is another useful library and can help with managing asynchronous work flows.



## Single process and memory state
A concept that can trip up new users to Node is the shared memory state. Essentially, the same code is being used to handle each request that comes through and state is saved along the way. This is different than a language like PHP or Ruby where each request essentially gets a fresh sandbox copy of the code, which is why databases are so important as a store for them. In Node, you could keep an array or object that essentially acts as a cache for future requests to save processing time, though keep in mind the state will be lost when the server stops. You have be careful you aren't accidentally modifying objects that will be used by another request and really pay attention to your scoping. It isn't difficult, just something many developers aren't used to paying attention to.

This single process also means that there isn't really any concurrency in Node in the typical way you would think. You can spawn additional separate apps for each CPU, but they won't share their memory state. In typical languages this would be a recipe for slowness, but because Node is able to handle small tasks very quickly and slow tasks are run asynchronously the app never gets bogged down. It's able to move through the call stack very quickly.

The shared state gives access to a couple of global scopes, *global* and *process*. *Global* is similar to Window in the browser environment in that it is basically the highest function scope of the application and everything else receives the variables from that scope. *Process* encompasses *global* and is the entire running environment of the app. This gives the application access to it's outside environment with things like CLI args bash environment variables.



## Event Loop
Everything in Node runs on the event loop. When a function is called it is added to the call stack and handled as the event loop gets to it. In the basic sense this is similar to a synchronous language if we also handled IO calls the same way they do. However, functions have the option of adding something to the stack for later processing, either on the next iteration or later. The event loop is then able to continue handling items in the call stack instead of waiting for that task to finish. When the task finishes, its callback is added to the stack and handled appropriately.

Node uses event emitters extensively and exposes that functionality through the process.EventEmitter API. You can take advantage of this by setting up emitters and listeners to many things in your app. Streams are a common concept in node that take advantage of events heavily. If Node were to wait for a data stream to finish, it would hold up the event loop and slow down the app. Instead, it emits events such as "data" and "end" and you can listen for these events and handle them as you wish.

The key takeaway to this is to realize the ramifications of holding up the event loop. Any intensive calculations that run synchronously are delaying any other processing from taking place and therefore ridding you of all the benefits that Node gives you.




## Handling Errors and Stack Traces
Because of the way the call stack and event loop work, it's very important to handle errors appropriately at every step of the way. If an error is uncaught, it causes an uncaught exception. Because the system has no way of knowing if the state of the app is valid at this point, the uncaught exception error will be thrown and the application will be halted.

The asynchronous nature of Node can make these errors tricky to deal with. For example, in a synchronous application, the call stack will be a traceable series of calls that lead to the error. In Node, an asynchronously called function will not be next to it's contextual elements when it is called and the stack trace will be invalid and not even show in the error message. Another thing to realize is that a try-catch statement doesn't work on async functions. Once the initial function call finishes and allows the event loop to continue, it will move through the try-catch block and continue on. If that function throws an exception on a later iteration of the event loop, that catch statement is not around anymore to catch it. It's because of this that Node relies heavily on asynchronous methods of getting these events.




## Callback pattern standards
The standard way for native Node methods, and many libraries, to handle errors is with a standard callback function argument signature. There are two arguments, the first always being the error and the second the result of the function. Therefore, you want to check this error argument anytime you call and async function so that an uncaught exception isn't thrown and you can accurately handle the error without bringing down the entire app.

Another issue that arises with many new Node devs is they end up with huge "pyramids" of code. They end up with a function that calls an async function, which then checks for errors with an if/else statement, which then calls another async function and so forth. You can very quickly end up with what we like to call the "pyramid of doom." There are a couple ways we combat this temptation. One way is to use an early return statement on errors, which removes the requirement of an "else" block, therefore removing one level of the pyramid for each call. Another way is to use a control flow pattern or library that allows you to list the functions in order with a final callback that handles any errors throughout the other calls and receives a final resulting object.

The best way to handle this tangle of functions is just to be very cognizant of this tendency when planning your code. I've found that this comes almost naturally with experience if the developer is aware of it.




## Events and Promises
Another way to handle errors is with events and promises. In early versions, Node used promises extensively with many of its native methods. They have since moved to the callback standard, but promises remain a popular alternative to many things and there are libraries out there that will help you use any function, even native methods, with promises. Personally, I don't use them much as I like the consistency of just doing things the same way Node does them. There will be times when it is much easier and cleaner to use an event driven system of catching and throwing errors. This is common when there may be many listeners that need to know about an error's occurrence so that it can be handled cleanly.



## Streams
These can be used to setup streams of data in or out. For example, write streams could be used for things like continuous writes to the local file system for something like logging.  A read stream could be used for downloading or reading in a large file, especially if you are able to process the file in chunks as they are received instead of waiting for full file to read in. A nice use case is setting up custom reporting for file upload percentages. In the past, you've generally had to resort to something like Flash for this. However, You can track the data coming in and compare it to the expected size of the file to easily report back the percentage uploaded so far for the user.



## Node Modules
Node modules are key to Node's usefulness as many different types of apps and servers. All of Node's native methods are handled as modules, such as the net and fs modules which give the app access to many methods contained within them. For those familiar with Rails, Node's modules are similar to gems in Ruby. Modules are really a requirement for a server application written in Javascript which would have an extremely cluttered global namespace if libraries were handled like client side Javascript where each library offered a global accessor variable (think JQuery or $).

NPM is the package manager used to handle the many 3rd party modules your app may need. You create a package.json file in the root of your app and simply run 'npm install' and npm will download and, as needed, compile all required modules. Each of those modules will also have a package.json file that will specify it's own required modules as well as meta data like name and version. NPM will also install all of the dependent modules for those as well until every module has all of its dependents available. These will all be installed in the mode_modules directory in the root of your app.

To use any of the modules installed with npm or any of Node's native modules, simple use the require function using the name of the module as the only argument. You'll generally assign the return of that require statement to a variable which you can then use to call any of the methods available from the module.

You can also build your own modules, whether large or small, in your app and use require to access their methods as well. The only difference is you need to include the relative path to the main module file when requiring the module. Every module that is accessed via require has a module and exports property globally available to them. The exports object will be what is return to the code that is requiring them. The exports property is actually just an object on the module property, so if you'd rather return a function you can overwrite the exports object with it. This is a common way of exporting constructors on a class.

Some modules can even include a binary that can accessed through the CLI. When installing these modules, is the global flag to make them accessible throughout your environment. Express, a popular web framework, is one that also includes simple app generators that you can use of you install is globally.

When looking at modules to use, there are many things you need to consider. One of the first things I look at is the age of the library and more specifically when was it last updated. Node has been going through versions rapidly and a module that hasn't been updated for a year may be many versions old and may not even be compatible with current versions of Node and NPM. I also like to look at the Github page for the module and look at things like the reported issues. This tells me how active and responsive the contributors are to real user's issues as well as changes to Node versions and standards. I'll also consider the type of library it is when looking at it's activity. If its a library dealing with Dates or Numbers it may be stable already and not need a lot of upkeep.