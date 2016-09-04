angular.module('farmplace')
	.controller('SearchCtrl', ['$scope', 'SearchService', '$location', '$rootScope', function($scope, SearchService, $location, $rootScope) {

		$scope.search = function() {
			SearchService.search($scope.terms).then(function(res) {
        var noResults;
        if (res.data.success === false) {
          $rootScope.noResults = true;
        }
        else if (res.data.success === true) {
        	$rootScope.noResults = false;
        }
				$rootScope.searchResults = res.data.results;
				$location.url('/search');
			}, function(err) {
				console.log(err)
			});
		};

	}]);