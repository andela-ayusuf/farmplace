var userRoutes = require('./user.route');
var authRoutes = require('./auth.route');

function routes(router) {
  userRoutes(router);
  authRoutes(router);
}

module.exports = routes;