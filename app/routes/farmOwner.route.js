var farmOwnerCtrl = require('../controllers/farmOwner.controller');
var userCtrl = require('../controllers/user.controller');

function farmOwnerRoutes(router) {
  router.route('/farmOwner/:id')
    .get(userCtrl.middleware, farmOwnerCtrl.getFarmOwner)
    .put(userCtrl.middleware, farmOwnerCtrl.editFarmOwner)
    .delete(userCtrl.middleware, farmOwnerCtrl.deleteFarmOwner);
}

module.exports = farmOwnerRoutes;