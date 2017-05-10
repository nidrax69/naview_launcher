'use strict';

/**
 * @definition de l'app
 * @name naview
 * @description directive
 * @for navright
 */

var app = angular.module('naview');

app.directive('setHeight', function($window){
  return{
    link: function(scope, element, attrs){
        var h = $(window).height();
        h =  h - (h * 8/100);
        element.css('height', h + "px");
        //element.height($window.innerHeight/3);
    }
  }
});
