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

    $scope.w_Sun = "Sun"; 
    $scope.w_Mon = "Mon"; 
    $scope.w_Tue = "Tue"; 
    $scope.w_Wed = "Wed"; 
    $scope.w_Thu = "Thu"; 
    $scope.w_Fri = "Fri"; 
    $scope.w_Sat = "Sat"; 
    $scope.weeks = [
      {value: 0, checked:true,short_name:"Sun" , name: "Sunday"},
      {value: 1, checked:true,short_name:"Mon" , name: "Monday"},
      {value: 2, checked:true,short_name:"Tue" , name: "Tuesday"},
      {value: 3, checked:true,short_name:"Wed" , name: "Wednesday"},
      {value: 4, checked:true,short_name:"Thu" , name: "Thursday"},
      {value: 5, checked:true,short_name:"Fri" , name: "Friday"},
      {value: 6, checked:true,short_name:"Sat" , name: "Saturday"}
      ];
    $scope.active_days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    $scope.week_filtered = false;



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

    $scope.week_range_in = function(){
      if(!$scope.week_range_show ){
        $scope.week_range_show = true;
      }
    }
    $scope.week_range_out = function(){
      if($scope.week_range_show ){
        $scope.week_range_show = false;
      }
    }

    $scope.week_change = function(){
      console.log("aaa");
      var selected_days = $scope.weeks.filter(function(value){return value.checked});
       
      if(selected_days.length !=7){
        $scope.week_filtered = true;
        $scope.active_days.length=0;
        for(var i=0; i< selected_days.length; i++){
          $scope.active_days.push(selected_days[i].short_name);
        }
      }

    }


  });
