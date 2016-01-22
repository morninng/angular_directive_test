'use strict';

/**
 * @ngdoc function
 * @name directiveTestApp.controller:EventlistCtrl
 * @description
 * # EventlistCtrl
 * Controller of the directiveTestApp
 */
angular.module('directiveTestApp')
  .controller('EventlistCtrl', function ($scope, $uibModal,EventListService) {

    $scope.event_list = EventListService.event_list;
    $scope.date_range_show = false;
    $scope.date_from = new Date();
    $scope.date_to = new Date();
    $scope.date_to.setMonth( $scope.date_to.getMonth() + 13 );
    $scope.format = 'yyyy/MM/dd';


    $scope.time_from = new Date();
    $scope.time_from.setHours(0);
    $scope.time_from.setMinutes(0);
    $scope.time_to = new Date();
    $scope.time_to.setHours(23); 
    $scope.time_to.setMinutes(59); 


  	$scope.open_create_event = function(){
  		console.log(" open create event was called");
  		var modalInstance = $uibModal.open({
				templateUrl: 'views/create_event.html',
				controller: 'CreateEventCtrl',
        backdrop:"static",
        size:'lg'
		  })
  	}

    $scope.date_range_in = function(){
      if(!$scope.date_range_show ){
        $scope.date_range_show = true;
      }
    }

    $scope.data_range_out = function(){
      if($scope.date_range_show ){
        $scope.date_range_show = false;
      }
    }

    $scope.time_range_in = function(){
      if(!$scope.time_range_show ){
        $scope.time_range_show = true;
      }
    }
    $scope.time_range_out = function(){
      if($scope.time_range_show ){
        $scope.time_range_show = false;
      }
    }



  });
