var options = {
  api_key : '#your api here#'
};

//create ducksnode object
var ducksnode = require ('../lib/ducksnode').create(options);

// Get the last 5 values, ordered by their timestamp, newest data first.
// http://dev.ducksboard.com/apidoc/pull-api-http/#get-values-label-last-count-count
ducksnode.pull('widget', {last: 5}, function(err, response_status, data) {
  console.log('Last 5 values');
  console.log(err || JSON.stringify(data, undefined, 2));
});

// Get all values from up to 3600 seconds ago, ordered by their timestamp,
// newest data first.
// http://dev.ducksboard.com/apidoc/pull-api-http/#get-values-label-since-seconds-seconds
ducksnode.pull('widget', {since: 3600}, function(err, response_status, data) {
  console.log('All values from up to 1h ago');
  console.log(err || JSON.stringify(data, undefined, 2));
});

// Get the last daily values for the last week.
// http://dev.ducksboard.com/apidoc/pull-api-http/#get-values-label-timespan-timespan-timespan-timezone-timezone
ducksnode.pull('widget', {timespan: 'weekly', 'timezone': 'UTC'},
  function(err, response_status, data) {
    console.log('Last week');
    console.log(err || JSON.stringify(data, undefined, 2));
});