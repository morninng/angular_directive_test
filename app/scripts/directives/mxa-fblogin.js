'use strict';

/**
 * @ngdoc directive
 * @name directiveTestApp.directive:mxaFblogin
 * @description
 * # mxaFblogin
 */
 
angular.module('directiveTestApp')
  .directive('mxaFblogin', function ($window, UserAuthService) {
    return {
      template: '<div class="fb-login-button" data-max-rows="1" data-size="xlarge" data-show-faces="false" scope="public_profile,email" onlogin="checkLoginState();"></div>',
      restrict: 'E',
      link: function(scope, element, attrs, controller) {

				window.fbAsyncInit = function() {
			    Parse.FacebookUtils.init({
			      appId      : '817436101604719',
			      cookie     : true,  
			                          // the session
			      xfbml      : true,  // parse social plugins on this page
			      version    : 'v2.5' // use version 2.1
			    });
			    FB.getLoginStatus(function(response) {
			    //  statusChangeCallback(response);
			    });
			  };
			  // Load the SDK asynchronously
			  (function(d, s, id) {
				  var js, fjs = d.getElementsByTagName(s)[0];
				  if (d.getElementById(id)) return;
				  js = d.createElement(s); js.id = id;
			    js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.5&appId=817436101604719";
			    fjs.parentNode.insertBefore(js, fjs);
			  }(document, 'script', 'facebook-jssdk'));
				
      	$window.checkLoginState = function(){
      		var user = UserAuthService;
      		user.checkLoginState();
      		console.log("onlogin event was called");
      	}
      	if($window.facebook_shown){
      		FB.XFBML.parse();
      	}
      	$window.facebook_shown = true;
      	// http://stackoverflow.com/questions/15452786/facebook-login-button-using-angularjs

      }
    };
  });
