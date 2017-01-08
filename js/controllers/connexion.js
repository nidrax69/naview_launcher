'use strict';

/**
 * @definition de l'app
 * @name naview
 * @description controller
 * @for connection
 */

var app = angular.module('naview');

function ConnectController($scope, $http, API) {
  // variables init
  $scope.status = "Log in";
  $scope.wait = 0;

  // log to app
  $scope.log = function () {
    $scope.wait = 1;
    $scope.status = "";
    $scope.error = 0;
    // get user credential
    var naview_user = {
      username : $scope.username,
      password : $scope.password
    };
    $http({
      method: 'POST',
      url: API + '/login',
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
      console.log(response);
      if (response.status === -1) {
        $scope.error = 1;
        $scope.status = "Log in";
        $scope.wait = 0;
        $scope.response = response.data;
      }
      else if (response.status === 404) {
        $scope.error = 1;
        $scope.status = "Log in";
        $scope.wait = 0;
        $scope.response = response.data;
      }
      else {
        $scope.error = 0;
        $scope.response = response.data;
      }
    });
  }
};

app.controller('ConnectController', ['$scope', '$http', 'API' , ConnectController]);
