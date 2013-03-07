var chatter = require('chatter');

var chatter_server = new chatter.server({
  port: process.env.PORT || 8000
});