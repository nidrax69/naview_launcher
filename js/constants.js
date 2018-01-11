var app = angular.module('naview');

app.factory('API', function($location){
    //var api = "http://localhost:3000";
    var api = "http://naview-server.herokuapp.com";
    return api;
})

app.factory('ClientURL', function($location){
    // var api = "http://localhost:3000";
    var url = "./client/Naview/WindowsNoEditor/Naview.exe";
    return url;
})
