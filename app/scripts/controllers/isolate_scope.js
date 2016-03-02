'use strict';

/**
 * @ngdoc function
 * @name directiveTestApp.controller:IsolateScopeCtrl
 * @description
 * # IsolateScopeCtrl
 * Controller of the directiveTestApp
 */
angular.module('directiveTestApp')
  .controller('IsolateScopeCtrl', function ($scope) {

  	$scope.name="ccc";
  	$scope.data = {title:"kkk", price:111};

  	$scope.arguments_id_array = [
  			{title:"aaa", price:111},
  			{title:"bbb", price:222},
  			{title:"ccc", price:333}
  			];

  	$scope.onclick = function(){
  		console.log("aaa");
  	}
  });

