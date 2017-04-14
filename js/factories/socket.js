'use strict';
var app = angular.module('naview');

app.factory('socketFactory', function(API, auth){
    //Creating connection with server
    var socket = io.connect(API);

    socket.on('connect', function(){
      socket
      .emit('authenticate', {token: auth.getToken()}) //send the jwt
      .on('authenticated', function () {
        socket.emit('user:login', {pseudo: auth.getUser()});
        console.log(auth.getUser());
      })
      .on('unauthorized', function(msg) {
        console.log("unauthorized: " + JSON.stringify(msg.data.message));
      })
    });
  return socket;
});
