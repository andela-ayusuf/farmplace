angular.module('farmplace')
	.factory('UserService', ['$http', 'baseUrl', function($http, baseUrl) {
		var User = {};
		User.signup = function(user) {
			return $http.post(baseUrl + '/api/signup', user).then(function(res) {
        return res;
      });
		};
		return User;
	}]);