var userRoutes = require('./user.route');
var authRoutes = require('./auth.route');
var jobRoutes = require('./job.route');
var farmOwnerRoutes = require('./farmOwner.route');

function routes(router) {
  userRoutes(router);
  authRoutes(router);
  jobRoutes(router);
  farmOwnerRoutes(router);
}

module.exports = routes;