'use strict';

/**
 * @definition de l'app
 * @name naview
 * @description controller
 * @for joiningRoom
 */

var app = angular.module('naview');

function CreateRoomController($scope, $http, API, $location, close, $element) {
  $scope.homepage = function () {
    $location.url("/homepage");
  };
  $scope.wait = 0;
  $scope.room = {};
  $scope.room.nbuser = 10;
  $scope.room.private = false;

  $scope.reset = function () {
    $scope.room.pwd = "";
  }

  $scope.dismissModal = function () {
    $element.modal('hide');
    close(null, 1000);
  };

  $scope.createRoom = function() {
    $scope.wait = 1;
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
      setTimeout(function (){
        $scope.wait = 0;
        $scope.dismissModal();
      }, 2500);
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      setTimeout(function (){
        $scope.wait = 0;
        $scope.dismissModal();
      }, 2500);
    });
 };

};

app.controller('CreateRoomController', ['$scope', '$http', 'API', '$location', 'close', '$element', CreateRoomController]);
