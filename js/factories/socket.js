'use strict';
var app = angular.module('naview');

app.factory('socketFactory', function(API, auth, $rootScope){
    //Creating connection with server
    var socket = io.connect(API, {'forceNew': true});
    return {
       on: function (eventName, callback) {
           socket.on(eventName, function () {
               var args = arguments;
               $rootScope.$apply(function () {
                   callback.apply(socket, args);
               });
           });
       },
       emit: function (eventName, data, callback) {
           socket.emit(eventName, data, function () {
               var args = arguments;
               $rootScope.$apply(function () {
                   if (callback) {
                       callback.apply(socket, args);
                   }
               });
           })
       }
   };
  //
  //   socket.on('connect', function(){
  //     socket
  //     .emit('authenticate', {token: auth.getToken()}) //send the jwt
  //     .on('authenticated', function () {
  //       socket.emit('user:login', auth.getUser());
  //       this.disconnect = function () {
  //         console.log("lel");
  //         socket.emit('disconnect', auth.getUser());
  //       }
  //     })
  //     .on('unauthorized', function(msg) {
  //       console.log("unauthorized: " + JSON.stringify(msg.data.message));
  //     });
  //
  //
  //   });
  // return socket;
});
