angular.module('farmplace')
	.factory('SearchService', ['$http', 'baseUrl', function($http, baseUrl) {
		var Search = {};
		Search.search = function (terms) {
			return $http({
				method: 'GET',
				url: baseUrl + '/api/search',
		    params: terms
		  });
		};

		return Search;
	}]);