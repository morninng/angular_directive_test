'use strict';

/**
 * @ngdoc function
 * @name directiveTestApp.controller:CreateEventCtrl
 * @description
 * # CreateEventCtrl
 * Controller of the directiveTestApp
 */
angular.module('directiveTestApp')
  .controller('CreateEventCtrl', function ($scope, $uibModalInstance) {

  	console.log("CreateEventCtrl");

    var current_date = new Date(); 
    $scope.minDate = current_date.setDate(current_date.getDate()-1);
    var init_time = new Date(2015,1,1,0,0);
    $scope.event_time = init_time;
    $scope.show_time = false;

    $scope.time_changed = function(){
      $scope.show_time = true;
    }

  	$scope.click_create = function(){
  		console.log("create button is clicked");
      var date_time = new Date();
      date_time.setYear($scope.event_date.getFullYear());
      date_time.setMonth($scope.event_date.getMonth());
      date_time.setDate($scope.event_date.getDate());
      date_time.setHours($scope.event_time.getHours());
      date_time.setMinutes($scope.event_time.getMinutes());
      console.log(date_time);


      var Event = Parse.Object.extend("Event");
      var mixidea_event = new Event();
      mixidea_event.set("date_time", date_time);
      mixidea_event.set("deb_style", $scope.deb_style);
      mixidea_event.set("context", $scope.context);
      mixidea_event.set("deb_skill", $scope.exp_deb_skill);
      mixidea_event.set("lang_skil", $scope.exp_lang_skil);
      mixidea_event.set("deb_skill", $scope.exp_deb_skill);
      mixidea_event.set("prerequisit", $scope.prerequisit);


      var Game = Parse.Object.extend("Game");
      var mixidea_game = new Game();
      mixidea_game.set("motion", $scope.motion);
      mixidea_game.set("game_status", "introduction");
      mixidea_game.set("type", "debate");
      var participant_obj = new Object();
      var audience_participant = new Array();
      var participant = new Array();
      mixidea_game.set('participant_role', participant_obj);
      mixidea_game.set('audience_participants', audience_participant);
      mixidea_game.set('participants', participant);


      var Speech_Transcription = Parse.Object.extend("Speech_Transcription");
      var speech_transcription_obj = new Speech_Transcription();

// hangout url should be applied when it is saved in the server side by using before save command
// when tehere is no enough urls, error shoud be poped up.

      mixidea_event.set("game", mixidea_game);
      mixidea_event.save(null, {
        success: function(obj){
          alert("succeeded to save event data");
        },
        error: function(obj, error){
          alert("fail to save event data, please try again");
        }
      });

		}

  	$scope.click_cancel = function(){
  		console.log("cancel button is clicked");
      $uibModalInstance.close();
		}

  });
