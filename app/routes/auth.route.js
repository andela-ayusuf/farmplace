var authCtrl = require('../controllers/auth.controller');

function authRoutes(router) {
	// user auth routes
  router.route('/user/signup')
    .post(authCtrl.userSignup);

  router.route('/user/login')
    .post(authCtrl.userLogin);

  // farm owner auth routes
  router.route('/farmOwner/signup')
    .post(authCtrl.farmOwnerSignup);

  router.route('/farmOwner/login')
    .post(authCtrl.farmOwnerLogin);

  router.route('/logout')
    .post(authCtrl.logout);

  // mailer routes
  router.route('/password_reset')
    .post(authCtrl.beginPasswordReset)
    .put(authCtrl.passwordReset);
}

module.exports = authRoutes;