'use strict';

/**
 * @ngdoc service
 * @name directiveTestApp.EventListService
 * @description
 * # EventListService
 * Factory in the directiveTestApp.
 */
angular.module('directiveTestApp')
  .factory('EventListService', function ($timeout) {
    // Service logic

    var event_list_obj = new Object();
    event_list_obj.event_list = new Array();

    var constraint_time_from  = null;
    var constraint_time_to = null;
    var constraint_date_from  = null;
    var constraint_date_to = null;
    var constraint_weekday = [];
    var constraint_style = [];
    var constraint_lang_skill = [];
    var constraint_debate_skill = [];


    event_list_obj.loadOwnEvent = function(){

    }

    event_list_obj.loadGroupEvent = function(){

    }

    event_list_obj.setConstraint = function(obj){

      
    }

    event_list_obj.loadAllEvent = function(){

      var Event = Parse.Object.extend("Event");
      var event_query = new Parse.Query(Event);
      event_query.find({
        success: function(results) {
          event_list_obj.event_list .length = 0;
          $timeout(function() {
            for (var i = 0; i < results.length; i++) {
              var event_obj = new Object();
              event_obj.date_time = results[i].get("date_time");
              event_obj.lang_skill = results[i].get("lang_skill");
              event_obj.deb_skill = results[i].get("deb_skill");
              event_obj.deb_style = results[i].get("deb_style");
              event_obj.prerequisit = results[i].get("prerequisit");
              var game_obj = results[i].get("game");
              if(game_obj){
                event_obj.game_id = game_obj.id;
              }
              event_list_obj.event_list.push(event_obj);
            }
          });

        },
        error: function(error) {
          alert("Error: " + error.code + " " + error.message);
        }
      });
    }
// initial setup 
    event_list_obj.loadAllEvent();


    return event_list_obj
  });
