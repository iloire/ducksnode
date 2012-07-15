var options = {
	api_key : '#your api here#'
};

//create ducksnode object
var ducksnode = require ('../lib/ducksnode').create(options);

//simple push call
ducksnode.push ('absolute', Math.random()*1000);

//push call with callback
ducksnode.push ('boxes1', Math.random()*1000, function(err, response_status){
	if (err){
		console.error(err);
	}
	else{
		console.log('OK!');
	}
});

//with timestamp (we send object instead of primitive value)
var timestamp = +new Date() - Math.random() * 100 * 60 * 60;
ducksnode.push ('chart1', {value:111, timestamp: timestamp});