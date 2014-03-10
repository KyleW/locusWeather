
var keys = require('cloud/keys.js');

// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});


Parse.Cloud.define("findKeys", function(request, response) {
  if(keys.wundergroundKey && keys.bingMapsKey){
    response.success("Found the keys");
  }
  else {
    response.success("Keys are missing");
  }

});