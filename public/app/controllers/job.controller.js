angular.module('farmplace')
  .controller('JobCtrl', ['$scope', 'JobService', '$location', '$window', function($scope, JobService, $location, $window) {

    $scope.getAllJobs = function() {
      JobService.getAllJobs().then(function(res) {
        $scope.jobs = res.data;
      }, function(err) {
      });
    };

    $scope.getJobId = function() {
      var jId = localStorage.getItem('jId'); //jId means job id
      return jId;
    };

    $scope.getJob = function(jId) {
      localStorage.setItem('jId', jId);
      JobService.getJob(jId).then(function(res) {
        $location.url('/intDetails');
        $scope.job = res.data[0];
      }, function(err) {
      });
    };

    // this function allows a farm owner to post a job
    $scope.postJob = function() {
      var job = {
        foId: localStorage.getItem('foId'),
        agricType: $scope.job.agricType,
        title: $scope.job.title,
        location: $scope.job.location,
        expiryDate: $scope.job.expiryDate,
        description: $scope.job.description
      };
      JobService.postJob(job).then(function(res) {
        $location.url('/foDashboard');
      }, function(err) {
        $scope.error = err.data.message;
        $('#error').show();
      });
    };

    $scope.getFarmOwnerJobs = function() {
      var foId = localStorage.getItem('foId');
      JobService.getFarmOwnerJobs(foId).then(function(res) {
        var noJobs;
        if (res.data.length === 0) {
          $scope.noJobs = true;
        }
        $scope.jobs = res.data;
      }, function(err) {
      });
    };

    $scope.apply = function() {
      if ($scope.application === undefined) {
        $scope.error = 'Common, tell us why you want this internship position!';
        $('#error').show();
      }
      else {
        var application = {
          id: localStorage.getItem('id'),
          jId: localStorage.getItem('jId'),
          details: $scope.application.details
        };
        JobService.apply(application).then(function(res) {
          $location.url('/dashboard');
        }, function(err) {
          $scope.error = err.data.message;
          $('#error').show();
        });
      }
    };

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