var sinon = require('sinon'),
    rewire = require('rewire'),
	issues = rewire('../service/issues'),
    issueModelMock = sinon.stub(),
    Issue = require('../model/issue'),
    assert = require('chai').assert,
    expect = require('chai').expect


describe('Issues Service Tests', function () {
    var badReq = {query:"as;ldkjfalskdjf", offset:"asdf", key:"asdfasd"}
    var issueSpy = sinon.spy(Issue.prototype, 'findByQuery')
	before(function(){

	});
    it('findByQuery should be called', sinon.test(function (done) {
    	var res = {json:this.spy()}
		issues.findByQuery(badReq, res)    	
		assert(issueSpy.callCount === 1)     
		done() 
    }))

    it('error should be thrown', sinon.test(function (done) {
    	var error = new Error("Error");
		issueModelMock.prototype.findByQuery = this.stub().
		callsArgWith(4,error, null)
    	issues.__set__({
	        'Issue': issueModelMock
	    });
    	var res = {json:this.spy()}
		expect(function(){issues.findByQuery(badReq, res)}).to.throw(error)
		assert(issueSpy.callCount === 1)
		issueSpy.restore()
		done() 
    }))

    it('Issue is created after successful service call', sinon.test(function (done) {
    	var response = {
						  
						    "offset": 500,
						    "next_offset": 510,
						    "number_of_total_results": 742,
						    "results": [
						      {}]}
		var issue = new Issue(response)
		issueModelMock.prototype.findByQuery = this.stub().
		callsArgWith(4,null, issue)

    	issues.__set__({
	        'Issue': issueModelMock
	    });
    	var res = {json:this.spy()}
    	issues.findByQuery(badReq, res)
		assert(issueSpy.callCount === 1)
		assert(res.json.callCount === 1)
		issueSpy.restore()
		done() 
    }))
  });