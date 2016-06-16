/**
 * Created by andrew.larsen on 2/13/2016.
 */
var Issue = require('../model/issue.js');

var issues = {
    getAll: function(req, res){
        new Issue().findAll(function(user){
            res.json(user);
            //next()
        });
    }
};

module.exports = issues;