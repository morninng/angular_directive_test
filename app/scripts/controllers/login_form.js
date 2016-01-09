'use strict';

/**
 * @ngdoc function
 * @name directiveTestApp.controller:LoginFormCtrl
 * @description
 * # LoginFormCtrl
 * Controller of the directiveTestApp
 */
angular.module('directiveTestApp')
  .controller('LoginFormCtrl', function ($scope, $uibModalInstance) {

  	$scope.complete
  	$scope.aaa = "ccc";
  	$scope.close_modal = function(){
  		$uibModalInstance.close();
  	}
  });

