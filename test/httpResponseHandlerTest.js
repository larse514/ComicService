var sinon = require('sinon'),
    rewire = require('rewire'),
	handler = rewire('../handler/httpResponseHandler.js'),
    assert = require('chai').assert,
    expect = require('chai').expect

describe('Redis cache tests handleGetResponse', function () {


	it('bad json response error should be returned', sinon.test(function (done) {
	    var errorBody = {body:"Error"},
	        badJson = "{bad:}"

        handler.handleGetResponse(200, badJson, function(error, reply){
    		assert(error != null)

			done() 
        })

	}))
	it('bad response status response error should be returned', sinon.test(function (done) {
	    var errorBody = {error:"Error"},
	        json = "{error:2}"

        handler.handleGetResponse(404, JSON.stringify(errorBody), function(error, reply){
    		assert(error.message === errorBody.error)

			done() 
        })

	}))
})

describe('Redis cache tests handlePostResponse', function () {


	it('bad json response error should be returned', sinon.test(function (done) {
	    var errorBody = {body:"Error"},
	        badJson = "{bad:}"

        handler.handlePostReponse(null, "response", badJson, function(error, reply){
    		assert(error != null)

			done() 
        })

	}))
	it('error object is populated with 202', sinon.test(function (done) {
   	    var errorBody = {error:"Error"},
	        response = {statusCode:202}

       	handler.handlePostReponse(errorBody, response, null, function(error, reply){
    		assert(error.message === errorBody.message)

			done() 
        })

	}))
	it('bad response status response error should be returned', sinon.test(function (done) {
	    var errorBody = {error:"Error"},
	        json = {error:2},
	        response = {statusCode:400}

       	handler.handlePostReponse(null, response, json, function(error, reply){
    		assert(error.message != null)

			done() 
        })

	}))
	it('we get a 202 code, but bad json in response object', sinon.test(function (done) {
	    var errorBody = {error:"Error"},
	        badJson = "{bad:}"
	        response = {statusCode:202}

       	handler.handlePostReponse(null, response, badJson, function(error, reply){
    		assert(error.message === "Malformed JSON response")

			done() 
        })

	}))
	it('we get a 202 code, and return the correct body', sinon.test(function (done) {
	    var errorBody = {error:"Error"},
	        goodJson = {test:1}
	        response = {statusCode:202}

       	handler.handlePostReponse(null, response, JSON.stringify(goodJson), function(error, reply){
    		assert(!error)
    		assert(reply.test ===1)

			done() 
        })

	}))
})