app.factory('parse', function () {
  // Methods for getting forecast from Wunderground via Parse Cloudcode
  

  // Initializies Parse and sets keys. Note: these keys are meant to be public
  Parse.initialize('hKFK9auag4BFxC5DETdnFvV4kK4ycL9bzyD4UI7b', '9VsJudzLuZCJxf6cN1GnJ9et8hiePdp2fp9cZlvM');

  return {

    getForecastByLocation : function(location,$scope){
      console.log("ran in parse");
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
    },

    getForecastByIP : function(clientIP,$scope){
      Parse.Cloud.run('getForecastByIP', {'clientIP':clientIP}, {
        success: function(result) {
          $scope.updateForecast(result);
        },
        error: function(error) {
        }
        });
    }

  };


});