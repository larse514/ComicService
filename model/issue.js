/**
 * Created by andrew.larsen on 2/13/2016.
 */
var _ = require('lodash');
var schemas = require('./schema/schema.js');
var client = require('../client/RestClient')

//constructor
var Issue =  function(data) {
    this.data = this.sanitize(data);
};

Issue.prototype.findByQuery = function(key, param, offsetNum, next){
    // get all the users
    var query = key + ":" + param;
    var offset = "&offset=" + offsetNum
    //hard coded values  for now
    client.getIssues(query, offset, function(err, result){
        //if the rest call returned an error, throw it 
        if(err) throw err
        //grab results and make sure we only have the data we want
        Issue.prototype.data = Issue.prototype.sanitize(result)
        //now pass it back
        next(Issue.prototype.data)

    })
};

//helper methods
Issue.prototype.sanitize = function (data){
    //if data is invalid set to empty object so we don't pull
    //bad errors, seems smrt
    data = data || {};
    //grab user schema
    schema = schemas
    //so let's see...
    //these are using lodash functions (more info found here: https://lodash.com/)
    //_.defaults will add any variables, from schema, that data doesn't contain
    //_.keys gets all the keys from schema and _.pick only keeps these values
    return _.pick(_.defaults(data, schema), _.keys(schema));
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