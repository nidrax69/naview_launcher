'use strict';

/**
 * @definition de l'app
 * @name naview
 * @description controller
 * @for register
 */

var app = angular.module('naview');

function RegisterController($scope, $http, $location) {
  // variables init
  $scope.status = "Register";
  $scope.wait = 0;
  $scope.user = {};

  // log to app
  $scope.reg = function () {
    $scope.wait = 1;
    $scope.status = "";
    $http({
      method: 'POST',
      url: '/register',
      data: $scope.user,
      headers: {
          'Content-Type': 'application/json'
      }
    }).then(function successCallback(response) {
      // this callback will be called asynchronously
      // when the response is available
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });
  }

  //locate homepage
  $scope.locate = function () {
    $location.url("/");
  }
};

app.controller('RegisterController', ['$scope', '$http', '$location', RegisterController]);
