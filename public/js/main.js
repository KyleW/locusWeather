
var app = angular.module('weather', []);

app.controller('main',function($scope, $http, charts, parseMethods) {

  //Updating View
  $scope.updateForecast = function(result){
    if (result.location.country==="US"){
      $scope.location = result.location.city +", "+result.location.state;
    } else {
      $scope.location= result.location.city +", "+result.location.country_name;
    }
    
    $scope.numDays = $scope.numDaysQ;
    $scope.forecast = result.forecast.simpleforecast.forecastday;
    $scope.calculatePercentSunny($scope.forecast);

    charts.buildCharts($scope.forecast, $scope.numDays);

    $scope.$apply();
  };

  $scope.calculatePercentSunny = function(forecast){
    $scope.sunnyDays = 0;
    for (var i = 0 ; i < $scope.numDays ; i++) {
      if(forecast[i].skyicon === "sunny"){
        $scope.sunnyDays++;
      }
    }
    $scope.$apply();
  };

  // Handle User Input from form
  $scope.selectCity = function (city){
    $scope.alternatives = null;
    parse.getForecastByLocation('zmw:'+city.zmw, $scope);
  };


  //CHARTING
  // Docs at: http://www.chartjs.org/docs/



  // Set Defaults
  //Sets Default numDays
  $scope.numDaysQ=10;

  //Default Behavior: Get the client IP and Display Default Forecast on load
  $http.jsonp('http://www.telize.com/jsonip?callback=JSON_CALLBACK')
    .success(function(data, status, headers, config) {
      parse.getForecastByIP(data.ip, $scope);
    })
    .error(function(data,status,headers, config){
      // console.log(status);
    });

});

