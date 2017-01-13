'use strict';

angular.module('naview', [
  'ngRoute',
  'ngResource',
  'ngSanitize',
  'ui.bootstrap',
  'ngCookies',
  'ngMaterial'
]).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('!');

  $locationProvider.html5Mode({enabled: false, requireBase: false});

  $routeProvider
  .when('/', {
    templateUrl: './src/connexion.html',
    controller: 'ConnectController',
    controllerAs: 'connect'
  })
  .when('/register', {
    templateUrl: './src/register.html',
    controller: 'RegisterController',
    controllerAs: 'register'
  })
  .when('/homepage', {
    templateUrl: './src/homepage.html',
    controller: 'HomePageController',
    controllerAs: 'homepage'
  })
  .when('/settings', {
    templateUrl: './src/settings.html',
    controller: 'SettingsController',
    controllerAs: 'settings'
  })
  .otherwise({
    redirectTo: '/'
  });

}]).run( function($rootScope, $location) {
   $rootScope.$watch(function() {
      return $location.path();
    },
    function(a){
      console.log('url has changed: ' + a);
      // show loading div, etc...
    });
});
