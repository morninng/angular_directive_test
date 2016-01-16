'use strict';

/**
 * @ngdoc overview
 * @name directiveTestApp
 * @description
 * # directiveTestApp
 *
 * Main module of the application.
 */
angular
  .module('directiveTestApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/eventlist', {
        templateUrl: 'views/eventlist.html',
        controller: 'EventlistCtrl',
        controllerAs: 'eventlist'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
