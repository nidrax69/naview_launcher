'use strict';

/**
 * @definition de l'app
 * @name naview
 * @description controller
 * @for navright
 */

var app = angular.module('naview');

function NavRightController($scope, $http, API, $location, auth, socketFactory, $q, $window) {
    // récuperation version from package.json
    var pjson = require('./package.json');

    $scope.version = pjson.version;
    $scope.newsActive = "";
    $scope.friendsActive = "active";
    $scope.messages = [];
    $scope.friends = true;
    $scope.user = auth.getUser();
    $scope.messageToSend = [];
    $scope.roundedNotif = [];
    $scope.numberNotif = [];
    $scope.renewValue = [];
    $scope.messageList = [];

    socketFactory.on('connect', function() {
        socketFactory.emit('authenticate', {token: auth.getToken()}); //send the jwt
        socketFactory.on('authenticated', function () {
          socketFactory.emit('user:login', auth.getUser());
        });
        socketFactory.on('unauthorized', function(msg) {
          console.log("unauthorized: " + JSON.stringify(msg.data.message));
        });
    });
    
    $scope.friendlist= [];

    $scope.addFriend = function(el) {
      socketFactory.emit('friend:add', el);
    };

    socketFactory.on('friend:add', (user) => {
      $scope.messageFriendError = "";
      for (let id in $scope.friendlist)
        if ($scope.friendlist[id]._id == user._id) {
          $scope.friendlist[id] = user;
          return ;
        }
      $scope.friendlist.push(user)
    });

    $scope.messageFriendError = "";
    socketFactory.on('friend:error', (err) => {
      $scope.messageFriendError = err;
    });

    $scope.activeMessage = function(id) {
      $scope.messageList[id].active = !$scope.messageList[id].active;
    };

    // Listening on the server to receive users connected
    socketFactory.on('send:users', function(users){
      console.log(users);
      $scope.friendlist = users;
    });

    // Listening on the Server,  inform that a new user is connected
    socketFactory.on('new:connection', function(users){
      $scope.friendlist = users;
    });

    // Listening on messages coming from the server
    socketFactory.on('send:message', function(message){
      console.log(message);
      var promise = getInfos(message.pseudo);
      promise.then(function(user_info) {
        $scope.friendlist[user_info[1]].message.push({
          'text' : message.message,
          'date' : message.date,
          '_id' : message.pseudo
        });
        $scope.roundedNotif[message.pseudo] = true;
        $scope.numberNotif[message.pseudo]++;
      });
    });

    // Check if authenticated on the Angular APP
    $scope.isAuthed = function () {
      return auth.isAuthed ? auth.isAuthed() : false;
    };

    // Get information on a user with an id
    function getInfos(id) {
      var deferred = $q.defer();
      var getValue = false;
      var toSend, keyToSend;
      angular.forEach($scope.friendlist, function (value, key) {
        if (value._id === id) {
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

    // Send a message to an user connected to the server
    $scope.sendMessage = function (val) {
      var promise = getInfos(val);
      promise.then(function(user_info) {
        // if input message not empty
        if ($scope.messageToSend[val] !== "") {
            $scope.friendlist[user_info[1]].message.push({
              'text' : $scope.messageToSend[val],
              'date' : Date.now(),
              '_id' : $scope.user._id
            });
          socketFactory.emit('user:message', { pseudo: $scope.user._id, message: $scope.messageToSend[val], socket_id: $scope.friendlist[user_info[1]].socket_id});
          $scope.messageToSend[val] = "";
        }
      });
    }

    // Open message box for the chat application
    $scope.open = function (val) {
      var promise = getInfos(val);
      promise.then(function(user_info) {
        var need_to_create = true;
        if ($scope.messageList.length === 0) {
          var object_message = {
            _id: val,
            active: true,
            username: user_info[0].username,
            message: user_info[0].message
          }
          $scope.messageList.push(object_message);
          $scope.roundedNotif[val] = false;
          $scope.renewValue[val] = 0;
        }
        else {
          angular.forEach($scope.messageList, function(value, key) {
            if (value._id === val) {
              need_to_create = false;
              $scope.messageList[key].active = !$scope.messageList[key].active;
            }
          });
          if (need_to_create) {
            var objet = {
              _id: val,
              active: true,
              username: user_info[0].username,
              message: user_info[0].message
            }
            $scope.messageList.push(objet);
            objet = null;
          }
          $scope.roundedNotif[val] = false;
          $scope.renewValue[val] = 0;
        }
      }, function(reason) {
        console.log('Failed: ' + reason);
      });
    }

    // swap between News or Chat function
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

    // Emit message to the server to inform that the current user is disconnected.
    $scope.logout = function () {
      socketFactory.emit("user:disconnect", auth.getUser());
      auth.logout();
      $location.url("/");
      $window.location.reload();
    };
    $scope.settings = function () {
      $location.url("/settings");
    };
}

// Press enter > Send Message
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


app.controller('NavRightController', ['$scope', '$http', 'API', '$location', 'auth', 'socketFactory', '$q', '$window' , NavRightController]);
