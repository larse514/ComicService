var sinon = require('sinon'),
    rewire = require('rewire'),
	handler = rewire('../handler/httpResponseHandler.js'),
    assert = require('chai').assert,
    expect = require('chai').expect

describe('Redis cache tests handleGetResponse', function () {


	it('bad json response error should be returned', sinon.test(function (done) {
	    var errorBody = {body:"Error"},
	        badJson = "{bad:}"

        handler.handleGetResponse(null, 200, badJson, function(error, reply){
    		assert(error != null)

			done() 
        })

	}))
	it('bad response status response error should be returned', sinon.test(function (done) {
	    var errorBody = {message: "badRequest"},
	        json = "{error:2}"

        handler.handleGetResponse(null, 404, JSON.stringify(errorBody), function(error, reply){
        	console.log(error.message)
        	console.log(errorBody)
    		assert(error.message.error === errorBody.message.error)

			done() 
        })

	}))
	it('if http get throws an error (e.g. 404) it returns error code', sinon.test(function (done) {
	    var error = {error:"Error"},
	        json = "{error:2}"

        handler.handleGetResponse(error, null, null, function(error, reply){
    		assert(error.message === "Error calling RedisCache")

			done() 
        })

	}))
	it('Good request', sinon.test(function (done) {
		var data = {data:"good"};
	    var body = {value: data},
	        json = "{error:2}"

        handler.handleGetResponse(null, 200, JSON.stringify(body), function(error, reply){
    		assert(!error)
			assert(reply.data === data.data)
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
	it('error object is populated with 201', sinon.test(function (done) {
   	    var errorBody = {error:"Error"},
	        response = {statusCode:201}

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
	it('we get a 201 code, but bad json in response object', sinon.test(function (done) {
	    var errorBody = {error:"Error"},
	        badJson = "{bad:}"
	        response = {statusCode:201}

       	handler.handlePostReponse(null, response, badJson, function(error, reply){
    		assert(error.message === "Malformed JSON response")

			done() 
        })

	}))
	it('we get a 201 code, and return the correct body', sinon.test(function (done) {
	    var errorBody = {error:"Error"},
	        goodJson = {value:1}
	        response = {statusCode:201}

       	handler.handlePostReponse(null, response, JSON.stringify(goodJson), function(error, reply){
    		assert(!error)
    		assert(reply===1)

			done() 
        })

	}))
})