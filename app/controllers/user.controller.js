var jwt = require('jsonwebtoken');
var User = require('../models/user.model');
var config = require('../../config/config');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
mongoose.Promise = require('bluebird');

// this method authenticates user
exports.middleware = function middleware(req, res, next) {
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
exports.getUser = function getUser(req, res) {
  User.findById(req.params.id)
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
exports.editUser = function editUser(req, res) {
  User.update({_id: req.params.id}, req.body)
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

// this method edits a users password
exports.editUserPassword = function editUserPassword(req, res) {
  if (!req.body.password) {
    return res.status(401).send({
      success: false,
      message: 'Please enter your password.'
    });
  }
  User.findOne({_id: req.params.id})
  .then(function(user) {
    bcrypt.hash(req.body.password, null, null, function(err, hash) {
      if (err) {
        return err;
      }
      req.body.password = hash;
   
      User.update({_id: req.params.id}, {$set: {password: req.body.password}})
      .then(function(user) {
        return res.status(200).send({
          success: true,
          message: 'Password successfully changed.'
        });
      })
      .catch(function(err) {
        return res.status(403).send({
          success: false,
          message: 'An error occured.',
          error: err
        });
      });
    });
  })
  .catch(function(err) {
    return res.status(403).send({
      success: false,
      message: 'An error occured.',
      error: err
    })
  })
};

// this method deletes a user account
exports.deleteUser = function deleteUser(req, res) {
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

