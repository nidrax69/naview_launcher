var app = angular.module('naview');

app.factory('API', function($location){
    var api = "http://127.0.0.1:3000"
    return api;
})
