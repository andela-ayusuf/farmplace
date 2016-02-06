var jwt = require('jsonwebtoken');
var User = require('../models/user.model');
var config = require('../../config/config');

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
