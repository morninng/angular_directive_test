'use strict';

/**
 * @ngdoc function
 * @name directiveTestApp.controller:EventListCtrl
 * @description
 * # EventListCtrl
 * Controller of the directiveTestApp
 */
angular.module('directiveTestApp')
  .controller('EventListCtrl', function ($scope, $routeParams, $timeout, GetStringService) {


	var event_id = $routeParams.eventId;
	$scope.context = null;

	var EventObj = Parse.Object.extend("Event");
	var event_query = new Parse.Query(EventObj);
	event_query.include("game");
	event_query.get(event_id, {
		success: function(obj) {

        	$timeout(function() {
				$scope.context  = obj.get("context");
				$scope.date_time  = obj.get("date_time");
				$scope.deb_skill  = GetStringService.getDebSkill(obj.get("deb_skill"));
				$scope.deb_style  = obj.get("deb_style");
				$scope.lang_skill  = GetStringService.getLangSkill(obj.get("lang_skil"));
				$scope.motion  = obj.get("motion");
			});
			var game_obj = obj.get("game");

		},
		error: function(obj, error) {
		}
	});





  });
