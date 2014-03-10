
Parse.initialize("hKFK9auag4BFxC5DETdnFvV4kK4ycL9bzyD4UI7b", "9VsJudzLuZCJxf6cN1GnJ9et8hiePdp2fp9cZlvM");



var userLocation;
var weather;

var getCurrentLoc = function(){
  //TODO: switch to bing API for consistency??

  // Details on API at http://www.telize.com/
  $.getJSON("http://www.telize.com/geoip?callback=?",function(json) {
    console.log(json); //debugging
    userLocation=""+json.latitude+","+json.longitude;
    console.log("userLocation= ",userLocation); //debugging
  });
};


$(document).ready(function(){

  getCurrentLoc();

  Parse.Cloud.run('findKeys', {}, {
  success: function(result) {
    console.log(result);
  },
  error: function(error) {
  }
});

  if (!("autofocus" in document.createElement("input"))) {
    $("#citySearch").focus();
  }

});


