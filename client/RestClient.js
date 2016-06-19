var http = require('follow-redirects').http;
var config = require('config').get('COMIC_API_PARAMS');
var constants = require('../util/constants');

var client = { 
    getIssues : function (query, offset, next) {
        var path1 = '/api/issues/?api_key=' + config.API_KEY + '&format=json&field_list=' + config.FIELD_LIST + 
                    '&filter=' + query + offset + '&limit=' + config.LIMIT;
        http.get({
            host: 'www.comicvine.gamespot.com',
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
                body = JSON.parse(body)
                if(body.status_code === constants.COMIC_API_RESPONSE.OK) {
                    // Data reception is done, do whatever with it!
                    next(null, body)
                }else {
                    console.log(body.error)
                    console.log('error')
                    next(body.error, null)
                }
            });
        });
    }
}
module.exports = client
