
Parse.initialize("hKFK9auag4BFxC5DETdnFvV4kK4ycL9bzyD4UI7b", "9VsJudzLuZCJxf6cN1GnJ9et8hiePdp2fp9cZlvM");

var userLocation;
var weather;

var getCurrentLoc = function(){
  //TODO: switch to bing API for consistency??
  // Details on API at http://www.telize.com/
  $.getJSON("http://www.telize.com/geoip?callback=?",function(json) {
    return json; //debugging
    // userLocation=""+json.latitude+","+json.longitude;
    // console.log("userLocation= ",userLocation); //debugging
  });
};


var getForecast = function(location){
  Parse.Cloud.run('getForecast', {location:"37.8,-122.4"}, {
    success: function(result) {
      console.log(result);
    },
    error: function(error) {
    }
  });
};


////////////////////////////////////////////

$(document).ready(function(){
  if (!("autofocus" in document.createElement("input"))) {
    $("#citySearch").focus();
  }

});

getCurrentLoc();
searchForLoc("2124 Mckinley Ave, Berkeley");
getForecast();


// DEBUGGING
var searchForLoc = function(location){
  Parse.Cloud.run('lookupCoordinates', {"location":location}, {
    success: function(result) {
      console.log(result);
    },
    error: function(error) {
    }
  });
};



var test = function (){
  Parse.Cloud.run('lookupCoordinates', {location:"2124 Mckinley Ave, Berkeley"}, {
    success: function(result) {
      return result;
    },
    error: function(error) {
    }
  });
};
