'use strict';

/**
 * @definition de l'app
 * @name naview
 * @description controller
 * @for connection
 */

var app = angular.module('naview');

function HomePageController($scope, $http, API, $location) {

};

app.controller('HomePageController', ['$scope', '$http', 'API', '$location' , ConnectController]);
