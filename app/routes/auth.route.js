var authCtrl = require('../controllers/auth.controller');

function authRoutes(router) {
  router.route('/signup')
    .post(authCtrl.signup);

  router.route('/login')
    .post(authCtrl.login);

  router.route('/logout')
    .post(authCtrl.logout);

  router.route('/user/:id')
    .get(authCtrl.middleware, authCtrl.getUser)
    .put(authCtrl.middleware, authCtrl.editUser)
    .delete(authCtrl.middleware, authCtrl.deleteUser);
}

module.exports = authRoutes;