
function set_hangoutobj_used(hangout_id_obj){
  hangout_id_obj.set("used", true);
  hangout_id_obj.save(null, {
   success: function(obj) {
     console.log("success to save hangout obj")
   },
   error: function(obj, error) {
    console.error("fail to save hangout obj");
   }
  }); 
}

function set_hangoutobj_array_used(hangout_obj_array){

	for(var i=0; i< hangout_obj_array.length; i++){
    set_hangoutobj_used(hangout_obj_array[i]);
  }
}



Parse.Cloud.beforeSave("Event", function(request, response) {
	console.log("before save");

	if(!request.object.isNew()){
		console.log("not new object before save event");
		response.success();
		return;
	}

	var HangoutId = Parse.Object.extend("HangoutIDList")
	var hangout_query = new Parse.Query(HangoutId);
	hangout_query.equalTo("used", false);
	hangout_query.limit(5);
	hangout_query.find({
	  success: function(results) {
	  	if(results.length < 5){
	  		response.error("no sufficient data: please tell it to mixidea administrator");
	  	}else{
	  		console.log("hangout id found");
	  		response.success();
	  	}
	  },
	  error: function(error) {
	  		response.error("query find failed");
	  }
	});
});

Parse.Cloud.afterSave("Event", function(request) {

	console.log("event after save");


	var event_obj = request.object;
	var game_obj = event_obj.get("game");
	var hangout_array = game_obj.get("hangoutid")
	if(hangout_array){
		console.log("hangout id already set");
		return;
	}

	var HangoutId = Parse.Object.extend("HangoutIDList")
	var hangout_query = new Parse.Query(HangoutId);
	hangout_query.equalTo("used", false);
	hangout_query.limit(5);
	hangout_query.find({
	  success: function(results) {
	  	console.log("hangout id found");

	  	if(results.length < 5){
	  		console.error("no sufficient data");
	  	}

	  	for(var i=0; i< results.length; i++){
	  		var hangout_id = results[i].get("HangoutID");
	  		game_obj.add("hangoutid", hangout_id);
	  		console.log(hangout_id);
	  	}
	  	set_hangoutobj_array_used(results);
	  	game_obj.set("parent_event", event_obj);
	  	game_obj.save(null,{
	  		success: function(obj){
					console.log("complete setting for event " + event_obj.id);
	  		},
	  		error: function(obj, error){
	  			console.error("saving game has been failed");
	  		}
	  	});
	  },
	  error: function(error) {
	  	 console.error("no sufficient data, please inform it to mixidea administrator");
	  }
	});

});
