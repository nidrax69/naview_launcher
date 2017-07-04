'use strict';

/**
 * @definition de l'app
 * @name naview
 * @description controller
 * @for joiningRoom
 */

var app = angular.module('naview');

function JoinRoomController($scope, $http, API, $location, auth) {
  var child = require('child_process').execFile;
  var user = auth.getUser();
  console.log(user);
  var executablePath = "./client/Naview/WindowsNoEditor/Naview.exe";

  $scope.homepage = function () {
    $location.url("/homepage");
  };

  $scope.join = function (room_id) {
    var parameters = ["token=" + auth.getToken() + " " + "user_id=" + user._id + " " + "room_id=" + room_id];
    child(executablePath, parameters,  function(err, data) {
         console.log(err)
         console.log(data.toString());
    });
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
        console.log(response.data);
        $scope.rooms = response.data;
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.

      });
    }
 };
}

app.controller('JoinRoomController', ['$scope', '$http', 'API', '$location', 'auth' , JoinRoomController]);
