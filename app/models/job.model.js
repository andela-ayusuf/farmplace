var mongoose = require('mongoose');
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
		enum: ['arable', 'livestock', 'mixed']
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