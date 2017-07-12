'use strict';

/**
 * @definition de l'app
 * @name naview
 * @description controller
 * @for connection
 */

var app = angular.module('naview');

function ConnectController($scope, $http, API, $location, jwtHelper, auth, $rootScope, $window, ModalService) {
  // variables init
  $scope.status = "Log in";
  $scope.wait = 0;
  $scope.form = 1;
  $rootScope.atlogin = true;
  AOS.init({
    disable: window.innerWidth < 1024
  });

  if (auth.getToken() &&!jwtHelper.isTokenExpired(auth.getToken())) {
    $scope.form = 0
    $scope.user = auth.getUser();
    $scope.wait = 1;
    // setTimeout(function (){
      $location.path("homepage");
    // }, 300);
  }
  $scope.TwitterAuth = function() {
    console.log('TwitterAuth');
    $window.open(API + '/users/auth/twitter');
  };

  $scope.FbAuth = function() {
    console.log('FBAuth');
    $window.open(API + '/users/auth/facebook');
  };
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
      url: API + '/users/login',
      data: naview_user,
      headers: {
          'Content-Type': 'application/json'
      }
    }).then(function successCallback(response) {
      // this callback will be called asynchronously
      // when the response is available
      auth.saveToken(response.data.token);
      $location.path("homepage");
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      console.log(response);
      if (response.status === -1) {
        $scope.error = 1;
        $scope.status = "Log in";
        $scope.wait = 0;
        $scope.response = response.data.message;
      }
      else if (response.status === 401) {
        $scope.error = 1;
        $scope.status = "Log in";
        $scope.wait = 0;
        $scope.response = response.data.message;
      }
      else {
        $scope.error = 0;
        $scope.response = response.data;
      }
    });
  }
};

app.controller('ConnectController', ['$scope', '$http', 'API', '$location', 'jwtHelper', 'auth', '$rootScope', '$window' , "ModalService",  ConnectController]);
