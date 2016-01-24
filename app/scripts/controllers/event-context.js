'use strict';

/**
 * @ngdoc function
 * @name directiveTestApp.controller:EventListCtrl
 * @description
 * # EventListCtrl
 * Controller of the directiveTestApp
 */
angular.module('directiveTestApp')
  .controller('EventContextCtrl', function ($scope, $routeParams, $timeout, GetStringService) {


	var event_id = $routeParams.eventId;
	var event_obj = null;
	$scope.context = null;
	$scope.participant_category = "Aud_or_Debater";
	$scope.room_to_join = "false";
	$scope.already_participate = "false";

    var currentUser = Parse.User.current();

	var EventObj = Parse.Object.extend("Event");
	var event_query = new Parse.Query(EventObj);
	event_query.include("game");
	event_query.get(event_id, {
		success: function(obj) {
			event_obj = obj;
        	$timeout(function() {
				$scope.context  = event_obj.get("context");
				$scope.date_time  = event_obj.get("date_time");
				$scope.deb_skill  = GetStringService.getDebSkill(event_obj.get("deb_skill"));
				$scope.deb_style  = event_obj.get("deb_style");
				$scope.lang_skill  = GetStringService.getLangSkill(event_obj.get("lang_skil"));
				$scope.motion  = event_obj.get("motion");
			});
			var game_obj = event_obj.get("game");

		},
		error: function(obj, error) {
		}
	});

	$scope.join_event = function(){
		if(!event_obj){
			return;
		}
		if(!currentUser){
			alert("you need to login to participate event");
		}
		var event_id = event_obj.id;


		console.log("join");
     	event_obj.set("participants", currentUser);

		Parse.Cloud.run('JoinEvent', { id: event_id, category: $scope.participant_category},{
			success: function(obj) {
				console.log(obj);
			},
			error: function(error){
				alert(error.message);
			}
		});



	}





  });
