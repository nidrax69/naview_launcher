'use strict';

/**
 * @definition de l'app
 * @name naview
 * @description controller
 * @for connection
 */

var app = angular.module('naview');

function ProfileController($scope, $http, API, $location, auth) {
    console.log("test 2")
    $scope.status = "Modifier";
    var user = auth.getUser();

    $scope.userAvatar = -1;
    $http({
      method: 'GET',
      url: API + '/users/profile',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((data) => {
      console.log(data.data)
      $scope.user = data.data;
      $scope.userAvatar = data.data.avatar || -1;
    })



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

    $scope.changeAvatar = function (id) {
      // request ajax poru changer en bdd
      $http({
        method: 'PUT',
        url: API + '/users/updateprofile',
        data: {
          avatar: ''+id
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(() => {
        console.log('change')
        $scope.userAvatar = id;
      })


    }

    $scope.change = function (id) {
      // request ajax poru changer en bdd
      var inst = $('[data-remodal-id=modal]').remodal();
      $http({
        method: 'PUT',
        url: API + '/users/updateprofile',
        data: $scope.user,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function successCallback(response) {
        inst.open();
        auth.logout();
        $location.url("/");
        $window.location.reload();
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        $scope.error = response;
      });

    }

};

app.controller('ProfileController', ['$scope', '$http', 'API', '$location', 'auth' , ProfileController]);
