var models 	= require('./../models');
var bcrypt	= require('bcrypt');
var jwt		= require('jsonwebtoken');
var router 	= require('express').Router();


//register a new user
router.post('/register',function(req,res){
	console.log('Registration Endpoint');
	var __user = req.body;
	
	//check if user is already registered
	var where = {where:{email:__user.email}};
	models.Users.find(where)
	.then(function(user){
		if(!user){
			//user does not exist
			//encrypt password
			bcrypt.genSalt(10, function(err, salt) {
		    	bcrypt.hash(__user.password, salt, function(err, hash) {
		       		// Store hash in your password DB. 
		        	__user.password = hash;
		        	models.Users.create(__user)
		        	.then(function(user){
		        		//remove password from response
		        		delete user.password;
		        		res.json({user:user,msg:'Account Created'});
		        	})
		    	});
			});
		}else{
			res.json({user:null,msg:'Email is already registered'})
		}
		
	});
});

router.post('/authenticate',function(req,res){
	console.log('Authentication Endpoint');
	var __user = req.body;

	var where = {where:{email:__user.email}};
	models.Users.find(where)
	.then(function(user){
		if(user){
			//check incoming password against encrypted version
			bcrypt.compare(__user.password, user.password, function(err, valid) {
			    if(valid){
			    	//remove password from response
			    	// delete user.password;
			    	//set web token
			    	var user_obj = {email:user.email};
                    //this is auth salt, just random make it whenat you want
                    //usally save token auth token in database , usaully geneated rndomly base on time or something
			    	var token = jwt.sign(user_obj,'Fv1f3Y37S3RorBbT4PumpWVHejaEYnGs');
                    //sets auth token to header
					res.set('authentication',token);
			    	res.json({user:user,msg:'Authenticated'});
			    }
			    else{
			    	res.json({user:null,msg:'Email/Password is incorrect'})
			    }
			});
		}
		else{
			res.json({user:null,msg:'Email/Password is incorrect'})
		}
	})

})

module.exports = router;