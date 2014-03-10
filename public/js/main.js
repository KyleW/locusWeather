
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

  if (!("autofocus" in document.createElement("input"))) {
    $("#citySearch").focus();
  }

});


