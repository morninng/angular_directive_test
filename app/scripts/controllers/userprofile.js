'use strict';

/**
 * @ngdoc function
 * @name directiveTestApp.controller:UserprofileCtrl
 * @description
 * # UserprofileCtrl
 * Controller of the directiveTestApp
 */
angular.module('directiveTestApp')
  .controller('UserprofileCtrl', function ($scope , $routeParams, $timeout) {


  	$scope.name = "Yuta";
  	var user_id = $routeParams.user_id;
  	$scope.first_name = null;


	var User = Parse.Object.extend("User");
	var user_query = new Parse.Query(User);
	user_query.include("ext_data");
	user_query.get(user_id, {
		success: function(user_obj) {

	        $timeout(function() {
				$scope.first_name = user_obj.get("FirstName");
				$scope.last_name = user_obj.get("LastName");
				$scope.pict_src = user_obj.get("Profile_picture");
				var ext_data = user_obj.get("ext_data");
				if(ext_data){
					$scope.self_intro = ext_data.get("self_intro");
					$scope.fb_link = ext_data.get("link");
				}
			});


		},
		error: function(object, error) {
			alert("user cannnot be found");
		}
	});





  });
