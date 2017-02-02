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

  $scope.getRoom = function(val) {
   return $http.get(API + "/room/" + val).then(function(response) {
     return response;
   });
 };
}

app.controller('JoinRoomController', ['$scope', '$http', 'API', '$location' , JoinRoomController]);
