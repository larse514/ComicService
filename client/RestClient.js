var http = require('follow-redirects').http;
var config = require('config').get('COMIC_API_PARAMS');

var getIssue = function (query, next) {
    http.get({
        host: 'www.comicvine.gamespot.com',
        path: '/api/issues/?api_key=' + config.API_KEY + '&format=json&field_list=' + config.FIELD_LIST + '&filter=' + query + '&offset=9&limit=' + config.LIMIT,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'POC' }
    }, function(response) {
        // Continuously update stream with data
        var body = '';
        response.on('data', function(d) {
            //console.log(body)
            body += d;
        });
        response.on('end', function() {

            // Data reception is done, do whatever with it!
            console.log(body)
            next(body)
        });
    });
}
