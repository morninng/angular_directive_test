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
      scope: {tab_info:'=tabInfo'},
      restrict: 'E',
      link: function postLink(scope, element, attrs, panelController) {
        console.log(scope);
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

      	$scope.tab_contents = [
      		{title:"aaa", content:"AAAA", selected: false},
      		{title:"bbb", content:"BBBB", selected: true}
      	];

      	$scope.onselect = function(selected_tab){

      		for (var i=0; i< $scope.tab_contents.length; i++){
      			$scope.tab_contents[i].selected=false;
      		}

      		selected_tab.selected = true;
      		console.log("tabs object");
      		console.log($scope.tabs);
      	};

      	$scope.add_new_obj = function(){
      		var tab_obj = {title:"ccc", content:"CCCC", selected: false}
      		$scope.tab_contents.push(tab_obj);
      	}
        
      }
    };
  });

