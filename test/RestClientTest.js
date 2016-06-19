var client = require('../client/RestClient');
var assert = require('chai').assert;

describe('RestClient Test', function () {
    //make sure to add done ya turkey!
    //to be more clear, done will make sure the asych call returns
    it('Error should be null', function (done) {
        var query = "name" + ":" + "batman";
        var offset = "&offset=" + 0
        client.getIssues(query, offset, function(err, issues){
            assert(err == null)
            done()
        })
    });
    
    it('Results contains configured about of results (current config 10) ', function (done) {
        var query = "name" + ":" + "batman";
        var offset = "&offset=" + 0
        client.getIssues(query, offset, function(err, issues){
            assert(issues.results.length == 10)
            done()

        })
    });
 /*   it('bad request should populate error object ', function (done) {
        var query = "nameasdfasdf" + ":" + "hguyfu";
        var offset = "&offset=" + 0
        client.getIssues(query, offset, function(err, issues){
            assert(err != null)
            done()

        })
    });
   */ 
  });