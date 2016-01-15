var express = require('express');


var app = express();

app.use(express.static(__dirname + './../app/'));



app.listen(8080,function(){
		console.log('Listening on http://127.0.0.1:%s',"8080");
		console.log('Stop Server With CTRL + C');
	});
