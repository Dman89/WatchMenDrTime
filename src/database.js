'use strict';
var mongoose = require('mongoose');
var server = process.env.DB || 'mongodb://localhost/WatchManDrTime';
mongoose.connect(server, function(err) {
  if (err) {
    console.log("Error Connecting");
  } else {
    console.log('Connected to MongoDB!\nDaniel,\nWhat are you focusing on?\nWhat does it mean?\nWhat are you gonna do?')
  }
})
