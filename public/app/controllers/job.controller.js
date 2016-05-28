angular.module('farmplace')
  .controller('JobCtrl', ['$scope', 'JobService', '$location', '$window', function($scope, JobService, $location, $window) {

    $scope.getAllJobs = function() {
      JobService.getAllJobs(sessionStorage.token).then(function(res) {
        $scope.jobs = res.data;
      }, function(err) {
      });
    };

    $scope.getJobId = function() {
      var id = $window.sessionStorage.id;
      return id;
    };

    $scope.getJob = function(id) {
      $window.sessionStorage.id = id;
      JobService.getJob(id).then(function(res) {
        $location.url('/job-details');
        $scope.job = res.data[0];
      }, function(err) {
      });
    }

  }])
  
  .filter('calendar', function() {
    return function(dateString) {
      return moment(dateString).calendar(null, {
        sameDay: '[Today]',
        nextDay: '[Tomorrow]',
        nextWeek: 'dddd',
        lastDay: '[Yesterday]',
        lastWeek: 'dddd',
        sameElse: 'DD/MM/YYYY'
      });
    };
  });