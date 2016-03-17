angular.module('farmplace')
	.factory('UserService', ['$http', 'baseUrl', function($http, baseUrl) {
		var User = {};
		User.userSignup = function(user) {
			return $http.post(baseUrl + '/api/user/signup', user);
		};

		User.userSignin = function(user) {
      return $http.post(baseUrl + '/api/user/signin', user);
    };

		return User;
	}]);