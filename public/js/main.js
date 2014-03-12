
// Initializies Parse and sets keys. Note: these keys are meant to be public
Parse.initialize("hKFK9auag4BFxC5DETdnFvV4kK4ycL9bzyD4UI7b", "9VsJudzLuZCJxf6cN1GnJ9et8hiePdp2fp9cZlvM");

var app = angular.module('weather', []);

app.controller('main',function($scope, $http) {


  // Methods for getting forecast
  $scope.getForecastByLocation = function(location){
    Parse.Cloud.run('getForecastByLocation', {"location":location}, {
      success: function(result) {
        console.log(result);
        $scope.locQuery ="";
        if(result.forecast){
          $scope.location =result.location;
          $scope.forecast = result.forecast.simpleforecast.forecastday;
        } else {
          $scope.alternatives = result.response.results;
        }
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
        $scope.forecast = result.forecast.simpleforecast.forecastday;
        $scope.$apply();
      },
      error: function(error) {
      }
      });
  };


  // Handle User Input from form
  $scope.selectCity = function (city){
    $scope.alternatives = null;
    $scope.getForecastByLocation('zmw:'+city.zmw);
  };

  $scope.numDays=10;
  //Default Behavior: Get the client IP and Display Default Forecast on load
  $http.jsonp('http://www.telize.com/jsonip?callback=JSON_CALLBACK')
    .success(function(data, status, headers, config) {
      $scope.getForecastByIP(data.ip);
    })
    .error(function(data,status,headers, config){
      console.log(status);
    });

});

