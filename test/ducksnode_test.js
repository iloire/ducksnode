var assert = require ('assert');

var options = {
  api_key : '',
  request : {
    post : function (options, callback) {
      callback(null, null);
    },
    get : function(options, callback) {
      callback(null, null, '');
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

describe('Pull', function(){

  it ('should pull with api_key (no callback)', function (done){
    options.api_key = 'bP9qjpnsfVPLadW2gKR3vF4t62LI4z3Dfkc0e7LmNCebxBUjKH'; //this is an example. not a valid key
    var ducksnode = require ('../lib/ducksnode').create(options);
    ducksnode.pull ('widge1', {last: 1});
    done();
  });

  it ('should require arguments (no callback)', function (done){
    options.api_key = 'bP9qjpnsfVPLadW2gKR3vF4t62LI4z3Dfkc0e7LmNCebxBUjKH'; //this is an example. not a valid key
    var ducksnode = require ('../lib/ducksnode').create(options);
    assert.throws(function(){
      ducksnode.pull ('widge1');
    });
    done();
  });

  it ('should pull with valid arguments (last three days)', function (done){
    options.request.get = function (options, callback) { //mock request post
      assert.ok(options.url.indexOf('/values/widget1/last?count=3') > -1);
      callback(null, {statusCode:200}, '');
    };

    var ducksnode = require ('../lib/ducksnode').create(options);
    ducksnode.pull ('widget1', {last: 3}, function (err, response_status, data){
      assert.ok (!err);
      assert.equal (response_status, 200);
      done();
    });
  });

  it ('should pull with valid arguments (since 3600 seconds)', function (done){
    options.request.get = function (options, callback) { //mock request post
      assert.ok(options.url.indexOf('/values/widget1/since?seconds=3600') > -1);
      callback(null, {statusCode:200}, '');
    };

    var ducksnode = require ('../lib/ducksnode').create(options);
    ducksnode.pull ('widget1', {since: 3600}, function (err, response_status, data){
      assert.ok (!err);
      assert.equal (response_status, 200);
      done();
    });
  });

  it ('should pull with valid arguments (timespan with optional timezone)', function (done){
    options.request.get = function (options, callback) { //mock request post
      assert.ok(options.url.indexOf('/values/widget1/&timezone=UTC') > -1);
      callback(null, {statusCode:200}, '');
    };

    var ducksnode = require ('../lib/ducksnode').create(options);
    ducksnode.pull ('widget1', {timespan: 'daily', timezone: 'UTC'}, function (err, response_status, data){
      assert.ok (!err);
      assert.equal (response_status, 200);
      done();
    });
  });

  it('should pull multiple times for array of widgets', function (done){
    var count = 0;

    options.request.get = function (options, callback) { //mock request post
      callback(null, {statusCode:200}, '');
    };

    var ducksnode = require ('../lib/ducksnode').create(options);
    ducksnode.pull (['widget1', 'widget2'], {last: 3}, function (err, response_status, data){
      assert.equal (response_status, 200);
      assert.ok (!err);
      if(++count === 2){
        assert.ok (true, 'Successfully made 2 pull requests');
        done();
      }
    });
  });

});