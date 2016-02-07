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
	location: {
		type: String,
		required: true
	},
	datePosted: {
		type: Date,
    default: Date.now
	}
});

module.exports = mongoose.model('Job', jobSchema);