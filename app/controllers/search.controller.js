var Job = require('../models/job.model');

exports.search = function search(req, res) {
	var title = new RegExp(req.query.title, 'i');
	var location = new RegExp(req.query.location, 'i');

	if (req.query.location === undefined) {
		Job.find({title: title})
		.then(function(jobs) {
			if (jobs.length === 0) {
				return res.status(200).send({
					success: false,
          message: 'Your search for ' + req.query.title + ' returned no results.'
				});
			}
			return res.status(200).send({
				success: true,
				message: 'Here are your search results',
				results: jobs
			});
		})
		.catch(function(err) {
			return res.status(403).send({
				success: false,
				message: 'An error occured!',
				error: err
			});
		});
	}
	else if (req.query.title === undefined) {
		Job.find({location: location})
		.then(function(jobs) {
			if (jobs.length === 0) {
				return res.status(200).send({
					success: false,
          message: 'Your search for ' + req.query.location + ' returned no results.'
				});
			}
			return res.status(200).send({
				success: true,
				message: 'Here are your search results',
				results: jobs
			});
		})
		.catch(function(err) {
			return res.status(403).send({
				success: false,
				message: 'An error occured!',
				error: err
			});
		});
	}
	else {
		Job.find({$or: [{title: title}, {location: location}]})
		.then(function(jobs) {
			if (jobs.length === 0) {
				return res.status(200).send({
					success: false,
          message: 'Your search for ' + req.query.title + ' returned no results.'
				});
			}
			return res.status(200).send({
				success: true,
				message: 'Here are your search results',
				results: jobs
			});
		})
		.catch(function(err) {
			return res.status(403).send({
				success: false,
				message: 'An error occured!',
				error: err
			});
		});
	}
};

exports.navsearch = function navsearch(req, res) {
	Job.find({title: req.query.title})
	.then(function(job) {
		if (job.length === 0) {
			return res.status(200).send({
				success: false,
        message: 'Your search for ' + req.query.title + ' returned no results.'
			});
		}
		return res.status(200).send({
			success: true,
			message: 'Here are your search results',
			results: job
		});
	})
	.catch(function(err) {
		return res.status(403).send({
			success: false,
			message: 'An error occured!',
			error: err
		});
	});
};

