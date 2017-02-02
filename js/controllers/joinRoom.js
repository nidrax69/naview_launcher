'use strict';

/**
 * @definition de l'app
 * @name naview
 * @description controller
 * @for joiningRoom
 */

var app = angular.module('naview');

function JoinRoomController($scope, $http, API, $location) {
  $scope.homepage = function () {
    $location.url("/homepage");
  };

  $scope.getRoom = function() {
    var val = $scope.search;
    if (val === "") {
      $scope.rooms = [];
    }
    else {
      $http({
        method: 'GET',
        url: API + '/room'
      }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        $scope.rooms = response.data;
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.

      });
    }
 };
}

app.controller('JoinRoomController', ['$scope', '$http', 'API', '$location' , JoinRoomController]);
