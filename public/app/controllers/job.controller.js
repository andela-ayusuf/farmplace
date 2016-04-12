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

  }])

  .filter('capitalize', function() {
    return function(input) {
      return input.toLowerCase().replace( /\b\w/g, function (output) {
        return output.toUpperCase();
      });
    }
  })
  
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