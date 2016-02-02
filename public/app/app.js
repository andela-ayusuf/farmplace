var app = angular.module('farmplace', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

  $stateProvider
    .state('landing', {
      url: '/',
      templateUrl: 'app/views/landing.view.html',
      controller: 'UserCtrl'
    })
    .state('signup', {
    	url: '/signup',
    	templateUrl: 'app/views/signup.view.html',
    	controller: 'UserCtrl'
    })
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: 'app/views/dashboard.view.html',
      controller: 'UserCtrl'
    });

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
}]);