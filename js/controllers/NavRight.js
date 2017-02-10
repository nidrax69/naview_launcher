'use strict';

/**
 * @definition de l'app
 * @name naview
 * @description controller
 * @for navright
 */

var app = angular.module('naview');

function NavRightController($scope, $http, API, $location) {
    // récuperation version from package.json
    var pjson = require('./package.json');
    $scope.version = pjson.version;
    $scope.newsActive = "";
    $scope.friendsActive = "active";
    $scope.messages = [];
    $scope.friends = true;

    $scope.getFriendList = function () {

    }

    $scope.closealltabs = function (val) {
      angular.forEach($scope.messages, function (value, key) {
        if (val !== key)
          $scope.messages[key] = false;
      });
    }

    $scope.message = function (val) {
        $scope.messages[val] = $scope.messages[val] ? false : true;
    }

    $scope.swap = function (val) {
      if (val === 1) {
        $scope.newsActive = "";
        $scope.friendsActive = "active";
        $scope.friends = true;
        $scope.news = false;
      }
      else {
        $scope.newsActive = "active";
        $scope.friendsActive = "";
        $scope.news = true;
        $scope.friends = false;
      }
    }
}

app.controller('NavRightController', ['$scope', '$http', 'API', '$location' , NavRightController]);
