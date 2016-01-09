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
      .otherwise({
        redirectTo: '/'
      });
  });
