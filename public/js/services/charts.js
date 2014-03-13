app.factory('charts', function () {

    // Docs at: http://www.chartjs.org/docs/

    var updateTempChart =function(labels,highData, lowData){
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

  var updateRainChart =function(labels,rainData){
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

  return {
    buildCharts: function(forecast,numDays){
      var labels=[];
      var highData=[];
      var lowData=[];
      var rainData=[];

      for(var i = 0; i < numDays; i++){
        labels.push(forecast[i].date.monthname+" "+forecast[i].date.day);
        highData.push(forecast[i].high.fahrenheit);
        lowData.push(forecast[i].low.fahrenheit);
        rainData.push(forecast[i].qpf_allday.in);
      }

      updateTempChart(labels, highData, lowData);
      updateRainChart(labels,rainData);
    }


  };


});