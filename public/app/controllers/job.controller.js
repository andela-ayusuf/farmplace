angular.module('farmplace')
  .controller('JobCtrl', ['$scope', 'JobService', '$location', '$window', function($scope, JobService, $location, $window) {

    $scope.getAllJobs = function() {
      JobService.getAllJobs(sessionStorage.token).then(function(res) {
        $scope.jobs = res.data;
        console.log($scope.jobs);
      }, function(err) {
        console.log(err);
      });
    };

  }]);