'use strict';

/**
 * @definition de l'app
 * @name naview
 * @description controller
 * @for joiningRoom
 */

var app = angular.module('naview');

function PasswordRoomController($scope, $http, API, $location, auth, ModalService, idroom, close, $element) {
    $scope.wait = 0;

    $scope.dismissModal = function () {
      $element.modal('hide');
      close(null, 1000);
    };

    console.log(idroom);
    $scope.room = {};
    $scope.room.idroom = idroom;

    $scope.enterPassword = function() {
      console.log("lel");
      $scope.wait = 1;
      $http({
        method: 'POST',
        url: API + '/room/verifpassword',
        data: $scope.room,
        headers: {
            'Content-Type': 'application/json'
        }
      }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        if (!response.data.password) {
          $scope.error = "Error password"
          close("error", 1000);
        }
        else {
          setTimeout(function (){
            $scope.wait = 0;
            $scope.dismissModal();
          }, 2500);
        }

      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        setTimeout(function (){
          $scope.wait = 0;
        }, 2500);
      });
    }
}

app.controller('PasswordRoomController', ['$scope', '$http', 'API', '$location', 'auth', 'ModalService', 'idroom', 'close', '$element' , PasswordRoomController]);
