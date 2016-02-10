angular.module('farmplace')
  .controller('FarmOwnerCtrl', ['$scope', 'FarmOwnerService', '$location', '$window', function($scope, FarmOwnerService, $location, $window) {

    $scope.saveSessStorage = function(id, token) {
      $window.sessionStorage.foToken = token;
      $window.sessionStorage.foId = id;
    };

    // this function creates a new farm owner
    $scope.farmOwnerSignup = function() {
      FarmOwnerService.farmOwnerSignup($scope.newFo).then(function(res) {
        $scope.saveSessStorage(res.data.id, res.data.token);
        // $location.url('/dashboard');
        console.log(res);
      }, function(err) {
        console.log(err);
      });
    };

    $scope.farmOwnerLogin = function() {
      FarmOwnerService.farmOwnerLogin($scope.fo).then(function(res) {
        $scope.saveSessStorage(res.data.id, res.data.token);
        // $location.url('/dashboard');
        console.log(res);
      }, function(err) {
        console.log(err);
      });
    };

  }]);