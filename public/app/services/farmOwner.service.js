angular.module('farmplace')
	.factory('FarmOwnerService', ['$http', 'baseUrl', function($http, baseUrl) {
		var FarmOwner = {};
		FarmOwner.farmOwnerSignup = function(user) {
			return $http.post(baseUrl + '/api/farmOwner/signup', user).then(function(res) {
        return res;
      });
		};

		FarmOwner.farmOwnerLogin = function(user) {
      return $http.post(baseUrl + '/api/farmOwner/login', user).then(function(res) {
        return res;
      });
    };

		return FarmOwner;
	}]);