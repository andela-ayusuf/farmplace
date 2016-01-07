angular.module('fpApp')
  .factory('SubService', ['$http', 'baseUrl', function($http, baseUrl) {
    var Sub = {};
    Sub.subscribe = function(email) {
      return $http.post(baseUrl + '/', email).then(function(res) {
        return res;
      });
    };
    return Sub;
  }]);