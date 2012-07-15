# ducksnode

Ducksboard API wrapper on node.js

## Getting Started
Install the module with: `npm install ducksnode`

```javascript
var options = {
	api_key : '#your api key#'
};

var ducksnode = require('ducksnode').create(options);

// simple push to 'my_widget'
ducksnode.push('my_widget', 324);

// push to 'my_widget' with callback
ducksnode.push('my_widget', 324, function (err, response_status){
	if (err){
		console.error(err); //error pushing to ducksboard server.
	}
});
```

## Examples
Look into the "examples" folder

## Tests
Run the tests:

```npm test

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
