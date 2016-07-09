angular.module('farmplace')
	.factory('JobService', ['$http', 'baseUrl', function($http, baseUrl) {
		var Job= {};

		Job.postJob = function(job) {
      return $http.post(baseUrl + '/api/jobs', job);
    };

    Job.getJob = function(id) {
    	return $http.get(baseUrl + '/api/jobs/' + id);
    };

		Job.getAllJobs = function() {
      return $http.get(baseUrl + '/api/jobs');
    };

    Job.getFarmOwnerJobs = function() {
      return $http.get(baseUrl + '/api/farmOwner/' + foId + '/jobs');
    };

		return Job;
	}]);