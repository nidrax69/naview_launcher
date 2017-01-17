'use strict';

/**
 * @definition de l'app
 * @name naview
 * @description controller
 * @for connection
 */

var app = angular.module('naview');

function SettingsController($scope, $http, API, $location) {
  $scope.smallScreen = function () {
    self.resizeTo(Math.floor(screen.width / 1.7), Math.floor(screen.height / 1.7));
  };

  $scope.defaultScreen = function () {
    self.resizeTo(Math.floor(screen.width / 1.2), Math.floor(screen.height / 1.2));

  };
  $scope.largeScreen = function () {
    self.resizeTo(Math.floor(screen.width / 1), Math.floor(screen.height / 1));

  };
  $scope.changeColor = function () {
    document.getElementById("body").style.backgroundColor="red";
  };
};

app.controller('SettingsController', ['$scope', '$http', 'API', '$location' , SettingsController]);
