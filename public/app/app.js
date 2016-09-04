var app = angular.module('farmplace', ['ui.router', 'angularMoment']);

app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {

  $stateProvider
    .state('landing', {
      url: '/',
      templateUrl: 'app/views/landing.view.html',
      controller: 'UserCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'app/views/login.view.html',
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
    .state('intDetails', {
      url: '/intDetails',
      templateUrl: 'app/views/intDetails.view.html',
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
    })
    .state('postJob', {
      url: '/postJob',
      templateUrl: 'app/views/postJob.view.html',
      controller: 'JobCtrl'
    })
    .state('foIntDetails', {
      url: '/foIntDetails',
      templateUrl: 'app/views/foIntDetails.view.html',
      controller: 'JobCtrl'
    })
    .state('appDetails', {
      url: '/appDetails',
      templateUrl: 'app/views/appDetails.view.html',
      controller: 'JobCtrl'
    })
    .state('forgotPassword', {
      url: '/forgotPassword',
      templateUrl: 'app/views/forgotPassword.view.html',
      controller: 'UserCtrl'
    })
    .state('resetPassword', {
      url: '/resetPassword',
      templateUrl: 'app/views/resetPassword.view.html',
      controller: 'UserCtrl'
    })
    .state('userProfile', {
      url: '/userProfile',
      templateUrl: 'app/views/userProfile.view.html',
      controller: 'UserCtrl'
    })
    .state('foProfile', {
      url: '/foProfile',
      templateUrl: 'app/views/foProfile.view.html',
      controller: 'FarmOwnerCtrl'
    })
    .state('foEditProfile', {
      url: '/foEditProfile',
      templateUrl: 'app/views/foEditProfile.view.html',
      controller: 'FarmOwnerCtrl'
    })
    .state('foSettings', {
      url: '/foSettings',
      templateUrl: 'app/views/foSettings.view.html',
      controller: 'FarmOwnerCtrl'
    })
    .state('editProfile', {
      url: '/editProfile',
      templateUrl: 'app/views/editProfile.view.html',
      controller: 'UserCtrl'
    })
    .state('settings', {
      url: '/settings',
      templateUrl: 'app/views/settings.view.html',
      controller: 'UserCtrl'
    })
    .state('search', {
      url: '/search',
      templateUrl: 'app/views/search.view.html',
      controller: 'SearchCtrl'
    })
    .state('apply', {
      url: '/apply',
      templateUrl: 'app/views/apply.view.html',
      controller: 'JobCtrl'
    });

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);

    $httpProvider.interceptors.push(['$q', '$location', function($q, $location) {
      return {
        'request': function(config) {
          config.headers = config.headers || {};
          if (localStorage.getItem('token') || localStorage.getItem('foToken')) {
            config.headers['x-access-token'] = localStorage.getItem('token') || localStorage.getItem('foToken');
            // $location.url('/dashboard');
          }
          return config;
        },
        'responseError': function(response) {
          if (response.status === 403) {
            // $location.url('/');
          }
          return $q.reject(response);
        }
      };
    }]);

}]);



// angular.module('farmplace').run([
//   '$http',
//   '$rootScope',
//   '$state',
//   '$location',
//   'UserService',
//   function($http, $rootScope, $state, $location, UserService) {
//     var token = localStorage.getItem('token');
//     $http.defaults.headers.common['x-access-token'] = token;

//     $rootScope.$on('$stateChangeStart', function(event, toState) {
//       if (UserService.checkUser()) {
//         if (toState.templateUrl == 'app/views/landing.view.html' || toState.templateUrl == 'app/views/signup.view.html') {
//           $location.path('/dashboard');
//         }
//       }
//     });
// }]);


