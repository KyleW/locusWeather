
describe("App, Controller and Services are Present:", function() {

  var module;
  before(function() {
    app = angular.module("weather");
  });

// APP

  it("should be registered", function() {
    expect(app).not.to.equal(null);
  });


// CONTROLLER

  describe("main controller",function(){
    it('should load', function() {
      expect(app.main).not.to.equal(null);
    });
  });


// SERVICES

  describe("parse service",function(){
    it('should load', function() {
      inject(function($parse) {
        expect($parse).not.to.equal(null);
      });
    });

    it('should have a working service that gets a forecst by IP and location',
      inject(['$parse',function($parse) {
        expect($parse.getForecastByIp).not.to.equal(null);
        expect($parse.getForecastByLocation).not.to.equal(null);
    }]));
  });


  describe("charts service",function(){
    it('should load', function() {
      inject('$charts',function($charts) {
        expect($charts).not.to.equal(null);
      });
    });

    it('should have a working service that builds Charts',
      inject(['$charts',function($charts) {
        expect($charts.buildCharts).not.to.equal(null);
    }]));

    it('should update the charts on the page when build charts is called',
      inject(['$charts',function($charts) {
        // expect($charts.buildCharts).not.to.equal(null);
    }]));
  });

// CLOUDCODE

});
