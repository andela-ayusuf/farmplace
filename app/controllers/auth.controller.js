var jwt = require('jsonwebtoken');
var User = require('../models/user.model');
var config = require('../../config/config');

// this method creates a new document
exports.signup = function(req, res) {
  var user = new User();
  user.username = req.body.username;
  user.name = {
    firstname: req.body.firstname,
    lastname: req.body.lastname
  };
  user.email = req.body.email;
  user.password = req.body.password;
  user.phoneno = req.body.phoneno;
  user.address = req.body.address;

  user.save(function(err) {
    if (!user.username || !user.email || !user.password) {
      return res.status(401).send({
        success: false,
        message: 'Please fill the required field!'
      });
    }
    else if (!user.name.firstname || !user.name.lastname) {
      return res.status(401).send({
        success: false,
        message: 'Invalid Firstname or Lastname!'
      });
    }
    else if (err) {
      if (err.code === 11000) {
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
exports.login = function(req, res) {
  User.findOne({
    username: req.body.username})
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
    }
    else {
      var validPassword = user.comparePassword(req.body.password);
      if (!validPassword) {
        return res.status(401).send({
          success: false,
          message: 'Invalid Username or Password!'
        });
      }
      else {
        var token = jwt.sign(user, config.secret, {
          expiresIn: 1440
        });
        res.json({
          success: true,
          token: token,
          message: 'Welcome ' + user.username,
          id: user._id
        });
      }
    }
  });
};

// this method authenticates user
exports.middleware = function(req, res, next) {
  var token = req.body.token ||
    req.query.token ||
    req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        return res.json({ 
          success: false,
          message: 'Failed to authenticate token.' });
      }
      else {
        req.decoded = decoded;
        next();
      }
    });
  }
  else {
    return res.status(401).send({
        success: false,
        message: 'Signup or Login.'
    });
  }
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

// this method returns a single user
exports.getUser = function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (err) {
      res.send(err);
    }
    else {
      res.json(user);
    }
  });
};

// this method allows user information to be edited
exports.editUser = function(req, res) {
  User.findByIdAndUpdate(req.params.id, req.body, function(err, user) {
    res.send({
      success: true,
      message: 'Account Updated!'
    });
  });
};

// this method deletes single document
exports.deleteUser = function(req, res) {
  User.findById(req.params.id).remove(function(err, user) {
    if (err) {
      return res.send(err);
    }
    else {
      res.send({
        success: true,
        message: 'Account Deleted'
      });
    }
  });
};
