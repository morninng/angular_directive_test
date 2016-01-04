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
      template: '<fb:login-button scope="public_profile,email" onlogin="checkLoginState();"></fb:login-button>',
      restrict: 'E',
      link: function(scope, element, attrs, controller) {

				window.fbAsyncInit = function() {
			    Parse.FacebookUtils.init({
			      appId      : '817436101604719',
			      cookie     : true,  
			                          // the session
			      xfbml      : true,  // parse social plugins on this page
			      version    : 'v2.1' // use version 2.1
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
			    js.src = "//connect.facebook.net/en_US/sdk.js";
			    fjs.parentNode.insertBefore(js, fjs);
			  }(document, 'script', 'facebook-jssdk'));
				
      	$window.checkLoginState = function(){
      		var user = UserAuthService;
      		user.checkLoginState();
      		console.log("onlogin event was called");
      	}
      }
    };
  });
