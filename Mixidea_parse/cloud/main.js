
require('cloud/create_event.js');
require('cloud/participate_event.js');
require('cloud/cancel_event.js');

// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

