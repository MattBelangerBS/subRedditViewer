var express = require('express');


var app = express();

app.use(express.static(__dirname + './../app/'));



app.listen(80,function(){
		console.log('Listening on http://127.0.0.1:%s',"80");
		console.log('Stop Server With CTRL + C');
	});
