
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

Parse.Cloud.define("lookupCoordinates", function(request, response) {
  Parse.Cloud.httpRequest({
    url: 'http://dev.virtualearth.net/REST/v1/Locations/',
    params: {
      q : request.params.location,
      key: keys.bingMapsKey
    },
    success: function(httpResponse) {
      response.success(JSON.parse(httpResponse.text).resourceSets[0].resources);
    },
    error: function(httpResponse) {
      response.error('Request failed with response code ' + httpResponse.status);
      // console.error('Request failed with response code ' + httpResponse.status);
    }
  });
});


Parse.Cloud.define("getForecast", function(request, response) {
  Parse.Cloud.httpRequest({
    url: 'http://dev.virtualearth.net/REST/v1/Locations/',
    params: {
      q : request.params.location,
      key: keys.wundergroundKey
    },
    success: function(httpResponse) {
      response.success(JSON.parse(httpResponse.text).resourceSets[0].resources);
    },
    error: function(httpResponse) {
      response.error('Request failed with response code ' + httpResponse.status);
      // console.error('Request failed with response code ' + httpResponse.status);
    }
  });
});
