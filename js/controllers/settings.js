'use strict';

/**
 * @definition de l'app
 * @name naview
 * @description controller
 * @for connection
 */

var app = angular.module('naview');

function SettingsController($scope, $http, API, $location) {
  $scope.screen = function (a) {
    self.resizeTo(Math.floor(screen.width / a), Math.floor(screen.height / a));
  };
  $scope.changeColor = function (a) {
    document.getElementById("body").style.backgroundColor = a;
  };
};

app.controller('SettingsController', ['$scope', '$http', 'API', '$location' , SettingsController]);
