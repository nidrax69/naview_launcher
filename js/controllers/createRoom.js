'use strict';

/**
 * @definition de l'app
 * @name naview
 * @description controller
 * @for joiningRoom
 */

var app = angular.module('naview');

function CreateRoomController($scope, $http, API, $location) {
  $scope.homepage = function () {
    $location.url("/homepage");
  };

  $scope.room = {};
  $scope.room.ip = "193.939.93.39";
  $scope.room.datebegin = new Date();
  $scope.room.nbuser = 10;
  $scope.room.private = false;

  $scope.reset = function () {
    $scope.room.pwd = "";
  }

  $scope.createRoom = function() {
    $http({
      method: 'POST',
      url: API + '/room',
      data: $scope.room,
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
 };

};

app.controller('CreateRoomController', ['$scope', '$http', 'API', '$location' , CreateRoomController]);
