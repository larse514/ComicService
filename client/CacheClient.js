var http = require('follow-redirects').http;
var config = require('config').get('REDIS_CACHE_PARAMS');
var constants = require('../util/constants');
var handler = require('../handler/httpResponseHandler');
var request = require('request');

var client = {
	getValue : function (key, next){
		//create path for request
		var path = "getCache?key=" + key;
		//make get request call
        http.get({
            host: config.HOST,
            path: path,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'POC' }
        }, function(response) {
            // Continuously update stream with data
            var body = '';            
            response.on('data', function(d) { 
                body += d;
            });
            response.on('end', function() {
            	//is this right?
            	var status = response.getHeader('status');
                return handler.handleGetResponse(status, body, next);
            });
        });
	},
	addToCache : function (key, value, next){
		//set path, build url and body
		var path = '',
			url = config.HOST + ":" + config.PORT + config.SET_URL
			body = {key : value}
		request.post(
		    url,
		    body,
		    function (error, response, body) {
		        return handler.handlePostResponse(error, response, body, next);
		    }
		);
	}
}

module.exports = client;