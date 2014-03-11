
Parse.initialize("hKFK9auag4BFxC5DETdnFvV4kK4ycL9bzyD4UI7b", "9VsJudzLuZCJxf6cN1GnJ9et8hiePdp2fp9cZlvM");

var app = angular.module('weather', []);

app.controller('main',function($scope, $http) {
  // TODO: CHANGE THIS TO GRAB IP BY DEFAULT
  $scope.query = "San Francisco";
  $http({
    method: 'JSONP',
    url: 'http://www.telize.com/geoip?callback=?',
  }).success(function(data, status) {
    $scope.userLocation=data;
  }).error(function(data, status) {
    // Some error occurr
  });
  
  // $scope.$watch($scope.forecast);
  $scope.getForecast = function(){
    Parse.Cloud.run('getForecast', {"location":"37.8,-122.4"}, {
      success: function(result) {
        $scope.forecast = result.forecast.simpleforecast.forecastday;
        $scope.$apply();
      },
      error: function(error) {
      }
      });
  };

  // $scope.$apply($scope.getCurrentLoc());

  $scope.getForecast();

});





////////////////////////////////////////////


// var renderForecast = function(newForecast){
//   $forecast = $('#forecast').text('');
//   for(var i = 0; i < newForecast.length ; i++){
//     var day = newForecast[i];
//     $('<div class="forecastDay"></div>')
//       .append('<div class="date">'+day.date.pretty+'</div>')
//       .append('<div class="high"> High:'+day.high.fahrenheit+'</div>')
//       .append('<div class="low">Low:'+day.low.fahrenheit+'</div>')
//       .appendTo($forecast);
//   }
// };

// var renderForecastDay = function(){

// };


// // DEBUGGING
// var searchForLoc = function(location){
//   Parse.Cloud.run('lookupCoordinates', {"location":location}, {
//     success: function(result) {
//       console.log(result);
//     },
//     error: function(error) {
//     }
//   });
// };



// var test = function (){
//   Parse.Cloud.run('lookupCoordinates', {location:"2124 Mckinley Ave, Berkeley"}, {
//     success: function(result) {
//       return result;
//     },
//     error: function(error) {
//     }
//   });
// };


// getCurrentLoc();
// searchForLoc("2124 Mckinley Ave, Berkeley");
// getForecast();

