'use strict';

/**
 * @definition de l'app
 * @name naview
 * @description controller
 * @for connection
 */

var app = angular.module('naview');

function SettingsController($scope, $http, API, $location) {
  $scope.screen = function (a) {
    self.resizeTo(Math.floor(screen.width / a), Math.floor(screen.height / a));
  };
  $scope.changeColor = function(a) {
    document.getElementById("body").style.backgroundColor = a;
  };

  function play(idPlayer, control) {
    var player = document.querySelector('#' + idPlayer);

    if (player.paused) {
        player.play();
        control.textContent = 'Pause';
    } else {
        player.pause();
        control.textContent = 'Play';
    }
}

function resume(idPlayer) {
    var player = document.querySelector('#' + idPlayer);

    player.currentTime = 0;
    player.pause();
}
  // $scope.testSound = fonction(){
  //   var audio = new Audio('Tetris.mp3');
  //   audio.play();
  // }
};

app.controller('SettingsController', ['$scope', '$http', 'API', '$location' , SettingsController]);
