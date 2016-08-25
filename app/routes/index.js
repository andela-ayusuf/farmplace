var userRoutes = require('./user.route');
var authRoutes = require('./auth.route');
var jobRoutes = require('./job.route');
var farmOwnerRoutes = require('./farmOwner.route');
var searchRoutes = require('./search.route');

function routes(router) {
  userRoutes(router);
  authRoutes(router);
  jobRoutes(router);
  farmOwnerRoutes(router);
  searchRoutes(router);

  router.use(function(req, res, next) {
  	res.status(404).send({message: 'Sorry couldnt find that route!'});
  });
}

module.exports = routes;