angular.module('farmplace')
  .controller('FarmOwnerCtrl', ['$scope', 'FarmOwnerService', '$location', '$window', function($scope, FarmOwnerService, $location, $window) {

    $scope.saveToLS = function(id, token) {
      localStorage.setItem('foId', id);
      localStorage.setItem('foToken', token);
    };

    $scope.farmOwnerSignup = function() {
      if ($scope.newFarmOwner === undefined) {
        $scope.error = 'Please fill the required field(s)!';
        $('#error').show();
      }
      else if ($scope.newFarmOwner.password !== $scope.newFarmOwner.confirmPassword) {
        $scope.error = 'Password Mismatch!';
        $('#error').show();
      } 
      else {
        FarmOwnerService.farmOwnerSignup($scope.newFarmOwner).then(function(res) {
          $scope.saveToLS(res.data.id, res.data.token);
          $location.url('/foDashboard');
        }, function(err) {
          $scope.error = err.data.message;
          $('#error').show();
        });
      }
    };

    $scope.farmOwnerLogin = function() {
      FarmOwnerService.farmOwnerLogin($scope.farmOwner).then(function(res) {
        $scope.saveToLS(res.data.id, res.data.token);
        $location.url('/foDashboard');
      }, function(err) {
        $scope.error2 = err.data.message;
        $('#error2').show();
      });
    };

    $scope.getFarmOwner = function() {
      var id = localStorage.getItem('foId');
      FarmOwnerService.getFarmOwner(id).then(function(res) {
        $scope.farmOwner = res.data;
      }, function(err) {
      })
    };

  }]);

