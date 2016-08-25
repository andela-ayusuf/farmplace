var Job = require('../models/job.model');

exports.search = function search(req, res) {
	if (req.body === null) {
		Job.find({})
		.then(function(jobs) {
			return res.status(200).send(jobs);
		})
	}
	Job.find({title: req.body.title, location: req.body.location, agricType: req.body.agricType})
	.then(function(jobs) {
		return res.status(200).send(jobs);
	})
	.catch(function(err) {
		return res.status(403).send({
			success: false,
			message: 'Not found!',
			error: err
		});
	});
};