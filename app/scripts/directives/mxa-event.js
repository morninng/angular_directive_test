'use strict';

/**
 * @ngdoc directive
 * @name directiveTestApp.directive:mxaEvent
 * @description
 * # mxaEvent
 */
angular.module('directiveTestApp')
  .directive('mxaEvent', function () {
    return {
      template: '<img src="{{src}}" ng-mouseenter="onenter()" ng-mouseleave="onleave()" />' ,
      restrict: 'E',
      scope:{
      	preSrc: '@',
      	postSrc: '@'
      },
      link: function(scope, element, attrs, controller) {

        scope.src= scope.preSrc;
        scope.onenter = function(){
        	console.log("enter");
        	scope.src = scope.postSrc;
        }
        scope.onleave = function(){
        	console.log("leave");
        	scope.src=scope.preSrc;
        }

      }
    };
  });
