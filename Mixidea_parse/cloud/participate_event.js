


var debug_test = true;
var debug_test_true = true;
var do_not_execute = false;


Parse.Cloud.define("JoinEvent", function(request, response) {

  Parse.Cloud.useMasterKey();

  console.log(request.user);
  var user_obj = request.user;
  if(!user_obj){
    response.error("you need to login to join event");
    return;
  }


  var event_id = request.params.id;
  var category = request.params.category;


  var EventObj = Parse.Object.extend("Event");
  var event_query = new Parse.Query(EventObj);
  event_query.include("game");
  event_query.get(event_id, {
    success: function(event_obj) {
      var game_obj = event_obj.get("game");
      if(!game_obj){
        response.error("event data is corrupted");
        return;
      }

      var current_participant = game_obj.get("participants");


//if(debug_test && do_not_execute){
      var already_join = check__already_joined(current_participant,user_obj.id);
      if(already_join){
        response.error("you have already joined in this event.");
        return;
      }


      if(current_participant.length >9){
        response.error("maximum number of participants is 10, so you cannot join until someone cancel");
        return;
      }
//}
      game_obj.add("participants", user_obj);



      var current_category = event_obj.get("participants_category");
      console.log(current_category);
      if(!current_category){
        current_category = new Object();
        current_category['Audience'] = new Array();
        current_category['Debater'] = new Array();
        current_category['Aud_or_Debater'] = new Array();
      }

      switch(category){
        case "Audience":
          if(!current_category['Audience']){
            current_category['Audience'] = new Array();
          }
          var remained = validate_remaining(event_obj,current_category, "Audience");
          if(!remained){
            response.error("Audience role reached maximum because someone has joined before you");
            return;
          }
          current_category['Audience'].push(user_obj.id);
        break;
        case "Debater":
          if(!current_category['Debater']){
            current_category['Debater'] = new Array();
          }
          var remained = validate_remaining(event_obj,current_category, "Debater");
          if(!remained){
            response.error("Debater role reached maximum because someone has joined before you");
            return;
          }
          current_category['Debater'].push(user_obj.id);
        break;
        case "Aud_or_Debater":
          if(!current_category['Aud_or_Debater']){
            current_category['Aud_or_Debater'] = new Array();
          }
          current_category['Aud_or_Debater'].push(user_obj.id);
        break;
        default:
          response.error("unregistered category");
          return;
        break;
      }

      game_obj.save().then(function(){

        console.log("saving game succeed:");
        event_obj.set("participants_category", current_category);
        return event_obj.save();

      }).then(function(result) {

        console.log("saving event succeed");
        response.success("succeed to save event obj");
        return;

      }, function(error){

        response.error("fail to save data");
        return;
      });

    },
    error: function(error){
      response.error("event might be deleted");
      return;

    }
  });



});

function validate_remaining(event_obj,category, type){

  var debate_style = event_obj.get("deb_style");
  switch(debate_style){
    case "Asian":
      switch(type){
        case "Audience":
          if(category['Audience'].length >3){
            return false;
          }
        break;
        case "Debater":
          if(category['Debater'].length >7){
            return false;
          }
        break;
      }
    break;
    case "NA":
      switch(type){
        case "Audience":
          if(category['Audience'].length >5){
            return false;
          }
        break;
        case "Debater":
          if(category['Debater'].length >5){
            return false;
          }
        break;
      }
    break;
    case "BP":
      switch(type){
        case "Audience":
          if(category['Audience'].length >1){
            return false;
          }
        break;
        case "Debater":
          if(category['Debater'].length >7){
            return false;
          }
        break;
      }
    break;
  }

  return true; 
}


function check__already_joined(current_participant, user_id){

  console.log("user id for check is" + user_id);
  for(var i=0; i< current_participant.length; i++){
    var already_participated_user_id = current_participant[i].id;
    console.log(already_participated_user_id);
    if(already_participated_user_id == user_id){
      return true;
    }
  }
  return false;
}