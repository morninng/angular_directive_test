'use strict';

/**
 * @ngdoc service
 * @name directiveTestApp.UserAuthService
 * @description
 * # UserAuthService
 * Factory in the directiveTestApp.
 */

angular.module('directiveTestApp')
  .factory('UserAuthService', function ($timeout) {
    // Service logic
    // ...

  var user = {
   loggedIn: false,
   first_name: null,
   last_name: null,
   pict_src: null
  };

  var loadFromLocal = function() {
    var currentUser = Parse.User.current();
    if (currentUser) {
      $timeout(function() {
        user.loggedIn = true;
        user.first_name = currentUser.get("FirstName");
        user.last_name = currentUser.get("LastName");
        user.pict_src = currentUser.get("Profile_picture");
      });
    }
  };



  user.checkLoginState = function() {

    Parse.FacebookUtils.logIn(null, {
      success: function(user) {
        if (!user.existed()) {
          console.log("user data already registered");
        } else {
          console.log("New User registration");
        }
        RegistFbGraphData();
      },
      error: function(user, error) {
        alert("User cancelled the Facebook login or did not fully authorize.");
      }
    });
  }




  var RegistFbGraphData = function(){
    FB.api("/me?fields=picture,first_name,last_name,timezone,gender,link",
      function (response) {
        if (response && !response.error) {
          var currentUser = Parse.User.current();
          var ext_data = currentUser.get("ext_data");
          if(ext_data){
            var User_Extension = Parse.Object.extend("User_Extension");
            var user_ext_query = new Parse.Query(User_Extension);  
            user_ext_query.get(ext_data.id, {
              success: function(ext_data_found){
                update_user_profile(response, currentUser, ext_data_found);
              },
              error: function(){
                console.log("ext data cannot be found");
                var User_Extension = Parse.Object.extend("User_Extension");
                var user_ext = new User_Extension();
                ext_data = user_ext;
                update_user_profile(response, currentUser, ext_data);
              }
            });
          }else{
            var User_Extension = Parse.Object.extend("User_Extension");
            var user_ext = new User_Extension();
            ext_data = user_ext;
            update_user_profile(response, currentUser, ext_data);
          }
        }
      }
    );
  };


  var update_user_profile = function(response, currentUser, user_ext){

    user_ext.set("email", response.email );
    user_ext.set("link", response.link );
    user_ext.set("timezone", response.timezone );
    user_ext.set("user_obj", currentUser );
    var user_ext_ACL = new Parse.ACL(currentUser);
    user_ext_ACL.setPublicReadAccess(true);
    user_ext.setACL(user_ext_ACL);

    currentUser.set("fb_id", response.id );
    currentUser.set("FirstName", response.first_name);
    currentUser.set("LastName", response.last_name);
    currentUser.set("Profile_picture", response.picture.data.url);
    currentUser.set("ext_data",user_ext);
    /*
    if(lang_type){
      currentUser.set("lang_type",lang_type);
    }
    */
    currentUser.save(null, {
    success: function(){
      alert("succeed login");



    },
    error: function(obj,error){
      alert("fail to save");
    }
    });
  }

 


    user.logout = function() {
      $timeout(function() {
        user.loggedIn = false;
        user.first_name = null;
        user.last_name = null;
        user.pict_src = null;
        Parse.User.logOut();
      })
    };

    //initial setting
    loadFromLocal();

    return user;
  });
