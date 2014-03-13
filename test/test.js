describe('app', function() {

  beforeEach(function(){
    angular.mock.module('weather');
  });

  // describe("Controller", function() {

  //   it('updateForecast', function() {
  //     expect(userLocation).to.be.a('string');
  //   });

  //   it('countSunnyDays', function() {
  //     expect(userLocation).to.be.a('string');
  //   });


  // });

  // describe("Parse", function() {

  //   it('getForecastByLocation', function() {
  //     // expect(userLocation).to.be.a('string');
  //   });

  //   it('getForecastByIP', function() {
  //     // expect(userLocation).to.be.a('string');
  //   });

      
  // });


  describe("Charts", function() {
    beforeEach(
      angular.mock.inject(function($rootScope, $controller){
      scope = $rootScope.$new();                //create an empty scope
      $controller('charts', {$scope: scope});  //declare the controller and inject our empty scope
    }));

    it('buildCharts', function() {
      var oldTemp = document.getElementById("tempChart");
      var oldRain = document.getElementById("rainChart");
      chart.buildCharts();
      var newTemp = document.getElementById("tempChart");
      var newRain = document.getElementById("rainChart");
      expect(oldTemp).to.not.equal(newTemp);
    });

      
  });
});


// describe("Lookup IP on load", function() {
//   // beforeEach(function() {
//   //   getCurrentLoc();
//   // });
//   // // afterEach(function() {
//   // // });
 

//   // it('should change userLocation to an array with a latitude and longitude', function() {
//   //   expect(userLocation).to.be.a('string');
//   // });

    
// });