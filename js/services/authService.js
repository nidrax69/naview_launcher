'use strict';

/**
 * @definition de l'app
 * @name naview
 * @description service
 * @for authService
 */

var app = angular.module('naview');

function authInterceptor(API, auth, $q) {
    return {
        // request: function (config) {
        //     config.headers = config.headers || {};
        //     if (auth.getToken()) {
        //         config.headers.Authorization = 'Bearer ' + auth.getToken();
        //     }
        //     return config;
        // },
        // If a token was sent back, save it
        response: function (res) {
            if (res.config.url.indexOf(API) === 0 && res.data.token) {
                auth.saveToken(res.data.token);
                auth.getUser();
            }
            return res;
        },
        responseError: function (rejection) {
            // do something on error
            return $q.reject(rejection);
        }
    };
}

function AuthService($window, jwtHelper) {
    var self = this;

    var user = {};

    // Add JWT methods here
    self.parseJwt = function (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse($window.atob(base64));
    };

    self.setAdmin = function (bool){
      $window.localStorage['isAdmin'] = bool;
    };

    self.isAdmin = function(){
      return $window.localStorage['isAdmin'] === "true" ? true : false;
    };

    self.saveToken = function (token) {
        $window.localStorage['id_token'] = token;
    };

    self.getToken = function () {
        return $window.localStorage['id_token'];
    };

    self.isTokenExpired = function (token) {
        return jwtHelper.isTokenExpired(token);
    };

    self.getUser = function () {
        var token = self.getToken();
        if (token) {
            var tokenPayload = jwtHelper.decodeToken(token);
            var claims = angular.fromJson(tokenPayload);
            user = angular.fromJson(claims);
            return user;
        } else {
            return false;
        }
    };

    self.isAuthed = function () {
         var token = self.getToken();
         // verification l'expiration de token
        if (token) {
            var params = self.parseJwt(token);
            return Math.round(new Date().getTime() / 1000) <= params.exp;
        } else {
            return false;
        }
    };

    self.logout = function () {
        $window.localStorage.removeItem('id_token');
        user = "";
    };
}


app.service('auth', ['$window', 'jwtHelper', '$http', 'API', AuthService])
  .config(function ($httpProvider, jwtOptionsProvider) {
      jwtOptionsProvider.config({
        tokenGetter: ['options', function(options) {
          return localStorage.getItem('id_token');
        }],
        whiteListedDomains: ['api.myapp.com', 'localhost']
      });
      $httpProvider.interceptors.push('jwtInterceptor');
  });
