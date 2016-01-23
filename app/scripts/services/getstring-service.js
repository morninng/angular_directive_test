'use strict';

/**
 * @ngdoc service
 * @name directiveTestApp.GetStringService
 * @description
 * # GetStringService
 * Service in the directiveTestApp.
 */
angular.module('directiveTestApp')
  .service('GetStringService', function () {

    this.getDebSkill = function(type){
    	var value = null;
    	switch(type){
    		case "Premium": 
    		value = "Very High: International tournament level";
    		break;
    		case "High": 
    		value = "High: Domestic premium tournament level";
    		break;
    		case "Medium": 
    		value = "Medium: one or two year debate experience";
    		break;
    		case "Beginner": 
    		value = "Beginner: Just started practicing debate";
    		break;
    	}
    	return value;
    }

	this.getLangSkill = function(type){
		var value = null;
		switch(type){
			case "Native": 
			value = "Native";
			break;
			case "ESL": 
			value = "English as a second language";
			break;
			case "EFL1": 
			value = "English as a foreign language";
			break;
			case "EFL2": 
			value = "English as a Foreign language with a limited speaking skill";
			break;
		}
		return value;
	}



  });
