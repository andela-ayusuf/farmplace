var app = angular.module('farmplace', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

  $stateProvider
    .state('landing', {
      url: '/',
      templateUrl: 'app/views/landing.view.html',
      controller: ''
    })
    .state('signup', {
    	url: '/signup',
    	templateUrl: 'app/views/signup.view.html',
    	controller: 'UserCtrl'
    });

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
}]);