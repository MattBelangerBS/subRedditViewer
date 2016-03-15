var express = require('express');
var app = express();
var bodyParser	= require('body-parser');
var authentication = require("./middleware/auth");
var models	 	= require('./models');

app.use(express.static(__dirname + './../client/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
//routes
var reddit    = require('./routes/reddit.rts');
var auth_routes = require('./routes/auth');
var user_routes = require('./routes/users');

app.use('/reddit',reddit);
app.use('/api/auth',auth_routes);
//has to pass thru middle ware
app.use('/api/users',authentication,user_routes);


models.sequelize.sync().then(function(){
	app.listen(80,function(){
		console.log('Server started at http://localhost:%s80');
		console.log('Stop with CTRL + C');
	})
});
