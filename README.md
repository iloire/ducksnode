[![build status](https://secure.travis-ci.org/iloire/ducksnode.png)](http://travis-ci.org/iloire/ducksnode)
# ducksnode

Node.js Ducksboard API wrapper

## Getting Started
Install the module with: `npm install ducksnode`

```javascript
var options = {
	api_key : '#your api key#'
};

var ducksnode = require('ducksnode').create(options);

// simple push to 'my_widget'
ducksnode.push('my_widget', 324);

//pushing an object instead of a primitive value.
ducksnode.push('my_widget', {value: 324, timestamp: 1342421466862});

// push to 'my_widget' with callback
ducksnode.push('my_widget', 324, function (err, response_status){
	if (err){
		console.error(err); //error pushing to ducksboard server.
	}
});
```
Run the tests with: `npm test` (requires mocha)

## Examples
Look into the "examples" folder

## Release History
### 0.1.0 Initial release

## TODO
 - Pull API
 - Http Pull API
 - Websockets API
 - Dashboard API

## License
Copyright (c) 2012 Iván Loire
Licensed under the MIT license.
