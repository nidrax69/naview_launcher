'use strict';

angular.module('naview', [
  'ngRoute',
  'ngResource',
  'ngSanitize',
  'ui.bootstrap',
  'ngCookies',
  'ngMaterial',
  'ngAnimate',
  'picardy.fontawesome',
  'luegg.directives',
  'angular-jwt',
  'angularModalService',
  'ui.router'
]).config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('main', {
      url: '/',
      views: {
        "main@" : {
          templateUrl: './src/connexion.html',
          controller: 'ConnectController',
        }
      }
    })
    .state('register', {
      url: '/register',
      views: {
        "main" : {
          templateUrl: './src/register.html',
          controller: 'RegisterController'
        }
      }
    })
    .state('homepage', {
      url: '/homepage',
      views: {
        "connected@" : {
          templateUrl : './src/friendlist.html',
          controller : 'NavRightController'
        },
        "main@" : {
          templateUrl : './src/homepage.html',
          controller: 'HomePageController',
        }
      }
    })
    .state('homepage.content', {
      url: "/homepage/content",
      views: {
        "main@" : {
          templateUrl : './src/homepage.html',
          controller: 'HomePageController',
        }
      }
    })
    .state('homepage.profile', {
      url : "/homepage/profile",
      views: {
        "main@" : {
          templateUrl: './src/profile.html',
          controller: 'ProfileController',
        }
      }
    })
    .state('settings', {
      templateUrl: './src/settings.html',
      controller: 'SettingsController',
      url: '/settings',
      views: {
        "connected" : {
          templateUrl : './src/friendlist.html',
          controller : 'NavRightController'
        },
        "" : {
          templateUrl : './src/homepage.html',
          controller: 'HomePageController',
        }
      }
    })
    .state('homepage.roomjoin', {
      url: '/homepage/room/join',
      views: {
        "main@" : {
          templateUrl: './src/joinRoom.html',
          controller: 'JoinRoomController',
        }
      }
    })
    .state('homepage.roomfav', {
      url: '/homepage/room/favorites',
      views: {
        "main@" : {
          templateUrl: './src/favorites.html',
          controller: 'JoinRoomController',
        }
      }
    });

});
// config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
//   $locationProvider.hashPrefix('!');
//
//   $locationProvider.html5Mode({enabled: false, requireBase: false});
//
//   $routeProvider
//   .when('/', {
//     templateUrl: './src/connexion.html',
//     controller: 'ConnectController',
//     controllerAs: 'connect'
//   })
//   .when('/register', {
//     templateUrl: './src/register.html',
//     controller: 'RegisterController',
//     controllerAs: 'register'
//   })
//   .when('/homepage', {
//     templateUrl: './src/homepage.html',
//     controller: 'HomePageController',
//     controllerAs: 'homepage'
//   })
//   .when('/settings', {
//     templateUrl: './src/settings.html',
//     controller: 'SettingsController',
//     controllerAs: 'settings'
//   })
//   .when('/room/join', {
//     templateUrl: './src/joinRoom.html',
//     controller: 'JoinRoomController',
//     controllerAs: 'join'
//   })
//   .when('/room/create', {
//     templateUrl: './src/createRoom.html',
//     controller: 'CreateRoomController',
//     controllerAs: 'create'
//   })
//   .otherwise({
//     redirectTo: '/'
//   });
//
// }]);
