'use strict';

/**
 * @ngdoc directive
 * @name directiveTestApp.directive:tabDataobj
 * @description
 * # tabDataobj
 */
angular.module('directiveTestApp')
  .directive('tabDataobj', function () {
    return {
      require: '^^tabDataobjPanel',
      replace:true,
      transclude:true,
      templateUrl: 'views/tabDataobj.html',
      scope: {title:'@'},
      restrict: 'E',
      link: function postLink(scope, element, attrs, panelController) {
        panelController.addTab(scope);
      }
    };
  })
  .directive('tabDataobjPanel', function () {
    return {
      restrict: 'E',
      transclude: 'true',
      replace:true,
      scope: {active: '@'},
      templateUrl: 'views/tabDataobjPanel.html',
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

