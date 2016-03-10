var express = require('express');
var app = express();

app.use(express.static(__dirname + './../client/'));

//routes
var reddit    = require('./routes/reddit.rts');

app.use('/reddit',reddit);

app.listen(80,function(){
		console.log('Listening on http://127.0.0.1:%s',"80");
		console.log('Stop Server With CTRL + C');
	});
