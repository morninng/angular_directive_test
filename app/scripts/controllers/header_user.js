'use strict';

/**
 * @ngdoc function
 * @name directiveTestApp.controller:HeaderUserCtrl
 * @description
 * # HeaderUserCtrl
 * Controller of the directiveTestApp
 */

angular.module('directiveTestApp')
  .controller('HeaderUserCtrl', function ($scope, UserAuthService, $uibModal) {

  	$scope.user = UserAuthService;
  	
  	$scope.show_lgoin_form = function(){
  		console.log("show_lgoin_form is called");
			var modalInstance = $uibModal.open({
				templateUrl: 'views/login_form.html',
				controller: 'LoginFormCtrl',
        backdrop:"static",
        size:'sm'
		  })
  	}

  });
