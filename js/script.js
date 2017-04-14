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
      templateUrl: './src/connexion.html',
      controller: 'ConnectController',
    })
    .state('register', {
      url: '/register',
      templateUrl: './src/register.html',
      controller: 'RegisterController'
    })
    .state('homepage', {
      url: '/homepage',
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
    .state('roomjoin', {
      url: '/room/join',
      views: {
        "connected" : {
          templateUrl : './src/friendlist.html',
          controller : 'NavRightController'
        },
        "" : {
          templateUrl: './src/joinRoom.html',
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
