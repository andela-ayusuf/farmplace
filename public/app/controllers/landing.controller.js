angular.module('fpApp').controller('SubCtrl', ['$scope', 'SubService', '$location', function($scope, SubService, $location){
  $scope.subscribe = function() {
    SubService.subscribe($scope.sub).then(function(res) {
      document.getElementById("subemail").value = '';
      swal('Thanks!', 'We will keep you updated.', 'success');
    }, function(err) {
      sweetAlert('Oops...', 'Please Enter a Valid Email!', 'error');
    });
  };
}]);