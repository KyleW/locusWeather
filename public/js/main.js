
// Initializies Parse and sets keys. Note: these keys are meant to be public
Parse.initialize('hKFK9auag4BFxC5DETdnFvV4kK4ycL9bzyD4UI7b', '9VsJudzLuZCJxf6cN1GnJ9et8hiePdp2fp9cZlvM');

var app = angular.module('weather', []);

app.controller('main',function($scope, $http) {

  // Methods for getting forecast
  $scope.getForecastByLocation = function(location){
    Parse.Cloud.run('getForecastByLocation', {'location':location}, {
      success: function(result) {
        $scope.locQuery = '';
        if(result.forecast){
          $scope.updateForecast(result);
        } else {
          $scope.alternatives = result.response.results;
          $scope.$apply();
        }
      }, error: function(error) {
      }
    });
  };

  $scope.getForecastByIP = function(clientIP){
    Parse.Cloud.run('getForecastByIP', {'clientIP':clientIP}, {
      success: function(result) {
        $scope.updateForecast(result);
      },
      error: function(error) {
      }
      });
  };

  $scope.updateForecast = function(result){
    $scope.location = result.location;
    $scope.forecast = result.forecast.simpleforecast.forecastday;
    console.log($scope.forecast);
    $scope.calculatePercentSunny($scope.forecast);
    $scope.$apply();
  };

  $scope.calculatePercentSunny = function(forecast){
    var sunnyDays = 0;
    for (var i = 0 ; i < $scope.numDays ; i++) {
      if(forecast[i].skyicon === "sunny"){
        sunnyDays++;
      }
    }
    $scope.percentSunny = (sunnyDays/$scope.numDays)*100;
    $scope.$apply();
  };

  // Handle User Input from form
  $scope.selectCity = function (city){
    $scope.alternatives = null;
    $scope.getForecastByLocation('zmw:'+city.zmw);
  };



  //Sets Default numDays
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

