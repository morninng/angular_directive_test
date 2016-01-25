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
	var game_obj = null;
	var participants_AllObject = new Object();
	$scope.context = null;
	$scope.participant_category = "Aud_or_Debater";
	$scope.room_to_join = "false";
	$scope.already_participate = "false";
    $scope.audience_num = 0;
    $scope.debater_num = 0;
    $scope.aud_debater_num = 0;
    $scope.audience_userobj_array = new Array();
    $scope.debater_userobj_array = new Array();
    $scope.deb_or_aud_userobj_array = new Array();
    $scope.motion = null;
    $scope.already_login = false;
    var own_id = null;
    
    var currentUser = Parse.User.current();
    if(currentUser){
    	own_id = currentUser.id;
	}


    function retrieve_event_data(){

		var EventObj = Parse.Object.extend("Event");
		var event_query = new Parse.Query(EventObj);
		event_query.include("game");
		event_query.include("game.participants");
		event_query.include("game.participants.ext_data");
		event_query.get(event_id, {
			success: function(obj) {
				event_obj = obj;
				game_obj = event_obj.get("game");
				var participants_parse_array = game_obj.get("participants");
				var participant_obj
				for(var i=0; i< participants_parse_array.length; i++){
					var participant_obj = new Object();
					var id = participants_parse_array[i].id;
					participant_obj.id = id;
					participant_obj.pict_src = participants_parse_array[i].get("Profile_picture");
					participant_obj.first_name = participants_parse_array[i].get("FirstName");
					participant_obj.last_name = participants_parse_array[i].get("LastName");
					var ext_data = participants_parse_array[i].get("ext_data");
					if(ext_data){
						participant_obj.comment = ext_data.get("self_intro");
					}
					participants_AllObject[id] = participant_obj;
					
				}

	        	$timeout(function() {
					$scope.context  = event_obj.get("context");
					$scope.date_time  = event_obj.get("date_time");
					$scope.deb_skill  = GetStringService.getDebSkill(event_obj.get("deb_skill"));
					$scope.deb_style  = event_obj.get("deb_style");
					$scope.lang_skill  = GetStringService.getLangSkill(event_obj.get("lang_skil"));
					$scope.motion  = event_obj.get("motion");

					var own_existence = false;

					var participants_category = event_obj.get("participants_category");
					if(participants_category){
						var audience_array = participants_category.Audience;
						$scope.audience_userobj_array.length=0;
						$scope.audience_num = audience_array.length;
						for(var i = 0; i< audience_array.length; i++){
							var user_obj = participants_AllObject[audience_array[i]];
							if(user_obj.id ==own_id){
								own_existence = true;
							}
							$scope.audience_userobj_array.push(user_obj);
						}
						
						var debater_array = participants_category.Debater;
						$scope.debater_userobj_array.length=0;
						$scope.debater_num = debater_array.length;
						for(var i = 0; i< debater_array.length; i++){
							var user_obj = participants_AllObject[debater_array[i]];
							if(user_obj.id ==own_id){
								own_existence = true;
							}
							$scope.debater_userobj_array.push(user_obj);
						}

						var aud_debater_array  = participants_category.Aud_or_Debater;
						$scope.deb_or_aud_userobj_array.length=0;
						$scope.aud_debater_num = aud_debater_array.length;
						for(var i = 0; i< aud_debater_array.length; i++){
							var user_obj = participants_AllObject[aud_debater_array[i]];
							if(user_obj.id ==own_id){
								own_existence = true;
							}
							$scope.deb_or_aud_userobj_array.push(user_obj);
						}
						if(own_existence){
							$scope.already_login = true;
						}else{
							$scope.already_login = false;
						}

						event_obj.remained = 10 - event_obj.aud_debater_num - event_obj.debater_num - event_obj.audience_num;
					}

				});
				var game_obj = event_obj.get("game");

			},
			error: function(obj, error) {
			}
		});
	}

	$scope.join_event = function(){
		if(!event_obj){
			return;
		}
		if(!currentUser){
			alert("you need to login to participate event");
		}
		var event_id = event_obj.id;

		Parse.Cloud.run('JoinEvent', { id: event_id, category: $scope.participant_category},{
			success: function(obj) {
				console.log(obj);
				retrieve_event_data();
			},
			error: function(error){
				alert(error.message);
			}
		});

	}


	$scope.cancel_event = function(){

		if(!event_obj){
			return;
		}
		if(!currentUser){
			alert("you need to login to participate/cancel event");
		}
		var event_id = event_obj.id;

		Parse.Cloud.run('CancelEvent', { id: event_id, category: $scope.participant_category},{
			success: function(obj) {
				console.log(obj);
				retrieve_event_data();
			},
			error: function(error){
				alert(error.message);
			}
		});
	}


	//initial setup
	retrieve_event_data();


  });
