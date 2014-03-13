
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

    $scope.buildCharts($scope.forecast);

    $scope.$apply();
  };




  $scope.calculatePercentSunny = function(forecast){
    $scope.sunnyDays = 0;
    for (var i = 0 ; i < $scope.numDays ; i++) {
      if(forecast[i].skyicon === "sunny"){
        $scope.sunnyDays++;
      }
    }
    // $scope.percentSunny = (sunnyDays/$scope.numDays)*100;
    $scope.$apply();
  };

  // Handle User Input from form
  $scope.selectCity = function (city){
    $scope.alternatives = null;
    $scope.getForecastByLocation('zmw:'+city.zmw);
  };


  //CHARTING
  // Docs at: http://www.chartjs.org/docs/

  $scope.buildCharts = function(forecast){
    var labels=[];
    var highData=[];
    var lowData=[];
    var rainData=[];

    for(var i = 0; i < $scope.numDays; i++){
      labels.push(forecast[i].date.monthname+" "+forecast[i].date.day);
      highData.push(forecast[i].high.fahrenheit);
      lowData.push(forecast[i].low.fahrenheit);
      rainData.push(forecast[i].qpf_allday.in);
    }

    $scope.updateTempChart(labels, highData, lowData);
    $scope.updateRainChart(labels,rainData);
  };

  $scope.updateTempChart =function(labels,highData, lowData){
    var data = {
      "labels":labels,
          datasets : [
          {
            fillColor : "rgba(181,125,178,0.5)",
            strokeColor : "rgba(181,125,178,1)",
            pointColor : "rgba(181,125,178,1)",
            pointStrokeColor : "#fff",
            data : highData
          },
          {
            fillColor : "rgba(151,187,205,0.5)",
            strokeColor : "rgba(151,187,205,1)",
            pointColor : "rgba(151,187,205,1)",
            pointStrokeColor : "#fff",
            data : lowData
          }
        ]
    };

    var ctx = document.getElementById("tempChart").getContext("2d");
    var tempChart = new Chart(ctx).Line(data);
  };

  $scope.updateRainChart =function(labels,rainData){
    var data = {
      "labels":labels,
          datasets : [
          {
            fillColor : "rgba(181,125,178,0.5)",
            strokeColor : "rgba(181,125,178,1)",
            pointColor : "rgba(181,125,178,1)",
            pointStrokeColor : "#fff",
            data : rainData
          }
        ]
    };

    var ctx = document.getElementById("rainChart").getContext("2d");
    var rainChart = new Chart(ctx).Line(data);
  };

  

  // Set Defaults
  //Sets Default numDays
  $scope.numDaysQ=10;

  //Default Behavior: Get the client IP and Display Default Forecast on load
  $http.jsonp('http://www.telize.com/jsonip?callback=JSON_CALLBACK')
    .success(function(data, status, headers, config) {
      $scope.getForecastByIP(data.ip);
    })
    .error(function(data,status,headers, config){
      // console.log(status);
    });

});

