var app = angular.module('fpApp', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

  $stateProvider
    .state('landing', {
      url: '/',
      templateUrl: 'app/views/landing.view.html',
      controller: 'SubCtrl'
    });

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
}]);