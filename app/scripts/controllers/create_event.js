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

    $scope.event_create_status = "input";
    $scope.event_date = null;
    $scope.event_time = null;
    $scope.context = null;
    $scope.deb_style = null;
    $scope.exp_deb_skill = null;
    $scope.exp_lang_skil = null;
    $scope.event_time = null;
    $scope.date_time = null;
    $scope.motion = null;
    $scope.prerequisit = null;
/*
    $scope.$on('status_change', function(e,data){
      $scope.event_create_status = data;
    });
*/
  	$scope.click_cancel = function(){
  		console.log("cancel button is clicked");
      $uibModalInstance.close();
		}

  });



angular.module('directiveTestApp')
  .controller('CreateEventInputCtrl', function ($scope) {


    var current_date = new Date(); 
    $scope.minDate = current_date.setDate(current_date.getDate()-1);
    var init_time = new Date(2015,1,1,0,0);
    $scope.event_time = init_time;
    $scope.context_maxchar = 350;
    $scope.context_minchar = 20;
    $scope.show_time = false;

    $scope.click_create = function(){

      console.log("create button is clicked");
      console.log($scope.$parent.event_create_status);

      if(!$scope.event_date || 
        !$scope.context || 
        $scope.context.length > $scope.context_maxchar  || 
        $scope.context.length < $scope.context_minchar ||
        !$scope.show_time){
        alert("input data error");
        return;

      }else{
        $scope.$parent.$parent.date_time = new Date();
        $scope.$parent.$parent.date_time.setYear($scope.event_date.getFullYear());
        $scope.$parent.$parent.date_time.setMonth($scope.event_date.getMonth());
        $scope.$parent.$parent.date_time.setDate($scope.event_date.getDate());
        $scope.$parent.$parent.date_time.setHours($scope.event_time.getHours());
        $scope.$parent.$parent.date_time.setMinutes($scope.event_time.getMinutes());

        $scope.$parent.$parent.event_date = $scope.event_date;
        $scope.$parent.$parent.context = $scope.context;
        $scope.$parent.$parent.deb_style = $scope.deb_style;
        $scope.$parent.$parent.exp_deb_skill = $scope.exp_deb_skill;
        $scope.$parent.$parent.exp_lang_skil = $scope.exp_lang_skil;
        $scope.$parent.$parent.event_time = $scope.event_time;
        $scope.$parent.$parent.motion = $scope.motion;
        $scope.$parent.$parent.prerequisit = $scope.prerequisit;

        $scope.$parent.$parent.event_create_status = "confirm";

       // $scope.$emit('status_change', "confirm");
        return;
      }
    }
    $scope.time_changed = function(){
      $scope.show_time = true;
    }
    
});


angular.module('directiveTestApp')
  .controller('CreateEventConfirmCtrl', function ($scope) {

    console.log("CreateEventConfirmCtrl");

    $scope.click_confirm = function(){
      console.log("sss");

      var Event = Parse.Object.extend("Event");
      var mixidea_event = new Event();
      mixidea_event.set("date_time", $scope.$parent.$parent.date_time);
      mixidea_event.set("deb_style", $scope.deb_style);
      mixidea_event.set("context", $scope.context);
      mixidea_event.set("deb_skill", $scope.exp_deb_skill);
      mixidea_event.set("lang_skil", $scope.exp_lang_skil);
      mixidea_event.set("deb_skill", $scope.exp_deb_skill);
      mixidea_event.set("motion", $scope.motion);
      mixidea_event.set("prerequisit", $scope.prerequisit);

      var currentUser = Parse.User.current();
      var currentuser_ACL = new Parse.ACL();
      currentuser_ACL.setWriteAccess(currentUser, true);
      currentuser_ACL.setPublicReadAccess(true);
      mixidea_event.setACL(currentuser_ACL);


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

      mixidea_event.set("game", mixidea_game);
      mixidea_event.save(null, {
        success: function(obj){
          alert("succeeded to save event data");
        },
        error: function(obj, error){
          alert("fail to save event data \n" + error.message);
        }
      });

    }

});
