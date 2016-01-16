'use strict';

/**
 * @ngdoc function
 * @name directiveTestApp.controller:LoginFormCtrl
 * @description
 * # LoginFormCtrl
 * Controller of the directiveTestApp
 */
angular.module('directiveTestApp')
  .controller('LoginFormCtrl', function ($scope, $uibModalInstance, UserAuthService) {


  	$scope.user = UserAuthService;

    var current_date = new Date();
    var minutes = current_date.getMinutes();
    var additional_minute = 15- (minutes % 15);
    var set_date = current_date + additional_minute*60*1000;
    
    $scope.dt  = set_date;

  	$scope.regist_comp_watch_cancel = 
     $scope.$watch("user.regist_complete", function(){
      if($scope.user.regist_complete == true){
        var myCarousel_element = document.getElementById("myCarousel")
        var carousel_element = angular.element(myCarousel_element);   
        if(!$scope.user.lang_type){
          carousel_element.carousel(1);
        carousel_element.carousel('pause');
        }else if(!$scope.user.user_introduction){
          carousel_element.carousel(2);
        carousel_element.carousel('pause');
        }else{
          $uibModalInstance.close();
        }
        $scope.regist_comp_watch_cancel();
      }
  	})

    $scope.click_language_select = function(){
      console.log($scope.user.lang_type);
      if(!$scope.user.lang_type){
        alert("select one of the english types");
        return;
      }
      var currentUser = Parse.User.current();
      currentUser.set("lang_type",$scope.user.lang_type);
      currentUser.save(null, {
        success: function(){
          var myCarousel_element = document.getElementById("myCarousel")
          var carousel_element = angular.element(myCarousel_element);   
          if(!$scope.user.user_profile){
            carousel_element.carousel(2);
            carousel_element.carousel('pause');
          }else{
            $uibModalInstance.close();
          }
        },
        error: function(){
          alert("something error happen");
          $uibModalInstance.close();
        }

      })

    }

    $scope.click_introduction_input = function(){

      console.log($scope.user.user_introduction);
      $scope.user.update_introduction($scope.user.user_introduction);

    }

    $scope.intro_comp_watch_cancel = $scope.$watch("user.intro_complete", function(){
      if($scope.user.regist_complete == true){
        $uibModalInstance.close();
        $scope.intro_comp_watch_cancel();
      }
    });


  	$scope.close_modal = function(){
  		$uibModalInstance.close();
  	}

  });

