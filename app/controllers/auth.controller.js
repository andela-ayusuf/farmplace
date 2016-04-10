var jwt = require('jsonwebtoken');
var User = require('../models/user.model');
var FarmOwner = require('../models/farmOwner.model');
var config = require('../../config/config');

// this method creates a new user
exports.userSignup = function(req, res) {
  var user = new User();
  user.username = req.body.username;
  user.firstname = req.body.firstname;
  user.lastname = req.body.lastname;
  user.email = req.body.email;
  user.password = req.body.password;
  user.phoneno = req.body.phoneno;
  user.address = req.body.address;

  user.save(function(err) {
    if (err) {
      if (err.name === 'ValidationError') {
        return res.status(401).send({
          success: false,
          message: 'Please fill the required field(s)!'
        });
      }
      else if (err.code === 11000) {
        return res.status(401).send({
          success: false,
          message: 'Username Already Exists!'
        });
      }
      else {
        return res.status(401).send(err);
      }
    }
    else {
      var token = jwt.sign(user, config.secret, {
        expiresIn: 1440
      });
      res.status(200).send({
        success: true,
        token: token,
        message: 'Welcome ' + user.username,
        id: user._id
      });
    }
  });
};

// this method logs a user in
exports.userSignin = function(req, res) {
  User.findOne({
      username: req.body.username
    })
    .select('username password')
    .exec(function(err, user) {
      if (err) {
        throw err;
      }
      if (!user) {
        return res.status(401).send({
          success: false,
          message: 'Invalid Username or Password!'
        });
      } else {
        var validPassword = user.comparePassword(req.body.password);
        if (!validPassword) {
          return res.status(401).send({
            success: false,
            message: 'Invalid Username or Password!'
          });
        } else {
          var token = jwt.sign(user, config.secret, {
            expiresIn: 1440
          });
          res.status(200).send({
            success: true,
            token: token,
            message: 'Welcome ' + user.username,
            id: user._id
          });
        }
      }
    });
};

// this method creates a new farm owner
exports.farmOwnerSignup = function(req, res) {
  var farmOwner = new FarmOwner();
  farmOwner.firstname = req.body.firstname;
  farmOwner.lastname = req.body.lastname;
  farmOwner.email = req.body.email;
  farmOwner.phoneNo = req.body.phoneNo;
  farmOwner.password = req.body.password;
  farmOwner.farmName = req.body.farmName;
  farmOwner.agricType = req.body.agricType;
  farmOwner.numOfEmployees = req.body.numOfEmployees;
  farmOwner.address = req.body.address;
  farmOwner.state = req.body.state;
  farmOwner.website = req.body.website;

  farmOwner.save(function(err) {
    if (err) {
      if (err.name === 'ValidationError') {
        return res.status(401).send({
          success: false,
          message: 'Please fill the required field(s)!'
        });
      }
      else if (err.code === 11000) {
        return res.status(401).send({
          success: false,
          message: 'Farm Name Already Exists!'
        });
      }
      else {
        return res.status(401).send(err);
      }
    }
    else {
      var token = jwt.sign(farmOwner, config.secret, {
        expiresIn: 1440
      });
      res.status(200).send({
        success: true,
        token: token,
        message: 'Welcome ' + farmOwner.firstname,
        id: farmOwner._id
      });
    }
  });
};

// this method logs in a farm owner
exports.farmOwnerLogin = function(req, res) {
  FarmOwner.findOne({
      email: req.body.email
    })
    .select('email password firstname')
    .exec(function(err, farmOwner) {
      if (err) {
        throw err;
      }
      if (!farmOwner) {
        return res.status(401).send({
          success: false,
          message: 'Invalid Email or Password!'
        });
      } 
      else {
        var validPassword = farmOwner.comparePassword(req.body.password);
        if (!validPassword) {
          return res.status(401).send({
            success: false,
            message: 'Invalid Email or Password!'
          });
        } 
        else {
          var token = jwt.sign(farmOwner, config.secret, {
            expiresIn: 1440
          });
          res.status(200).send({
            success: true,
            token: token,
            message: 'Welcome ' + farmOwner.firstname,
            id: farmOwner._id
          });
        }
      }
    });
};

// this method logs a user out
exports.logout = function(req, res) {
  req.session.destroy(function(err, success) {
    if (err) {
      res.send(err);
    } 
    else {
      res.send({
        success: true,
        message: 'You have logged out.'
      });
    }
  });
};
