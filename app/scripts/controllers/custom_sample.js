'use strict';

/**
 * @ngdoc function
 * @name directiveTestApp.controller:CustomSampleCtrl
 * @description
 * # CustomSampleCtrl
 * Controller of the directiveTestApp
 */
angular.module('directiveTestApp')
  .controller('CustomSampleCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
