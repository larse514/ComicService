var constants = require('../util/constants');

var httpHelper = {
	handleGetResponse : function(status, body, next){
	   try{
	        //try and parse the response bodyx
	        body = JSON.parse(body)
        }
        catch(e){
            //if it wasn't JSON return an error
            console.log(e)
            return next(new Error("Malformed JSON response"), null)
        }
        //otherwise we have a valid response, let's make sure it was 
        //a successful one     
  		if(status === constants.REDIS_CACHE_RESPONSE.OK) {
			//we're good
			return next(null, body)
		} 
		//otherwise we have an error
		console.log("Error calling RedisCache")
		return next(new Error(body.error), null)
			
	},
	handlePostReponse : function(error, response, body, next){
		if(error){
        	console.log('POST error found')
        	return next(error, null)
        }
        if(response.statusCode === constants.REDIS_CACHE_RESPONSE.CREATED){
			try{
		        //try and parse the response bodyx
		        body = JSON.parse(body)
	        }
	        catch(e){
	            //if it wasn't JSON return an error
	            console.log(e)
	            return next(new Error("Malformed JSON response"), null)
	        }	
        	return next(null, body)
        }   

        //otherwise we seem to have hit a weird spot in the code, return an error
        return next(new Error('Null Response'), null)     
	    
	}
}

module.exports = httpHelper