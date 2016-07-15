angular.module('farmplace')
	.factory('JobService', ['$http', 'baseUrl', function($http, baseUrl) {
		var Job= {};

		Job.postJob = function(job) {
      return $http.post(baseUrl + '/api/jobs', job);
    };

    Job.getAllJobs = function() {
      return $http.get(baseUrl + '/api/jobs');
    };

    Job.apply = function(application) {
      return $http.put(baseUrl + '/api/jobs', application);
    };

    Job.getJob = function(jId) {
    	return $http.get(baseUrl + '/api/jobs/' + jId);
    };

    Job.getFarmOwnerJobs = function(foId) {
      return $http.get(baseUrl + '/api/farmOwner/' + foId + '/jobs');
    };

		return Job;
	}]);