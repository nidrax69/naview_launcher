'use strict';

/**
 * @definition de l'app
 * @name naview
 * @description controller
 * @for connection
 */

var app = angular.module('naview');

function HomePageController($scope, $http, API, $location, $rootScope, ModalService) {
  $scope.showProfile = true;
  $scope.btsClass = "col-sm-4";
  $scope.noAnom = "";
  $scope.count = 0;
  $rootScope.atlogin = false;
  AOS.init({
    disable: 'mobile'
  });

  $scope.joinRoom = function () {
    $location.url("/room/join");
  }

  $scope.favoriteRoom = function () {
    $location.url("/room/favorites");
  }

  $scope.profile = function () {
    $location.url("/profile");
  }

  $scope.createRoom = function () {
      ModalService.showModal({
        templateUrl: "src/createRoom.html",
        controller: "CreateRoomController"
      }).then(function(modal) {
       // The modal object has the element built, if this is a bootstrap modal
       // you can call 'modal' to show it, if it's a custom modal just show or hide
       // it as you need to.
       modal.element.modal();
       modal.close.then(function(result) {
        $scope.message = result ? "You said Yes" : "You said No";
      });
    });
  }
  $scope.favoritesRoom = function () {
    $location.url("/room/favorites");
  }

  // hide content
  $scope.hideContent = function (value) {
    if (value === 1) {
      $scope.showProfile = false;
      $scope.btsClass = "col-sm-6 col-sm-push-1";
      $scope.noAnom = "remove-an";
    }
    if (value === 0) {
      $scope.showProfile = true;
      $scope.count = 0;
      $scope.btsClass = "col-sm-4";
      $scope.noAnom = "";
    }
  };
};

app.controller('HomePageController', ['$scope', '$http', 'API', '$location', '$rootScope', 'ModalService' , HomePageController]);
