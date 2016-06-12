var jwt = require('jsonwebtoken');
var app = require('../../../server');
var request = require('supertest')(app);
var config = require('../../../config/config');
var User = require('../../../app/models/user.model.js');

var user;

describe('User route test', function() {
	user = {
		username: 'kylebroflovski',
		firstname: 'kyle',
		lastname: 'broflovski',
		email: 'kylebroflovski@gmail.com',
		password: 'kylebroflovski',
		phoneNo: 08097988778,
		address: 'no 2 alara street yaba lagos'
	};

	it('should ensure a user with complete details can sign up', function(done) {
		request.post('/api/user/signup')
		.send(user)
		.expect(200)
		.end(function(err) {
			expect(err).toBe(null);
			done();
		});
	});

	it('should ensure a duplicate user isnt registered', function(done) {
		request.post('/api/user/signup')
		.send(user)
		.expect(401)
		.end(function(err, res) {
			expect(res.body).toEqual(jasmine.objectContaining({
        success: false,
        message: 'Username Already Exists!'
      }));
			done();
		});
	});

	it('should ensure a user with undefined username isnt registered', function(done) {
		user = {username: undefined};
		request.post('/api/user/signup')
		.send(user)
		.expect(401)
		.end(function(err, res) {
			expect(res.body).toEqual(jasmine.objectContaining({
        success: false,
        message: 'Please fill the required field(s)!'
      }));
			done();
		});
	});

	it('should ensure a user with undefined firstname isnt registered', function(done) {
		user = {firstname: undefined};
		request.post('/api/user/signup')
		.send(user)
		.expect(401)
		.end(function(err, res) {
			expect(res.body).toEqual(jasmine.objectContaining({
        success: false,
        message: 'Please fill the required field(s)!'
      }));
			done();
		});
	});

	it('should ensure a user with undefined lastname isnt registered', function(done) {
		user = {lastname: undefined};
		request.post('/api/user/signup')
		.send(user)
		.expect(401)
		.end(function(err, res) {
			expect(res.body).toEqual(jasmine.objectContaining({
        success: false,
        message: 'Please fill the required field(s)!'
      }));
			done();
		});
	});

	it('should ensure a user with undefined email isnt registered', function(done) {
		user = {email: undefined};
		request.post('/api/user/signup')
		.send(user)
		.expect(401)
		.end(function(err, res) {
			expect(res.body).toEqual(jasmine.objectContaining({
        success: false,
        message: 'Please fill the required field(s)!'
      }));
			done();
		});
	});

	it('should ensure a user with undefined password isnt registered', function(done) {
		user = {password: undefined};
		request.post('/api/user/signup')
		.send(user)
		.expect(401)
		.end(function(err, res) {
			expect(res.body).toEqual(jasmine.objectContaining({
        success: false,
        message: 'Please fill the required field(s)!'
      }));
			done();
		});
	});

	it('should ensure a user with undefined phone no isnt registered', function(done) {
		user = {phoneNo: undefined};
		request.post('/api/user/signup')
		.send(user)
		.expect(401)
		.end(function(err, res) {
			expect(res.body).toEqual(jasmine.objectContaining({
        success: false,
        message: 'Please fill the required field(s)!'
      }));
			done();
		});
	});

	it('should ensure a registered user can login', function(done) {
		user = {
			username: 'kylebroflovski',
			password: 'kylebroflovski'
		};
		request.post('/api/user/login')
		.send(user)
		.expect(200)
		.end(function(err) {
			expect(err).toBe(null);
			done();
		});
	});

	it('should ensure a user with incorrect username cant login', function(done) {
		user = {
			username: 'kylemarsh',
			password: 'kylebroflovski'
		};
		request.post('/api/user/login')
		.send(user)
		.expect(401)
		.end(function(err, res) {
			expect(res.body).toEqual(jasmine.objectContaining({
        success: false,
        message: 'Invalid Username or Password!'
      }));;
			done();
		});
	});

	it('should ensure a user with incorrect password cant login', function(done) {
		user = {
			username: 'kylebroflovski',
			password: 'kylemarsh'
		};
		request.post('/api/user/login')
		.send(user)
		.expect(401)
		.end(function(err, res) {
			expect(res.body).toEqual(jasmine.objectContaining({
        success: false,
        message: 'Invalid Username or Password!'
      }));;
			done();
		});
	});

});

var token;

describe('User route test', function() {

  beforeEach(function(done) {
    token = jwt.sign(user, config.secret, {
      expiresIn: 1440
    });
    done();
  });

  it('should return the details of a user with token', function(done) {
    request.get('/api/user/kylebroflovski')
    .set('x-access-token', token)
    .expect(200)
    .end(function(err) {
      expect(err).toBe(null);
      done();
    });
  });

  it('should not return the details of a user without token', function(done) {
    request.get('/api/user/kylebroflovski')
    .expect(403)
    .end(function(err, res) {
      expect(res.body).toEqual(jasmine.objectContaining({
        success: false,
        message: 'Signup or Login.'
      }));
      done();
    });
  });

  it('should edit the details of a user with token', function(done) {
    user = {
      username: 'kylemarsh'
    };
    request.put('/api/user/kylebroflovski')
    .set('x-access-token', token)
    .expect(200)
    .send(user)
    .end(function(err) {
      expect(err).toBe(null);
      done();
    });
  });

  it('should delete a user', function(done) {
    request.delete('/api/user/kylemarsh')
    .set('x-access-token', token)
    .expect(200)
    .end(function(err) {
      expect(err).toBe(null);
      done();
    });
  });

});