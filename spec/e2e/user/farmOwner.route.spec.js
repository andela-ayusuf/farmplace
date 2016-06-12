var jwt = require('jsonwebtoken');
var app = require('../../../server');
var request = require('supertest')(app);
var config = require('../../../config/config');
var FarmOwner = require('../../../app/models/farmOwner.model.js');

var farmOwner;

describe('FarmOwner route test', function() {
	farmOwner = {
		firstname: 'eric',
		lastname: 'cartman',
		email: 'ericcartman@gmail.com',
		phoneNo: 08097988678,
		password: 'ericcartman',
		farmName: 'ericcartman farms',
		agricType: 'mixed',
		numOfEmployees: 12,
		address: 'no 2 community road, akoka',
		state: 'lagos',
		website: 'www.ericcartman.com'
	};

	it('should ensure a farm owner with complete details can sign up', function(done) {
		request.post('/api/farmOwner/signup')
		.send(farmOwner)
		.expect(200)
		.end(function(err) {
			expect(err).toBe(null);
			done();
		});
	});

	it('should ensure farm owner with duplicate details isnt signed up', function(done) {
		request.post('/api/farmOwner/signup')
		.send(farmOwner)
		.expect(401)
		.end(function(err, res) {
			expect(res.body).toEqual(jasmine.objectContaining({
        success: false,
        message: 'Farm Name Already Exists!'
      }));
			done();
		});
	});

	it('should ensure a farm owner with undefined firstname isnt registered', function(done) {
		farmOwner = {firstname: undefined};
		request.post('/api/farmOwner/signup')
		.send(farmOwner)
		.expect(401)
		.end(function(err, res) {
			expect(res.body).toEqual(jasmine.objectContaining({
        success: false,
        message: 'Please fill the required field(s)!'
      }));
			done();
		});
	});

	it('should ensure a farm owner with undefined lastname isnt registered', function(done) {
		farmOwner = {lastname: undefined};
		request.post('/api/farmOwner/signup')
		.send(farmOwner)
		.expect(401)
		.end(function(err, res) {
			expect(res.body).toEqual(jasmine.objectContaining({
        success: false,
        message: 'Please fill the required field(s)!'
      }));
			done();
		});
	});

	it('should ensure a farm owner with undefined email isnt registered', function(done) {
		farmOwner = {email: undefined};
		request.post('/api/farmOwner/signup')
		.send(farmOwner)
		.expect(401)
		.end(function(err, res) {
			expect(res.body).toEqual(jasmine.objectContaining({
        success: false,
        message: 'Please fill the required field(s)!'
      }));
			done();
		});
	});

	it('should ensure a farm owner with undefined phone number isnt registered', function(done) {
		farmOwner = {phoneNo: undefined};
		request.post('/api/farmOwner/signup')
		.send(farmOwner)
		.expect(401)
		.end(function(err, res) {
			expect(res.body).toEqual(jasmine.objectContaining({
        success: false,
        message: 'Please fill the required field(s)!'
      }));
			done();
		});
	});

	it('should ensure a farm owner with undefined password isnt registered', function(done) {
		farmOwner = {password: undefined};
		request.post('/api/farmOwner/signup')
		.send(farmOwner)
		.expect(401)
		.end(function(err, res) {
			expect(res.body).toEqual(jasmine.objectContaining({
        success: false,
        message: 'Please fill the required field(s)!'
      }));
			done();
		});
	});

	it('should ensure a farm owner with undefined farm name isnt registered', function(done) {
		farmOwner = {farmName: undefined};
		request.post('/api/farmOwner/signup')
		.send(farmOwner)
		.expect(401)
		.end(function(err, res) {
			expect(res.body).toEqual(jasmine.objectContaining({
        success: false,
        message: 'Please fill the required field(s)!'
      }));
			done();
		});
	});

	it('should ensure a farm owner with undefined agric type isnt registered', function(done) {
		farmOwner = {agricType: undefined};
		request.post('/api/farmOwner/signup')
		.send(farmOwner)
		.expect(401)
		.end(function(err, res) {
			expect(res.body).toEqual(jasmine.objectContaining({
        success: false,
        message: 'Please fill the required field(s)!'
      }));
			done();
		});
	});

	it('should ensure a farm owner with undefined number of employees isnt registered', function(done) {
		farmOwner = {numOfEmployees: undefined};
		request.post('/api/farmOwner/signup')
		.send(farmOwner)
		.expect(401)
		.end(function(err, res) {
			expect(res.body).toEqual(jasmine.objectContaining({
        success: false,
        message: 'Please fill the required field(s)!'
      }));
			done();
		});
	});

	it('should ensure a farm owner with undefined address isnt registered', function(done) {
		farmOwner = {address: undefined};
		request.post('/api/farmOwner/signup')
		.send(farmOwner)
		.expect(401)
		.end(function(err, res) {
			expect(res.body).toEqual(jasmine.objectContaining({
        success: false,
        message: 'Please fill the required field(s)!'
      }));
			done();
		});
	});

	it('should ensure a farm owner with undefined state isnt registered', function(done) {
		farmOwner = {state: undefined};
		request.post('/api/farmOwner/signup')
		.send(farmOwner)
		.expect(401)
		.end(function(err, res) {
			expect(res.body).toEqual(jasmine.objectContaining({
        success: false,
        message: 'Please fill the required field(s)!'
      }));
			done();
		});
	});

	it('should ensure a registered farm owner can login', function(done) {
		farmOwner = {
			email: 'ericcartman@gmail.com',
			password: 'ericcartman'
		};
		request.post('/api/farmOwner/login')
		.send(farmOwner)
		.expect(200)
		.end(function(err) {
			expect(err).toBe(null);
			done();
		});
	});

	it('should ensure a user with incorrect email cant login', function(done) {
		farmOwner = {
			email: 'ericmccormick@gmail.com',
			password: 'ericcartman'
		};
		request.post('/api/farmOwner/login')
		.send(farmOwner)
		.expect(401)
		.end(function(err, res) {
			expect(res.body).toEqual(jasmine.objectContaining({
        success: false,
        message: 'Invalid Email or Password!'
      }));;
			done();
		});
	});

	it('should ensure a user with incorrect password cant login', function(done) {
		farmOwner = {
			email: 'ericcartman@gmail.com',
			password: 'ericmccormick'
		};
		request.post('/api/farmOwner/login')
		.send(farmOwner)
		.expect(401)
		.end(function(err, res) {
			expect(res.body).toEqual(jasmine.objectContaining({
        success: false,
        message: 'Invalid Email or Password!'
      }));;
			done();
		});
	});

});
// var token;

