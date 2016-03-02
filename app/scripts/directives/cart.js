'use strict';

/**
 * @ngdoc directive
 * @name directiveTestApp.directive:cart
 * @description
 * # cart
 */
angular.module('directiveTestApp')
  .directive('myCart', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      transclude:true,
      scope: {},
      template: '<div>' + 
      			'<ul ng-transclude></ul>' + 
      			'<hr />' +
      			'total {{sum | number}}' + 
      			'</div>',
      controller: function($scope){
      	$scope.sum = 0;
      	this.addItem = function(item){
      		$scope.sum += Number(item.price)
      	}
      }
    };
  })
  .directive('myCartItem', function () {
    return {
      require:'^^myCart',
      template: '<li>{{title}} : {{price | number}} Yen</li>',
      restrict: 'E',
      scope: {
      	title: '@',
      	price: '@'
      },
      replace:true,
      link: function postLink(scope, element, attrs, cartController) {
        //element.text('this is the cart directive');
        cartController.addItem(scope)
      }
    };
  });
