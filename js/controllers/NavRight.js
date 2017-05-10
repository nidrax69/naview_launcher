'use strict';

/**
 * @definition de l'app
 * @name naview
 * @description controller
 * @for navright
 */

var app = angular.module('naview');

function NavRightController($scope, $http, API, $location, auth, socketFactory, $q) {
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
    $scope.messageList = [];
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

    $scope.activeMessage = function(id) {
      $scope.messageList[id].active = !$scope.messageList[id].active;
    };

    const messages = ['Salut comment ça va et toi ?', 'Tu as essayé la nouvelle application de Naview ?', 'Demain je serais dispo si tu veux te faire une petite aprem sur Naview', 'MDR', 'Trop Cool',
    "C'est du tonnerre"];

    $scope.isAuthed = function () {
      return auth.isAuthed ? auth.isAuthed() : false;
    };

    // DEMOs
    setInterval(function (){
      $scope.receiveRandomMessage();
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

    function getInfos(id) {
      var deferred = $q.defer();
      var getValue = false;
      var toSend, keyToSend;
      angular.forEach($scope.friendlist, function (value, key) {
        if (value.id === id) {
          getValue = true;
          toSend = [value, key];
        }
      });
      if (getValue) {
        deferred.resolve(toSend);
      }
      else {
        deferred.reject('What happened');
      }
      return deferred.promise;
    }


    $scope.sendMessage = function (val) {
      var promise = getInfos(val);
      promise.then(function(user_info) {
        // if input message not empty
        if ($scope.messageToSend[user_info[1]] !== "") {
            $scope.friendlist[user_info[1]].message.push({
              'text' : $scope.messageToSend[user_info[1]],
              'date' : Date.now(),
              'id' : $scope.myFakeID
            }
          );
          console.log($scope.friendlist[user_info[1]]);
          socketFactory.emit('user:message', { pseudo: $scope.myFakeID, message: $scope.messageToSend[user_info[1]]})
          $scope.messageToSend[user_info[1]] = "";
        }
      });
    }

    $scope.open = function (val) {
      var promise = getInfos(val);
      promise.then(function(user_info) {
        var need_to_create = true;
        if ($scope.messageList.length === 0) {
          var object_message = {
            id: val,
            active: true,
            name: user_info[0].name,
            message: user_info[0].message
          }
          $scope.messageList.push(object_message);
          $scope.roundedNotif[user_info[1]] = false;
          $scope.renewValue[user_info[1]] = 0;
        }
        else {
          angular.forEach($scope.messageList, function(value, key) {
            if (value.id === val) {
              need_to_create = false;
              $scope.messageList[key].active = !$scope.messageList[key].active;
            }
          });
          if (need_to_create) {
            var objet = {
              id: val,
              active: true,
              name: user_info[0].name,
              message: user_info[0].message
            }
            $scope.messageList.push(objet);
            objet = null;
          }
          $scope.roundedNotif[user_info[1]] = false;
          $scope.renewValue[user_info[1]] = 0;
        }
      }, function(reason) {
        console.log('Failed: ' + reason);
      });
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


app.controller('NavRightController', ['$scope', '$http', 'API', '$location', 'auth', 'socketFactory', '$q' , NavRightController]);
