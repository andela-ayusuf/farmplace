var FarmOwner = require('../models/farmOwner.model');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

// this method returns a farm owners account details
exports.getFarmOwner = function(req, res) {
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
exports.editFarmOwner = function(req, res) {
  FarmOwner.findByIdAndUpdate(req.params.id, req.body)
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

// this method deletes a farm owners account
exports.deleteFarmOwner = function(req, res) {
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
