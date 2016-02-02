angular.module('farmplace')
  .controller('UserCtrl', ['$scope', 'UserService', '$location', '$window', function($scope, UserService, $location, $window) {

    $scope.saveSessStorage = function(id, token) {
      $window.sessionStorage.token = token;
      $window.sessionStorage.userId = id;
    };

    // this function creates a new user
    $scope.signup = function() {
      UserService.signup($scope.newUser).then(function(res) {
        $scope.saveSessStorage(res.data.id, res.data.token);
        $location.url('/dashboard');
        console.log(res);
      }, function(err) {
        console.log(err);
      });
    };

    $scope.login = function() {
      UserService.login($scope.user).then(function(res) {
        $scope.saveSessStorage(res.data.id, res.data.token);
        $location.url('/dashboard');
        console.log(res);
      }, function(err) {
        console.log(err);
      });
    };

  }]);