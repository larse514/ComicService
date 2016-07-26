/**
 * Created by andrew.larsen on 2/13/2016.
 */
var _ = require('lodash');
var schemas = require('./schema/schema.js');
var client = require('../client/RestClient')
var cache = require('../client/CacheClient')
var config = require('config').get('COMIC_API_PARAMS');
var logger = require("../log/logger");

//constructor
var Issue =  function(data, wasCached) {
    this.data = this.sanitize(data, wasCached);
};

Issue.prototype.findByQuery = function(key, param, offsetNum,limit, next){
    // get all the users
    var query = key + ":" + param,
        offset = "&offset=" + offsetNum
        //todo is this it?
        key = query + offset
    //check in the cache first
    console.log(key)
    cache.getValue(key, function(error, body){
        //if we got a successful response, return it
        if(body){
            logger.log('info', 'cache hit %j', body, {});
            return next(null, new Issue(body, true))
        }
        //otherwise we need to go to the comicvine api
        else{
            client.getIssues(query, offset, limit, function(err, result){
                //if the rest call returned an error, throw it 
                if(err) return next(err, null)
                //grab results and make sure we only have the data we want
                var issue = new Issue(result, false);
                //now we should add it to the cache, but we can do it asynchonously so
                //make sure we return
                //todo-is this the right way to perform the async call?
                cache.addToCache(query, issue.data, function(err, body){})
                //just return
                return next(null,issue)
            })
        }
    })
 
};

//helper methods
Issue.prototype.sanitize = function (data, wasCached){
    //if data is invalid set to empty object so we don't pull
    //bad errors, seems smrt
    data = data || {};
    //grab user schema
    schema = schemas
    //so let's see...
    //these are using lodash functions (more info found here: https://lodash.com/)
    //_.defaults will add any variables, from schema, that data doesn't contain
    //_.keys gets all the keys from schema and _.pick only keeps these values
    data = _.pick(_.defaults(data, schema), _.keys(schema));
    data.was_cached = wasCached;
    return data;
    //data.was_cached = wasCached;
};

//define data for easy saving into backend
Issue.prototype.data = {};

//Define generic setter and getter
Issue.prototype.set = function (name, value) {
    this.data[name] = value;
};

Issue.prototype.get = function (name){
    return this.data[name];
};

module.exports = Issue;