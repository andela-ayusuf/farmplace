var mongoose = require('mongoose');
var FarmOwner = require('./farmOwner.model');
var User = require('./user.model');
var Schema = mongoose.Schema;

var jobSchema = new Schema({
	ownerId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'FarmOwner'
	},
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	farmName: {
		type: String,
		ref: 'FarmOwner'
	},
	location: {
		type: String,
		required: true
	},
	agricType: {
		type: String,
		required: true,
		enum: ['Arable', 'Livestock', 'Mixed']
	},
	datePosted: {
		type: Date,
    default: new Date()
	},
	expiryDate: {
		type: Date
	}
});

module.exports = mongoose.model('Job', jobSchema);