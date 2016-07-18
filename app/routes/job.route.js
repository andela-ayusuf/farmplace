var jobCtrl = require('../controllers/job.controller');
var userCtrl = require('../controllers/user.controller');

function jobRoutes(router) {
	router.route('/jobs')
		.post(jobCtrl.postJob)
		.get(jobCtrl.getAllJobs);

	router.route('/apply')
		.post(jobCtrl.apply);

	router.route('/applicants/:id')
		.get(jobCtrl.getApplicants);

	 router.route('/jobs/:id')
    .get(jobCtrl.getJob)
    .put(jobCtrl.editJob)
    .delete(jobCtrl.deleteJob);

   router.route('/farmOwner/:id/jobs')
    .get(jobCtrl.getFarmOwnerJobs);
}

module.exports = jobRoutes;