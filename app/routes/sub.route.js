var userCtrl = require('../controllers/sub.controller');

function userRoutes(router) {
  router.route('/')
    .post(userCtrl.subscribe);
}

module.exports = userRoutes;