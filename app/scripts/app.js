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
    'ui.bootstrap',
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/eventlist', {
        templateUrl: 'views/eventlist.html',
        controller: 'EventlistCtrl',
        controllerAs: 'eventlist'
      })
      .when('/event-context/:eventId', {
        templateUrl: 'views/event-context.html',
        controller: 'EventContextCtrl',
        controllerAs: 'eventContext'
      })
      .when('/user_profile/:user_id', {
        templateUrl: 'views/userprofile.html',
        controller: 'UserprofileCtrl',
        controllerAs: 'UserProfile'
      })
      .when('/isolate_scope', {
        templateUrl: 'views/isolate_scope.html',
        controller: 'IsolateScopeCtrl',
        controllerAs: 'isolateScope'
      })
      .when('/custom_sample', {
        templateUrl: 'views/custom_sample.html',
        controller: 'CustomSampleCtrl',
        controllerAs: 'customSample'
      })
      .when('/firebase_article', {
        templateUrl: 'views/firebase_article.html',
        controller: 'FirebaseArticleCtrl',
        controllerAs: 'firebaseArticle'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

