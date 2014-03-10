
describe("Parse", function() {
  beforeEach(function() {
  });
  afterEach(function() {
  });
 

  it('hello function should return Hello world!', function() {
    Parse.Cloud.run('hello', {}, {
      success: function(result) {
        expect(result).to.equal("Hello world!");
      }
    });
  });

  it('should be able to find api keys', function() {
    Parse.Cloud.run('findKeys', {}, {
      success: function(result) {
        expect(result).to.equal("Found the keys");
      }
    });
  });
    
});