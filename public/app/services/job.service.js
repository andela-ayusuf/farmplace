angular.module('farmplace')
	.factory('JobService', ['$http', 'baseUrl', function($http, baseUrl) {
		var Job= {};

		Job.postJob = function(job) {
      return $http.post(baseUrl + '/api/jobs', token);
    };

		Job.getAllJobs = function(token) {
      return $http.get(baseUrl + '/api/jobs', token);
    };

		return Job;
	}]);