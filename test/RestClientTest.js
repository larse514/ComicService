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
    
    it('Results contains configured about of results (current config 10) ', function (done) {
        var query = "name" + ":" + "batman";
        var offset = "&offset=" + 0
        client.getIssues(query, offset, 3,function(err, issues){
            assert(issues.results.length == 3)
            done()

        })
    });

    //todo-add negative tests when i find one

  });