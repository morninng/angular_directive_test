


Parse.Cloud.define("CancelEvent", function(request, response) {

  	Parse.Cloud.useMasterKey();
	console.log("cancel log has been called")

	console.log(request.user);
	var user_obj = request.user;
	if(!user_obj){
		response.error("you need to login to cancel event");
	return;
	}
	var user_id = user_obj.id
 	var event_id = request.params.id;


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
		var already_join = check_already_joined(current_participant,user_obj.id);
		if(!already_join){
			response.error("you have not joined this event");
			return;
		}

		var current_participant = game_obj.get("participants");
		console.log(current_participant);
		var filtered_participant = current_participant.filter(
			function(value){
				return value.id !=user_id;
			}
		);
		game_obj.set("participants", filtered_participant);


		var participant_category = event_obj.get("participants_category");
		var audience_category_array = participant_category.Audience;
		var filtered_audience_category = audience_category_array.filter(
			function(value){
				return value !=user_id;
			}
		);
		var debater_category_array = participant_category.Debater;
		var filtered_debater_category = debater_category_array.filter(
			function(value){
				return value !=user_id;
			}
		);
		var deb_or_aud_category_array = participant_category.Aud_or_Debater;
		var filtered_deb_or_aud_category = deb_or_aud_category_array.filter(
			function(value){
				return value !=user_id;
			}
		);
		var updated_participant_category = new Object();
		updated_participant_category["Audience"] = filtered_audience_category;
		updated_participant_category["Debater"] = filtered_debater_category;
		updated_participant_category["Aud_or_Debater"] = filtered_deb_or_aud_category;

		event_obj.set("participants_category", updated_participant_category);


		game_obj.save().then(function(){
			console.log("saving game succeed");
			return event_obj.save();

		}).then(function(result) {
       		response.success("succeed to cancel event and save event obj");
			return;

		}, function(obj, error){
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

function check_already_joined(current_participant, user_id){

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
