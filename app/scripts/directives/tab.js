'use strict';

/**
 * @ngdoc directive
 * @name directiveTestApp.directive:tab
 * @description
 * # tab
 */
angular.module('directiveTestApp')
  .directive('myTab', function () {
    return {
      require: '^^myTabPanel',
      replace:true,
      transclude:true,
      template: '<div ng-show="show" ng-transclude></div>',
      scope: {title:'@'},
      restrict: 'E',
      link: function postLink(scope, element, attrs, panelController) {
        panelController.addTab(scope);
      }
    };
  })
  .directive('myTabPanel', function () {
    return {
      restrict: 'E',
      transclude: 'true',
      replace:true,
      scope: {active: '@'},
      template: '<div class="container">' +
      			' <ul>' +
      			'  <li ng-repeat="tab in tabs" ng-class="{selected:tab.selected}">' +
      			'   <a href="" ng-click="onselect(tab)">{{tab.title}}</a>' +
      			'  </li>' +
      			' </ul>' +
      			' <div class="panel" ng-transclude></div>' +
      			'</div>',
      controller: function($scope){

      	$scope.tabs = [];
      	this.addTab = function(tab){
      		$scope.tabs.push(tab);
      		if($scope.tabs.length - 1 === Number($scope.active)){
      			$scope.onselect(tab);
      		}
      	};

      	$scope.onselect = function(selected_tab){
      		angular.forEach($scope.tabs, function(t){
      			t.show=false;
      			t.selected = false;
      		});
      		selected_tab.show = true;
      		selected_tab.selected = true;
      		console.log("tabs object");
      		console.log($scope.tabs);
      	};
                                                                                                                     
      }
    };
  });
