var http = require('follow-redirects').http;
var config = require('config').get('REDIS_CACHE_PARAMS');
var constants = require('../util/constants');
var handler = require('../handler/httpResponseHandler');
var request = require('request');
var logger = require("../log/logger");

var client = {
	getValue : function (key, next){
		//create path for request
		var path = "/getCache?key=" + key;
		//make get request call
		console.log(path)
        http.get({
            host: config.HOST,
            port: config.PORT,
            path: path
        }, function(response) {
            // Continuously update stream with data
            var body = '';            
            response.on('data', function(d) { 
                body += d;
            });
            response.on('end', function() {
            	//is this right?
            	var status = response.statusCode;
                return handler.handleGetResponse(null, status, body, next);
            });
        }).on('error', function (err) {
    		logger.log('error', 'Error in http request %j', err, {});
    		return handler.handleGetResponse(err, null, null, next)
		});
	},
	addToCache : function (key, value, next){
		//set path, build url and body
		logger.info("adding to cache, key: " + key)
		var options = {
		  	url: config.PROTOCOL + config.HOST + ":" + config.PORT + config.SET_URL,
			headers : {
                'Content-Type': 'application/json'
            },
		    json : {key : key, value:JSON.stringify(value)}
		};
		request.post(
			options,
		    function (error, response, body) {
		        return handler.handlePostReponse(error, response, body, next);
		    }
		);
	}
}

module.exports = client;