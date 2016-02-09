angular.module('farmplace')
	.factory('JobService', ['$http', 'baseUrl', function($http, baseUrl) {
		var Job= {};

		Job.getAllJobs = function(token) {
      return $http.get(baseUrl + '/api/jobs', token).then(function(res) {
        return res;
      });
    };

		return Job;
	}]);