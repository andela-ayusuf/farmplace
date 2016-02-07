var jobCtrl = require('../controllers/job.controller');
var userCtrl = require('../controllers/user.controller');

function jobRoutes(router) {
	router.route('/jobs')
		.post(userCtrl.middleware, jobCtrl.postJob)
		.get(userCtrl.middleware, jobCtrl.getAllJobs);

	 router.route('/jobs/:id')
    .get(userCtrl.middleware, jobCtrl.getJob)
    .put(userCtrl.middleware, jobCtrl.editJob)
    .delete(userCtrl.middleware, jobCtrl.deleteJob);
}

module.exports = jobRoutes;