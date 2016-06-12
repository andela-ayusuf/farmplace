var app = require('../../../server');
var request = require('supertest')(app);

describe('Server test', function() {
  it('should respond on connection', function(done) {
    request.get('/')
    .expect(200)
    .end(function(err) {
      expect(err).toBe(null)
      done();
    });
  });
});