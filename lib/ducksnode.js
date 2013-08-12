/**
 * ducksnode
 *
 * Ducksboard API wrapper on node.js
 * https://github.com/iloire/ducksnode
 *
 * Copyright (c) 2012 Iván Loire
 * Licensed under the MIT license.
 */

var push_api_url = 'push.ducksboard.com/values/';
var pull_api_url = 'pull.ducksboard.com/values/';

exports.create = function(options) {
  var request = options.request || require ('request');

  if (!options.api_key){
    throw 'api_key required';
  }

  var errors = {
    400: 'Bad request. Please check your data',
    401: 'Unauthorized: API KEY not valid',
    403: 'Forbidden: You are not allowed to access this specific resource',
    404: 'Not found',
    413: 'Request Entity Too Large',
    500: 'Server Error'
  };

  return {

   /**
    * Push data to Ducksboard server
    */

    'push' : function (widget, data, callback){
      var url = 'https://' + options.api_key + ':x@' + push_api_url,
          widgetString;

      if (typeof data !== 'object'){ //accept both primitives or objects
        data = {value: data};
      }

      var cb_response = function (err, response, body){
        if (callback) {
          callback (err ? errors[response.statusCode] : null, response.statusCode);
        }
      };

      (Array.isArray(widget) ? widget : [widget]).forEach(function (entry){
        request.post({url: url + entry, json: true, body: data}, cb_response);
      });
    },


   /**
    * Pull data from Ducksboard server
    */

    'pull' : function (widget, args, callback){
      var url = 'https://' + options.api_key + ':x@' + pull_api_url,
          predicate;
      args = args || {};

      if (parseInt(args.last) > 0) {
        predicate = 'last?count=' + args.last;
      } else if (parseInt(args.since) > 0) {
        predicate = 'since?seconds=' + args.since;
      } else if (args.timespan) {
        predicate = 'timespan?timespan=' + args.timespan;
        if (args.timezone) {
          predicate = '&timezone=' + args.timezone;
        }
      } else {
        throw 'Invalid arguments';
      }

      var cb_response = function (err, response, body){
        if (callback) {
          callback (err ? errors[response.statusCode] : null, response.statusCode, body);
        }
      };

      (Array.isArray(widget) ? widget : [widget]).forEach(function (entry){
        request.get({url: url + entry + '/' + predicate, json: true}, cb_response);
      });
    }
  };
};
