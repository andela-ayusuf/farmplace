var jobCtrl = require('../controllers/job.controller');
var userCtrl = require('../controllers/user.controller');

function jobRoutes(router) {
	router.route('/jobs')
		.post(jobCtrl.postJob)
		.get(jobCtrl.getAllJobs);

	 router.route('/jobs/:id')
    .get(jobCtrl.getJob)
    .put(jobCtrl.editJob)
    .delete(jobCtrl.deleteJob);
}

module.exports = jobRoutes;