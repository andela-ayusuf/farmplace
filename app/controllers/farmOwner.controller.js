var FarmOwner = require('../models/farmOwner.model');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
mongoose.Promise = require('bluebird');

// this method returns a farm owners account details
exports.getFarmOwner = function getFarmOwner(req, res) {
  FarmOwner.findById(req.params.id)
  .then(function(farmOwner) {
    if (!farmOwner) {
      return res.status(401).send({
        success: false,
        message: 'Farm owner not found.'
      });
    }
    else {
      return res.status(200).send(farmOwner);
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

// this method allows a farm owners information to be edited
exports.editFarmOwner = function editFarmOwner(req, res) {
  FarmOwner.update({_id: req.params.id}, req.body)
  .then(function(farmOwner) {
    return res.status(200).send({
      success: false,
      message: 'Account Updated.'
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

// this method edits a farmowners password
exports.editFarmOwnerPassword = function editFarmOwnerPassword(req, res) {
  if (!req.body.password) {
    return res.status(401).send({
      success: false,
      message: 'Please enter your password.'
    });
  }
  FarmOwner.findOne({_id: req.params.id})
  .then(function(farmOwner) {
    bcrypt.hash(req.body.password, null, null, function(err, hash) {
      if (err) {
        return err;
      }
      req.body.password = hash;
   
      FarmOwner.update({_id: req.params.id}, {$set: {password: req.body.password}})
      .then(function(farmOwner) {
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

// this method deletes a farm owners account
exports.deleteFarmOwner = function deleteFarmOwner(req, res) {
  FarmOwner.findById(req.params.id).remove()
  .then(function(farmOwner) {
    return res.status(200).send({
      success: false,
      message: 'Account Deleted.'
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
