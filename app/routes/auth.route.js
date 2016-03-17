var authCtrl = require('../controllers/auth.controller');

function authRoutes(router) {
	// user auth routes
  router.route('/user/signup')
    .post(authCtrl.userSignup);

  router.route('/user/signin')
    .post(authCtrl.userSignin);

  // farm owner auth routes
  router.route('/farmOwner/signup')
    .post(authCtrl.farmOwnerSignup);

  router.route('/farmOwner/login')
    .post(authCtrl.farmOwnerLogin);

  router.route('/logout')
    .post(authCtrl.logout);
}

module.exports = authRoutes;