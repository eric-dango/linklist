'use strict';


var linklistApp = angular
  .module('linklistApp', [
    'ngResource',
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngResource',
    'ui.router',
    'ngSanitize',
    'ngTouch'
  ]);

linklistApp.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");

  //
  // Now set up the states

  $stateProvider
    .state('index', {
      url: '/',
      data: {
        requireLogin: true
      },
      views: {
        '': {
          templateUrl: 'views/main.html'
        },
        'topbar@index': {
          templateUrl: 'views/_topbar.html'
        },
        'urlInput@index': {
          templateUrl: 'views/_urlInput.html'
        }
      },
      controller: 'MainCtrl'
  });

  $stateProvider
    .state('login', {
      url: '/login',
      data: {
        requireLogin: false
      },
      views: {
        '': {
          templateUrl: 'views/login.html'
        },
        'topbar@login': {
          templateUrl: 'views/_topbar.html'
        },
        'errorbar@login': {
          templateUrl: 'views/_errorbar.html'
        }
      },
      controller: 'LoginCtrl'
  });

  $stateProvider
    .state('register', {
      url: '/register',
      data: {
        requireLogin: false
      },
      views: {
        '': {
          templateUrl: 'views/register.html'
        },
        'topbar@register': {
          templateUrl: 'views/_topbar.html'
        },
        'errorbar@login': {
          templateUrl: 'views/_errorbar.html'
        }
      },
      controller: 'RegisterCtrl'
  });

  $stateProvider
    .state('about', {
      url: '/about',
      data: {
        requireLogin: false
      },
      views: {
        '': {
          templateUrl: 'views/about.html'
        },
        'topbar@about': {
          templateUrl: 'views/_topbar.html'
        }
      }
  })

  $httpProvider.interceptors.push(function($q, $location) {
    return {
      'responseError': function(response) {
        if(response.status === 401 || response.status === 403) {
          $location.path('/login');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    }
  });

})
.run(function ($rootScope, $state, Auth) {
  $rootScope.$on("$stateChangeStart", function (event, toState, toParams) {
    var requireLogin = toState.data.requireLogin;
    //JWT
    if(requireLogin) {
      
      Auth.isLoggedIn(function() {
        
      }, function () {
        event.preventDefault();
        $state.go('login');
      });
    }
  });
})
