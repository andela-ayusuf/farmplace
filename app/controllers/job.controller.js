var Job = require('../models/job.model');
var FarmOwner = require('../models/farmOwner.model');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

// this method allows a farm owner to post a job
exports.postJob = function(req, res) {
  // verify farm owner
  FarmOwner.findOne({email: req.decoded._doc.email})
  .then(function(farmOwner) {
    if (!farmOwner) {
      return res.status(403).send({
        success: false,
        message: 'Please login or signup.'
      });
    }
    else {
      var farmOwnerId = farmOwner._id;
      var farmOwnerFarmName = farmOwner.farmName;
    }
    var year = req.body.year;
    var a = req.body.month;
    var b = req.body.day;

    var month = +a - 1;
    var day = +b + 1;

    function expire(year, month, day) {
      var dates = new Date(year, month, day);
      return dates;
    }

    var job = new Job();
    job.ownerId = farmOwnerId;
    job.title = req.body.title;
    job.description = req.body.description;
    job.farmName = farmOwnerFarmName;
    job.location = req.body.location;
    job.agricType = req.body.agricType;
    job.expiryDate = expire(year, month, day);

    // save/post a job
    job.save()
    .then(function(job) {
      return res.status(200).send({
        success: true,
        message: 'Job Posted.',
        id: job._id
      });
    })
    .catch(function(err) {
      if (err.name === 'ValidationError') {
        return res.status(401).send({
          success: false,
          message: 'Please fill the required field(s)!'
        });
      }
      else {
        return res.status(403).send({
          success: false,
          message: 'An error occured.',
          error: err
        });
      }
    });
  })
  .catch(function(err) {
    return res.status(403).send({
      success: false,
      message: 'An error occured.',
      error: err
    });
  })
};

// this method returns all jobs in the db
exports.getAllJobs = function(req, res) {
	Job.find({})
  .exec()
  .then(function(jobs) {
    if (!jobs) {
      return res.status(401).send({
        success: false,
        message: 'Job Postings Not Found!'
      });
    } 
    else {
      return res.status(200).send(jobs);
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

exports.getJob = function(req, res) {
	Job.find({_id: req.params.id})
  .then(function(job) {
    if (!job) {
      return res.status(403).send({
        success: false,
        message: 'Couldnt find the job.'
      });
    }
    else {
      return res.status(200).send(job);
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

exports.editJob = function(req, res) {
	Job.findByIdAndUpdate(req.params.id, req.body)
  .then(function(job) {
    return res.status(200).send({
      success: true,
      message: 'Job Updated!'
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

exports.deleteJob = function(req, res) {
	Job.findById(req.params.id)
  .remove()
  .then(function(job) {
    return res.status(200).send({
      success: true,
      message: 'Job Deleted'
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

