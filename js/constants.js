var app = angular.module('naview');

app.factory('API', function($location){
    //var api = "http://localhost:3000";
    var api = "http://naview-server.herokuapp.com";
    return api;
})
