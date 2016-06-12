var jwt = require('jsonwebtoken');
var User = require('../models/user.model');
var config = require('../../config/config');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

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
    return res.status(403).send({
        success: false,
        message: 'Signup or Login.'
    });
  }
};

// this method returns a single user
exports.getUser = function(req, res) {
  User.find({username: req.params.username})
  .then(function(user) {
    if (!user) {
      return res.status(401).send({
        success: false,
        message: 'User not found.'
      });
    }
    else {
      return res.status(200).send(user);
    }
  })
  .catch(function(err) {
    return res.status(403).send({
      success: false,
      message: 'An error occured.',
      error: err
    });
  });
};

// this method allows user information to be edited
exports.editUser = function(req, res) {
  User.update({username: req.params.username}, req.body)
  .then(function(user) {
    return res.status(200).send({
      success: true,
      message: 'Account Updated!'
    });
  })
  .catch(function(err) {
    return res.status(403).send({
      success: false,
      message: 'An error occured.',
      error: err
    });
  });
};

// this method deletes a user account
exports.deleteUser = function(req, res) {
  User.remove({username: req.params.username})
  .then(function(user) {
    return res.status(200).send({
      success: true,
      message: 'Account Deleted'
    });
  })
  .catch(function(err) {
    return res.status(403).send({
      success: false,
      message: 'An error occured.',
      error: err
    });
  });
};

