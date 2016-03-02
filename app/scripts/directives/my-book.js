'use strict';

/**
 * @ngdoc directive
 * @name directiveTestApp.directive:myBook
 * @description
 * # myBook
 */
angular.module('directiveTestApp')
  .directive('myBook', function () {
    return {
      template: '<div>{{book.title}} - {{book.price}} - {{price2}}' +  
      '<button ng-click="click_directive()">aaa</button>' + 
      '<button ng-click="on_link_click()">sss</button></div>',
      replace:true,
      restrict: 'E',
      scope: {
      	book: '=myInfo',
      	click_directive: '&clickCont'
      },
      link: function postLink(scope, element, attrs) {
        //element.text('this is the myBook directive');
        scope.price2=scope.book.price + 111;
        scope.on_link_click = function(){
        	console.log("link");
        }
      }
    };
  });
