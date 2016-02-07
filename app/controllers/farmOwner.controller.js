var FarmOwner = require('../models/farmOwner.model');

// this method returns a farm owners account details
exports.getFarmOwner = function(req, res) {
  FarmOwner.findById(req.params.id, function(err, farmOwner) {
    if (err) {
      res.send(err);
    }
    else {
      res.status(200).send(farmOwner);
    }
  });
};

// this method allows a farm owners information to be edited
exports.editFarmOwner = function(req, res) {
  FarmOwner.findByIdAndUpdate(req.params.id, req.body, function(err, farmOwner) {
  	if (err) {
    	return res.send(err);
  	}
  	else {
	    res.status(200).send({
	      success: true,
	      message: 'Account Updated!'
	    });
	  }
  });
};

// this method deletes a farm owners account
exports.deleteFarmOwner = function(req, res) {
  FarmOwner.findById(req.params.id).remove(function(err, farmOwner) {
    if (err) {
      return res.send(err);
    }
    else {
      res.status(200).send({
        success: true,
        message: 'Account Deleted'
      });
    }
  });
};
