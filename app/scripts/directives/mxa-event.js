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
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the mxaEvent directive');
      }
    };
  });
