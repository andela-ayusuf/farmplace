var userCtrl = require('../controllers/user.controller');

function userRoutes(router) {
  router.route('/user/:username')
    .get(userCtrl.middleware, userCtrl.getUser)
    .put(userCtrl.middleware, userCtrl.editUser)
    .delete(userCtrl.middleware, userCtrl.deleteUser);
}

module.exports = userRoutes;