/**
 * Created by andrew.larsen on 2/13/2016.
 */
var Issue = require('../model/issue.js');

var issues = {
    findByQuery: function(req, res){
    	var test = req.query
    	console.log(test)
    	var offset = req.query.offset
    	var key = req.query.key
    	var param = req.query.param
        new Issue().findByQuery(key, param, offset,function(issues){
        	var issues = new Issue(issues)
            res.json(issues);
        });
    }
};

module.exports = issues;