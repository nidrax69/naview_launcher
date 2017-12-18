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
    $scope.notifications = false;
    $scope.user = auth.getUser();
    $scope.messageToSend = [];
    $scope.roundedNotif = [];
    $scope.numberNotif = [];
    $scope.renewValue = [];
    $scope.friendsReqs = [

    ];
    $scope.messageList = [];
    $scope.formData = {};

    socketFactory.on('connect', function() {
        // socketFactory.emit('authenticate', {token: auth.getToken()}); //send the jwt
        //socketFactory.on('authenticated', function () {

          socketFactory.emit('user:login', auth.getUser());
          socketFactory.emit('friend:getfriend');
        //});
        socketFactory.on('unauthorized', function(msg) {
          console.log("unauthorized: " + JSON.stringify(msg.data.message));
        });
    });

    if (socketFactory.connected()) {
      console.log('connected');
      socketFactory.emit('friend:get');
    }

    $scope.friendlist= [];

    $scope.accept = function (relationshipid, response) {
      var data = {
        'relationshipid' : relationshipid,
        'isaccept' : response
      }
      console.log(data);
      socketFactory.emit("friend:response", data);
      socketFactory.emit('friend:getfriend');
      for (i = 0; i < $scope.friendsReqs; ++i) {
        if ($scope.friendsReqs[i].relationshipid === relationshipid) {
            $scope.friendsReqs.splice(i--, 1);
        }
      }
    }

    $scope.addFriend = function() {
      var data = {
        'username' : $scope.user.username,
        'usernameasked' : $scope.formData.username
      }
      socketFactory.emit('friend:add', data);
    };

    $scope.openNotif = function () {
      $scope.notifications = $scope.notifications ? false : true;
      $scope.friends = $scope.friends ? false : true;
    }

    socketFactory.on('friend:request', (user) => {
      console.log(user);
      var push = 1;
      for (let friend of $scope.friendsReqs) {
        if (user.username === friend.username) {
          push = 0;
        }
      }
      if (push === 1) {
        $scope.friendsReqs.push(user);
      }

    });

    socketFactory.on('friend:add', (user) => {
      user.message = [];
      $scope.messageFriendError = "";
      for (let id in $scope.friendlist)
        if ($scope.friendlist[id]._id == user._id) {
          $scope.friendlist[id] = user;
          return ;
        }
      $scope.friendlist.push(user)
    });

    socketFactory.on('friend:getfriend', (user) => {
      console.log(user);
      user.message = [];
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
      $scope.messageFriendError = "User not found";
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
      var promise = getInfosByPseudo(message.pseudo);
      promise.then(function(user_info) {
        $scope.friendlist[user_info[1]].message.push({
          'text' : message.message,
          'date' : message.date,
          '_id' : message.pseudo
        });
        console.log(user_info[1]);
        doNotify(message.pseudo, message.message);
        $scope.roundedNotif[user_info[0]._id] = true;
        $scope.numberNotif[user_info[0]._id]++;
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

    // Get information on a user with a pseudo
    function getInfosByPseudo(pseudo) {
      var deferred = $q.defer();
      var getValue = false;
      var toSend, keyToSend;
      angular.forEach($scope.friendlist, function (value, key) {
        if (value.username === pseudo) {
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
          console.log($scope.friendlist);
            $scope.friendlist[user_info[1]].message.push({
              'text' : $scope.messageToSend[val],
              'date' : Date.now(),
              '_id' : $scope.user._id
            });
          socketFactory.emit('user:message', { pseudo: $scope.user.username, message: $scope.messageToSend[val], _id: user_info[0]._id});
          $scope.messageToSend[val] = "";
        }
      });
    }

    // Close message box for chat application
    $scope.close = function (val) {
      $scope.messageList.splice(val,1);
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
