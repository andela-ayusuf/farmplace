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

    FarmOwner.editFarmOwner = function(id, farmOwner) {
    	return $http.put(baseUrl + '/api/farmOwner/' + id, farmOwner);
    };

    FarmOwner.editFarmOwnerPassword = function(id, password) {
    	return $http.put(baseUrl + '/api/farmOwner/editFarmOwnerPassword/' + id, password)
    };

		return FarmOwner;
	}]);