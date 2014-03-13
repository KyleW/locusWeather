
app.controller('main',function($scope, $http, charts, parse) {

  $scope.updateForecast = function(result){
    $scope.forecast = result.forecast.simpleforecast.forecastday;
    $scope.numDays = $scope.numDaysQ;

    charts.buildCharts($scope.forecast, $scope.numDays);

    if (result.location.country==="US"){
      $scope.location = result.location.city +", "+result.location.state;
    } else {
      $scope.location= result.location.city +", "+result.location.country_name;
    }
    $scope.countSunnyDays($scope.forecast);
    $scope.$apply();
  };

  $scope.countSunnyDays = function(forecast){
    $scope.sunnyDays = 0;
    for (var i = 0 ; i < $scope.numDays ; i++) {
      if(forecast[i].skyicon === "sunny"){
        $scope.sunnyDays++;
      }
    }
    $scope.$apply();
  };

  //for ng-click to work
  $scope.getForecastByLocation = function(location){
    parse.getForecastByLocation(location,$scope);
  };


  // Handle User Input from form
  $scope.selectCity = function (city){
    $scope.alternatives = null;
    $scope.getForecastByLocation('zmw:'+city.zmw);
  };

  // ON LOAD

  //sets Default numDays
  $scope.numDaysQ=10;

  //Get the client IP and display forecast for that location
  $http.jsonp('http://www.telize.com/jsonip?callback=JSON_CALLBACK')
    .success(function(data, status, headers, config) {
      parse.getForecastByIP(data.ip, $scope);
    })
    .error(function(data,status,headers, config){
      // console.log(status);
    });

});
