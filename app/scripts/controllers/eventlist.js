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

  	$scope.open_create_event = function(){
  		console.log(" open create event was called");
  		var modalInstance = $uibModal.open({
				templateUrl: 'views/create_event.html',
				controller: 'CreateEventCtrl',
        backdrop:"static",
        size:'lg'
		  })
  	}



  });
