'use strict';

/**
 * @definition de l'app
 * @name naview
 * @description controller
 * @for connection
 */

var app = angular.module('naview');

function ConnectController($scope, $http) {
  // variables init
  $scope.status = "Log in";
  $scope.wait = 0;

  // log to app
  $scope.log = function () {
    $scope.wait = 1;
    $scope.status = "";
    // get user credential
    var naview_user = {
      username : $scope.username,
      password : $scope.password
    };
    $http({
      method: 'POST',
      url: '/login',
      data: naview_user,
      headers: {
          'Content-Type': 'application/json'
      }
    }).then(function successCallback(response) {
      // this callback will be called asynchronously
      // when the response is available
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      if (response.status === -1) {
        $scope.error = "Verify if you're connected to the Internet";
        $scope.status = "Log in";
        $scope.wait = 0;
      }
      else if (response.status) {
        $scope.error = "Error Server 500, please connect later";
        $scope.status = "Log in";
        $scope.wait = 0;
      }
      else {

      }
    });
  }
};

app.controller('ConnectController', ['$scope', '$http', ConnectController]);
