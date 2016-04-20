angular.module('farmplace')
	.factory('UserService', ['$http', 'baseUrl', function($http, baseUrl) {
		var User = {};

	  // User.checkUser = function() {
   //    var user = localStorage.getItem('token')
   //    return user ? true : false;
   //  }

		User.userSignup = function(user) {
			return $http.post(baseUrl + '/api/user/signup', user);
		};

		User.userLogin = function(user) {
      return $http.post(baseUrl + '/api/user/login', user);
    };

    User.getUser = function(id) {
    	return $http.get(baseUrl + '/api/user/' + id);
    };

		return User;
	}]);