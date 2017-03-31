var app = angular.module('naview');

app.factory('API', function($location){
    var api = "http://naview-server.herokuapp.com"
    return api;
})
