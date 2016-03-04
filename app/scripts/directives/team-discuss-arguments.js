'use strict';

/**
 * @ngdoc directive
 * @name directiveTestApp.directive:teamDiscussArguments
 * @description
 * # teamDiscussArguments
 */

angular.module('directiveTestApp')
  .directive('teamDiscussArguments', function ($timeout) {
    return {
      restrict: 'E',
      replace:true,
      templateUrl: 'views/teamDiscussArguments.html',
      link: function postLink(scope, element, attrs) {

      	var event_id_val = "-KBzYqLToTsxhkWNQDl4";

      	scope.arg_list = new Array();
      	scope.defintro_list = new Array();

      	var team = attrs.team;
      	var deb_style = attrs.debStyle;
		var root_ref = new Firebase("https://mixidea.firebaseio.com/");

		var argument_id_path = "event_related/Article_Context/" + event_id_val + "/identifier/" 
						+ deb_style + "/" + team + "/arguments";
		var argument_id_ref = root_ref.child(argument_id_path);
		argument_id_ref.on("child_added", function(snapshot, previousKey){
			var arg_id_key = snapshot.key();
			$timeout(function(){
				scope.arg_list.push({arg_id:arg_id_key,event_id:event_id_val, team:attrs.team,deb_style: attrs.debStyle});
			});
		});
		argument_id_ref.on("child_removed", function(snapshot, previousKey){
			var arg_id_key_removed = snapshot.key();
			var current_id_array = scope.arg_list;
			var n = -1
			for(var i=0; i< scope.arg_list.length; i++){
				if(scope.arg_list[i].arg_id == arg_id_key_removed){
					n=i;
				}
			}
			if(n!=-1){
				$timeout(function(){
					scope.arg_list.splice(n,1);
				});
			}
		});


		var defintro_id_path = "event_related/Article_Context/" + event_id_val + "/" 
						+ deb_style + "/" + team + "/def_intro";
		console.log(defintro_id_path);
		var defintro_id_ref = root_ref.child(defintro_id_path);
		defintro_id_ref.on("child_added", function(snapshot, previousKey){
			var arg_id_key = snapshot.key();
			$timeout(function(){
				scope.defintro_list.push({arg_id:arg_id_key});
			});
		});

		scope.add_argument = function(){
			console.log("add argument");
			var dummy_content = {dummy:true};
			argument_id_ref.push(dummy_content);
		}
 


      }
    };
  });
 