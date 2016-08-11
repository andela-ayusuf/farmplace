var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user.model');
var Job = require('./job.model');

var applicationSchema = new Schema({
	applicantId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	jobId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Job'
	},
	details: {
		type: String
	}
});

module.exports = mongoose.model('Application', applicationSchema);