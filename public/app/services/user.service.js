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

    User.forgotPassword = function(email) {
    	return $http.post(baseUrl + '/api/forgotPassword', email);
    };

    User.resetPassword = function(emailPass) {
      return $http.put(baseUrl + '/api/forgotPassword', emailPass);
    };

    User.editUser = function(id, user) {
      return $http.put(baseUrl + '/api/user/' + id, user);
    };

    User.editUserPassword = function(id, password) {
      return $http.put(baseUrl + '/api/user/editPassword/' + id, password)
    };

		return User;
	}]);