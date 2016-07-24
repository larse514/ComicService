var constants = require('../util/constants');
var logger = require("../log/logger");

var httpHelper = {
	handleGetResponse : function(err, status, body, next){
		if(err){
			logger.error(err)
			return next(new Error("Error calling RedisCache"), null)
		}
        //otherwise we have a valid response, let's make sure it was 
        //a successful one
        try{
           //try and parse the response body    
	        body = JSON.parse(body)
			logger.log('info', 'Redis cache body %j', body, {});
		}
        catch(e){
            //if it wasn't JSON return an error
            logger.error(e)
            return next(new Error("Malformed JSON response"), null)
        }
       	if(status === constants.REDIS_CACHE_RESPONSE.OK && body.value ) {
			//we're good
			return next(null, body.value)
		}
		//otherwise we have an error
		logger.log('error', 'Error calling GET method %j', body, {});
		return next(new Error(body.message), null)
			
	},
	handlePostReponse : function(err, response, body, next){
		if(err){
        	logger.error('POST error: ' + err)
        	return next(err, null)
        }
        logger.info("POST method returned with code: " + response.statusCode)
        if(response.statusCode === constants.REDIS_CACHE_RESPONSE.CREATED){
			try{
		        //try and parse the response bodyx
		        body = JSON.parse(body)
	        }
	        catch(e){
	            //if it wasn't JSON return an error
	            logger.error(e)
	            return next(new Error("Malformed JSON response"), null)
	        }	
        	return next(null, body.value)
        }   
		logger.log('error', 'Error calling Redis setCache %j', body, {});
        //otherwise we seem to have hit a weird spot in the code, return an error
        return next(new Error('Null Response'), null)     
	    
	}
}

module.exports = httpHelper