angular.module('farmplace')
	.factory('FarmOwnerService', ['$http', 'baseUrl', function($http, baseUrl) {
		var FarmOwner = {};
		FarmOwner.farmOwnerSignup = function(user) {
			return $http.post(baseUrl + '/api/farmOwner/signup', user);
		};

		FarmOwner.farmOwnerLogin = function(user) {
      return $http.post(baseUrl + '/api/farmOwner/login', user);
    };

    FarmOwner.getFarmOwner = function(id) {
    	return $http.get(baseUrl + '/api/farmOwner/' + id);
    };

		return FarmOwner;
	}]);