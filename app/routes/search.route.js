var searchCtrl = require('../controllers/search.controller');

function searchRoutes(router) {
	router.route('/search')
		.get(searchCtrl.search);

	router.route('/navsearch')
		.get(searchCtrl.navsearch);
};

module.exports = searchRoutes;