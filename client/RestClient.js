var http = require('follow-redirects').http;
var config = require('config').get('COMIC_API_PARAMS');
var constants = require('../util/constants');

var client = { 
    getIssues : function (query, offset, host, next) {
        var path1 = '/api/issues/?api_key=' + config.API_KEY + '&format=json&field_list=' + config.FIELD_LIST + 
                    '&filter=' + query + offset + '&limit=' + config.LIMIT;
        http.get({
            host: host,
            path: path1,
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
                try{
                    //try and parse the response boyd
                    body = JSON.parse(body)
                }
                catch(e){
                    //if it wasn't JSON return an error
                    console.log(e)
                    next("Malformed JSON response", null)
                }
                //otherwise we have a valid response, let's make sure it was 
                //a successful one
                if(body.status_code === constants.COMIC_API_RESPONSE.OK) {
                    //we're good, return
                    next(null, body)
                }else {
                    //something went wrong with the request that reach the API
                    console.log(body.error)
                    console.log('error')
                    next(body.error, null)
                }
            });
        });
    }
}
module.exports = client
