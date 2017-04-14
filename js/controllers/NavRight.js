'use strict';

/**
 * @definition de l'app
 * @name naview
 * @description controller
 * @for navright
 */

var app = angular.module('naview');

function NavRightController($scope, $http, API, $location, auth, socketFactory) {
    // récuperation version from package.json
    var pjson = require('./package.json');

    $scope.version = pjson.version;
    $scope.newsActive = "";
    $scope.friendsActive = "active";
    $scope.messages = [];
    $scope.friends = true;
    $scope.myFakeID = "2";
    $scope.messageToSend = [];
    $scope.roundedNotif = [];
    $scope.numberNotif = [];
    $scope.renewValue = [];
    $scope.friendlist = [
        {
          'active' : false,
          'name' : 'Vincent',
          'id' : 3,
          'message' : [
          ],
          'connected' : true
        },
        {
          'active' : false,
          'name' : 'Nidrax',
          'id' : 4,
          'message' : [
          ],
          'connected' : true
        }
      ];

    const messages = ['Salut comment ça va et toi ?', 'Tu as essayé la nouvelle application de Naview ?', 'Demain je serais dispo si tu veux te faire une petite aprem sur Naview', 'MDR', 'Trop Cool',
    "C'est du tonnerre"];

    $scope.isAuthed = function () {
      return auth.isAuthed ? auth.isAuthed() : false;
    };

    // DEMOs
    setInterval(function (){
      // $scope.receiveRandomMessage();
      $scope.$apply();
    }, Math.round(Math.random() * (3000 - 500)) + 1500);

    $scope.$watch('friendlist', function(newNames, oldNames) {
      angular.forEach(newNames, function (value, i) {
        if ($scope.renewValue[i] === 0)
          $scope.renewValue[i] = oldNames[i].message.length;
        if (value.message.length !== oldNames[i].message.length && !value.active) {
          $scope.roundedNotif[i] = true;
          $scope.numberNotif[i]++;
          doNotify(value.name);
        }
      });
    }, true);

    $scope.receiveRandomMessage = function () {
      var user = $scope.friendlist[Math.floor(Math.random()*$scope.friendlist.length)];

      angular.forEach($scope.friendlist, function (value, key) {
        var messagelol = messages[Math.round(Math.random()*messages.length)];
        if (value.id === user.id) {
          $scope.friendlist[key].message.push({
              'text' : messagelol,
              'date' : Date.now(),
              'id' : user.id
          });
        }
      })
    };


    $scope.sendMessage = function (val) {
      if ($scope.messageToSend[val] !== "") {
        $scope.friendlist[val].message.push( {
            'text' : $scope.messageToSend[val],
            'date' : Date.now(),
            'id' : $scope.myFakeID
        }
        );
        socketFactory.emit('user:message', { pseudo: $scope.myFakeID, message: $scope.messageToSend[val]})
        $scope.messageToSend[val] = "";
      }
    }

    $scope.closealltabs = function (val) {
      angular.forEach($scope.friendlist, function (value, key) {
        if (val !== key)
          $scope.friendlist[key].active = false;
      });
    }

    $scope.open = function (val) {
        $scope.friendlist[val].active = $scope.friendlist[val].active ? false : true;
        $scope.roundedNotif[val] = false;
        $scope.renewValue[val] = 0;
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

    $scope.logout = function () {
      auth.logout();
      $location.url("/");
    };
    $scope.settings = function () {
      $location.url("/settings");
    };
}


app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});


app.controller('NavRightController', ['$scope', '$http', 'API', '$location', 'auth', 'socketFactory' , NavRightController]);
