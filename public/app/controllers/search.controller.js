angular.module('farmplace')
	.controller('SearchCtrl', ['$scope', 'SearchService', '$location', function($scope, SearchService, $location) {

		$scope.search = function() {
			SearchService.search($scope.terms).then(function(res) {
				$scope.results = res.data;
				$location.url('/search');
			}, function(err) {
				console.log(err)
			});
		};

	}]);