// describe('User route test', function() {

//   beforeEach(function(done) {
//     token = jwt.sign(farmOwner, config.secret, {
//       expiresIn: 1440
//     });
//     done();
//   });

//   it('should return the details of a farm owner with token', function(done) {
//     request.get('/api/farmOwner/ericcartman@gmail.com')
//     .set('x-access-token', token)
//     .expect(200)
//     .end(function(err) {
//       expect(err).toBe(null);
//       done();
//     });
//   });

//   it('should not return the details of a user without token', function(done) {
//     request.get('/api/user/keisukehonda')
//     .expect(403)
//     .end(function(err, res) {
//       expect(res.body).toEqual(jasmine.objectContaining({
//         success: false,
//         message: 'Signup or Login.'
//       }));
//       done();
//     });
//   });

//   it('should edit the details of a user with token', function(done) {
//     user = {
//       username: 'keisuketoyota'
//     };
//     request.put('/api/user/keisukehonda')
//     .set('x-access-token', token)
//     .expect(200)
//     .send(user)
//     .end(function(err) {
//       expect(err).toBe(null);
//       done();
//     });
//   });

//   it('should delete a user', function(done) {
//     request.delete('/api/user/keisuketoyota')
//     .set('x-access-token', token)
//     .expect(200)
//     .end(function(err) {
//       expect(err).toBe(null);
//       done();
//     });
//   });
  
// });