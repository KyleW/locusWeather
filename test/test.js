
describe("App, Controller and Services are Present:", function() {

  var module;
  before(function() {
    app = angular.module("weather");
  });

  it("should be registered", function() {
    expect(app).not.to.equal(null);
  });

  describe("main controller",function(){
    it('should load', function() {
      expect(app.main).not.to.equal(null);
    });
  });

  describe("parse service",function(){
    it('should load', function() {
      inject(function($parse) {
        expect($parse).not.to.equal(null);
      });
    });
    
    it('should have a working service that gets a forecst by IP',
      inject(['$parse',function($parse) {
        
        var sizes = $yt.resize(w,h,mw,mh);
        expect(sizes.length).to.equal(2);
        expect(sizes[0]).to.equal(50);
        expect(sizes[1]).to.equal(50);
    }]));

  });

  describe("charts service",function(){
    it('should load', function() {
      inject(function($charts) {
        expect($charts).not.to.equal(null);
      });
    });
  });
});
