'use strict';

/**
 * @definition de l'app
 * @name naview
 * @description controller
 * @for connection
 */

var app = angular.module('naview');

function ProfileController($scope, $http, API, $location) {
    console.log("test 2")

    // Ajax ici pour récupéré l'avatar choisi
    $scope.userAvatar = 0;

    $scope.avatars = [{
      id: 0,
      image: 'images/avatar/android.jpg',
      name: 'Android',
      description: 'Avatar android, attendez, on fait avec les moyens qu\' on à...'
    }, {
      id: 1,
      image: 'images/avatar/cowboy.jpg',
      name: 'Cow Boy',
      description: 'Un cow-boy dans une forêt... Sympa !'
    }];


    $scope.homepage = function () {
        console.log("test")
        $location.url("/homepage");
    };

    $scope.change = function (id) {
      // request ajax poru changer en bdd
      $scope.userAvatar = id;
    }

};

app.controller('ProfileController', ['$scope', '$http', 'API', '$location' , ProfileController]);
