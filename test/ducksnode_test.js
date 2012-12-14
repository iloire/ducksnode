var assert = require ('assert');

var options = {
  api_key : '',
  request : {
    post : function (options, callback) {
      callback(null, null);
    }
  }
};

describe('Push', function(){

  it ('should require api_key', function (done){
    assert.throws(function(){
      var ducksnode = require ('../lib/ducksnode').create(options);
    });
    done();
  });

  it ('should require valid widget', function (done){
    var options = {
      api_key : 'bP9qjpnsfVPLadW2gKR3vF4t62LI4z3Dfkc0e7LmNCebxBUjKH',
      request : {
        post : function (options, callback) {
          callback(null, null);
        }
      }
    };

    assert.throws(function(){
      var ducksnode = require ('../lib/ducksnode').create(options);
      ducksnode.push (2, 2);
    });
    done();
  });

  it ('should push with api_key (no callback)', function (done){
    options.api_key = 'bP9qjpnsfVPLadW2gKR3vF4t62LI4z3Dfkc0e7LmNCebxBUjKH'; //this is an example. not a valid key
    var ducksnode = require ('../lib/ducksnode').create(options);
    ducksnode.push ('widge1', 3);
    done();
  });

  it ('should push primitive with successful callback', function (done){
    options.request.post = function (options, callback) { //mock request post
      callback(null, {statusCode:200}, '');
    };

    var ducksnode = require ('../lib/ducksnode').create(options);
    ducksnode.push ('widget1', 3, function (err, response_status){
      assert.ok (!err);
      assert.equal (response_status, 200);
      done();
    });
  });

  it ('should push object with successful callback', function (done){
    options.request.post = function (options, callback) { //mock request post
      callback(null, {statusCode:200}, '');
    };

    var ducksnode = require ('../lib/ducksnode').create(options);
    ducksnode.push ('widget1', {value: 3, timestamp: +new Date()},
        function (err, response_status){
      assert.ok (!err);
      assert.equal (response_status, 200);
      done();
    });
  });

  it ('should push primitive with error callback (bad request)', function (done){
    options.request.post = function (options, callback) { //mock request post
      callback('error', {statusCode:400}, '');
    };

    var ducksnode = require ('../lib/ducksnode').create(options);
    ducksnode.push ('widget1', 3, function (err, response_status){
      assert.equal (err, 'Bad request. Please check your data');
      assert.equal (response_status, 400);
      done();
    });
  });

  it ('should push object with error callback (bad request)', function (done){
    options.request.post = function (options, callback) { //mock request post
      callback('error', {statusCode:400}, '');
    };

    var ducksnode = require ('../lib/ducksnode').create(options);
    ducksnode.push ('widget1', {value: 3, timestamp: +new Date()}, function (err, response_status){
      assert.equal (err, 'Bad request. Please check your data');
      assert.equal (response_status, 400);
      done();
    });
  });

  it('should push multiple times for array of widgets', function (done){
    var count = 0;

    options.request.post = function (options, callback) { //mock request post
      callback(null, {statusCode:400}, '');
    };

    var ducksnode = require ('../lib/ducksnode').create(options);
    ducksnode.push (['widget1', 'widget2'], {value: 3, timestamp: +new Date()}, function (err, response_status){
      if(++count === 2){
        assert.ok (true, 'Successfully made 2 post requests');
        done();
      }
    });
  });

});