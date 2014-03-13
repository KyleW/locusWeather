
var keys = require('cloud/keys.js');

Parse.Cloud.define("getForecastByIP", function(request, response) {
  Parse.Cloud.httpRequest({
    url: 'http://api.wunderground.com/api/'+keys.wundergroundKey+'/geolookup/forecast10day/q/autoip.json?geo_ip='+request.params.clientIP,
    success: function(httpResponse) {
      response.success(httpResponse.data);
    },
    error: function(httpResponse) {
      response.error(httpResponse.status);
    }
  });
});


Parse.Cloud.define("getForecastByLocation", function(request, response) {
  var location= encodeURIComponent(request.params.location);
  Parse.Cloud.httpRequest({
    url: 'http://api.wunderground.com/api/'+keys.wundergroundKey+'/geolookup/forecast10day/q/'+location+'.json',
    success: function(httpResponse) {
      response.success(httpResponse.data);
    },
    error: function(httpResponse) {
      response.error(httpResponse);
    }
  });
});
