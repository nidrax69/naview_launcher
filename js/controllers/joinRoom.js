'use strict';

/**
 * @definition de l'app
 * @name naview
 * @description controller
 * @for joiningRoom
 */

var app = angular.module('naview');

function JoinRoomController($scope, $http, API, $location, auth, ModalService, ClientURL) {
  var child = require('child_process').execFile;
  var user = auth.getUser();

  var executablePath = ClientURL;

  $scope.homepage = function () {
    $location.url("/homepage");
  };

  $scope.join = function (room) {
    if (room.private) {
      ModalService.showModal({
        templateUrl: "src/passwordRoom.html",
        controller: "PasswordRoomController",
        inputs: {
          idroom: room._id
        }
      }).then(function(modal) {
       // The modal object has the element built, if this is a bootstrap modal
       // you can call 'modal' to show it, if it's a custom modal just show or hide
       // it as you need to.
       modal.element.modal();
       modal.close.then(function(result) {
         if (result === "error") {

         }
         else {
           var parameters = ["token=\"" + auth.getToken() + "\" id=\"" + user._id + "\" roomid=\"" + room._id + "\""];
           child(executablePath,  function(err, data) {
                console.log(err)
                console.log(data.toString());
           });
         }

      });
    });
    }
    else {
      var parameters = ["token=\"" + auth.getToken() + "\" id=\"" + user._id + "\" roomid=\"" + room._id + "\""];
      child(executablePath,  function(err, data) {
           console.log(err)
           console.log(data.toString());
      });
    }
  }

  $scope.getFavorites = function () {
    $http({
      method: 'GET',
      url: API + '/users/getfavories'
    }).then(function successCallback(response) {
      // this callback will be called asynchronously
      // when the response is available
      $scope.fav = response.data.message;
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      console.log(response);
    });
  };

  $scope.getFavorites();

  $scope.addFavorites = function (room, i) {
    // if already liked, delete fav
    if ($scope.rooms[i].fav === true) {
      $http({
        method: 'POST',
        url: API + '/users/deletefavorie',
        data: {
          idroom : $scope.rooms[i]._id
        }
      }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        $scope.rooms[i].fav = false;
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
    }
    else {
      $http({
        method: 'POST',
        url: API + '/users/addfavories',
        data: {
          idroom : room._id
        }
      }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        $scope.rooms[i].fav = true;
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
    }
  }

  $scope.getRoom = function() {
    var val = $scope.search;
    if (val === "") {
      $scope.rooms = [];
    }
    else {
      $http({
        method: 'POST',
        url: API + '/room/getbyname',
        data: {
          name : $scope.search
        },
        headers: {
            'Content-Type': 'application/json'
        }
      }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        $scope.rooms = response.data;
        angular.forEach($scope.rooms, function(value, key) {
          angular.forEach($scope.fav, function(value2, key2) {
            if (value._id === value2._id) {
              $scope.rooms[key].fav = true;
            }
          });
        });
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.

      });
    }
 };
}

app.controller('JoinRoomController', ['$scope', '$http', 'API', '$location', 'auth', 'ModalService', 'ClientURL' , JoinRoomController]);
