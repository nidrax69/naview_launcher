'use strict';

/**
 * @definition de l'app
 * @name naview
 * @description controller
 * @for connection
 */

var app = angular.module('naview');

function HomePageController($scope, $http, API, $location) {
  $scope.showProfile = true;
  $scope.showChoice1 = true;
  $scope.showChoice2 = true;
  $scope.showChoice3 = true;
  $scope.btsClass = "col-sm-3";
  $scope.noAnom = "";
  $scope.count = 0;

  $scope.logout = function () {
    $location.url("/");
  };
  $scope.settings = function () {
    $location.url("/settings");
  };

  // hide content
  $scope.hideContent = function (value) {
    if ($scope.count === 0) {
      $scope.showProfile = false;
      $scope.btsClass = "col-sm-4 col-sm-push-1";
      $scope.noAnom = "remove-an";
      $scope.showChoice1 = false;

      setTimeout(function (){
        // Something you want delayed.
        $scope.showChoice2 = false;
        $scope.$apply();
        setTimeout(function (){
          $scope.showChoice3 = false;
          $scope.$apply();
        }, 300);


        $scope.$apply();

      }, 300);
      $scope.count = 1;
    }
    else if ($scope.count === 1 && value !== 3) {
      $scope.showProfile = true;
      $scope.showChoice1 = true;
      $scope.showChoice2 = true;
      $scope.showChoice3 = true;
      $scope.count = 0;
      $scope.btsClass = "col-sm-3";
      $scope.noAnom = "";
    }
  };
};

app.controller('HomePageController', ['$scope', '$http', 'API', '$location' , HomePageController]);
