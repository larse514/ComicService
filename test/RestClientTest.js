var client = require('../client/RestClient');
var assert = require('chai').assert;

//todo-update this test to remove dependencies
describe('RestClient Test', function () {
    //make sure to add done ya turkey!
    //to be more clear, done will make sure the asych call returns
    it('Error should be null', function (done) {
        var query = "name" + ":" + "batman";
        var offset = "&offset=" + 0
        client.getIssues(query, offset,3,function(err, issues){
            assert(err == null)
            done()
        })
    });
    
    it('Results contains amount passed in as limit ', function (done) {
        var query = "name" + ":" + "batman";
        var offset = "&offset=" + 0
        var limit = 5
        client.getIssues(query, offset, limit,function(err, issues){
            assert(issues.results.length == limit)
            done()

        })
    });

    //todo-add negative tests when i find one

  });