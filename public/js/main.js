
Parse.initialize("hKFK9auag4BFxC5DETdnFvV4kK4ycL9bzyD4UI7b", "9VsJudzLuZCJxf6cN1GnJ9et8hiePdp2fp9cZlvM");

var app = angular.module('weather', []);

app.controller('main',function($scope, $http) {

  $scope.getForecastByLocation = function(){
    Parse.Cloud.run('getForecastByLocation', {"location":"37.8,-122.4"}, {
      success: function(result) {
        $scope.forecast = result.forecast.simpleforecast.forecastday;
        $scope.$apply();
      },
      error: function(error) {
      }
      });
  };

  $scope.getForecastByIP = function(clientIP){
    Parse.Cloud.run('getForecastByIP', {"clientIP":clientIP}, {
      success: function(result) {
        console.log(result);
        $scope.location =result.location;
        // console.log($scope.location.city);
        $scope.forecast = result.forecast.simpleforecast.forecastday;
        $scope.$apply();
      },
      error: function(error) {
      }
      });
  };

  //Default Behavior: Get the client IP and Display Default Forecast
  $http.jsonp('http://www.telize.com/jsonip?callback=JSON_CALLBACK')
    .success(function(data, status, headers, config) {
      $scope.getForecastByIP(data.ip);
  });

});

