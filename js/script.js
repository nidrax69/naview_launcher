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
  .otherwise({
    redirectTo: '/'
  });

}]);
