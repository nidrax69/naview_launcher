'use strict';

/**
 * @definition de l'app
 * @name naview
 * @description controller
 * @for connection
 */

var app = angular.module('naview');

function SettingsController($scope, $http, API, $location) {
  $scope.logout = function () {
    $location.url("/");
  };
  $scope.locate = function () {
    $location.url("homepage");
  }
};

app.controller('SettingsController', ['$scope', '$http', 'API', '$location' , SettingsController]);
