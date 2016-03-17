var app = angular.module('farmplace', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {

  $stateProvider
    .state('landing', {
      url: '/',
      templateUrl: 'app/views/landing.view.html',
      controller: 'UserCtrl'
    })
    .state('signin', {
      url: '/signin',
      templateUrl: 'app/views/signin.view.html',
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
      controller: 'JobCtrl'
    })
    .state('foSignup', {
      url: '/foSignup',
      templateUrl: 'app/views/foSignup.view.html',
      controller: 'FarmOwnerCtrl'
    })
    .state('foDashboard', {
      url: '/foDashboard',
      templateUrl: 'app/views/foDashboard.view.html',
      controller: 'FarmOwnerCtrl'
    });

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);

    $httpProvider.interceptors.push(['$q', '$location', '$window', function($q, $location, $window) {
      return {
        'request': function(config) {
          config.headers = config.headers || {};
          if (localStorage.getItem('token')) {
            config.headers['x-access-token'] = localStorage.getItem('token');
            // $location.url('/dashboard');
          }
          return config;
        },
        'responseError': function(response) {
          if (response.status === 403) {
            $location.url('/home');
          }
          return $q.reject(response);
        }
      };
    }]);

}]);