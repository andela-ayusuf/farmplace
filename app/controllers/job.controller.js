var Job = require('../models/job.model');
var FarmOwner = require('../models/farmOwner.model');
var User = require('../models/user.model');
var Application = require('../models/application.model');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

// this method allows a farm owner to post a job
exports.postJob = function postJob(req, res) {
  // verify farm owner
  FarmOwner.findById(req.body.foId)
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
    var job = new Job();
    job.ownerId = farmOwnerId;
    job.title = req.body.title;
    job.description = req.body.description;
    job.farmName = farmOwnerFarmName;
    job.location = req.body.location;
    job.agricType = req.body.agricType;
    job.expiryDate = req.body.expiryDate;

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
exports.getAllJobs = function getAllJobs(req, res) {
	Job.find({})
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

exports.getJob = function getJob(req, res) {
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

// this method allows a user to apply for an internship
exports.apply = function apply(req, res) {
  var application = new Application();
  application.applicantId = req.body.id;
  application.jobId = req.body.jId;
  application.details = req.body.details;

  application.save().then(function(application) {
    return res.status(200).send({
      success: true,
      message: 'Application Successful.'
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

exports.getApplicants = function getApplicants(req, res) {
  Application.find({jobId: req.params.id})
  .populate('applicantId')
  .then(function(applicants) {
    if (applicants.length === 0) {
      return res.status(200).send({
        success: false,
        message: 'There are no applicants for this job.'
      });
    }
    else {
      return res.status(200).send(applicants);
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

exports.getFarmOwnerJobs = function getFarmOwnerJobs(req, res) {
  Job.find({ownerId: req.params.id})
  .then(function(jobs) {
    if (jobs.length === 0) {
      return res.status(200).send({
        success: false,
        message: 'You havent posted any jobs yet.'
      });
    }
    else {
      return res.status(200).send(jobs);
    }
  })
  .catch(function(err) {
    return res.status(403).send({
      success: false,
      message: 'An error occured.'
    });
  });
};

exports.editJob = function editJob(req, res) {
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

exports.deleteJob = function deleteJob(req, res) {
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

