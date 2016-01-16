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
    current_date.setMinutes(0);
    current_date.setHours(current_date.getHours()+1);
    var init_time = new Date(2015,1,1,0,0);
    $scope.event_time = init_time;
    $scope.show_time = false;
//    $scope.event_time  = current_date;
//    $scope.exp_deb_skill = "Medium";
//    $scope.exp_lang_skil = "EFL1";
//    $scope.deb_style = "NA";

    $scope.time_changed = function(){
      $scope.show_time = true;
    }

  	$scope.click_create = function(){
  		console.log("create button is clicked");
      console.log($scope.event_date);
      console.log($scope.event_time);
      var event_date = new Date();
      event_date.setYear($scope.event_date.getFullYear());
      event_date.setMonth($scope.event_date.getMonth());
      event_date.setDate($scope.event_date.getDate());
      event_date.setHours($scope.event_time.getHours());
      event_date.setMinutes($scope.event_time.getMinutes());
      console.log(event_date);
      
		}

  	$scope.click_cancel = function(){
  		console.log("cancel button is clicked");
      $uibModalInstance.close();
		}


  });
