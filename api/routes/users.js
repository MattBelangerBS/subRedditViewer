var models 	= require('./../models');
var router 	= require('express').Router();
var jwt = require('jsonwebtoken');

//get all users
router.get('/',function(req,res){
	models.Users.findAll()
	.then(function(users){
		res.json({users:users});
	})
})
//check if authtoekjn is valid
router.get('/check',function(req,res){
	res.send('valid');
})

//delete test accounts via url bar
router.get('/:userId',function(req,res){
	var where = {where:{id:req.params.userId}}
	models.Users.find(where).then(function(user){
		user.destroy();
		res.json({
			deleted:true
		});	
	});
});

//delete test accounts via url bar
router.put('/',function(req,res){
    var __reddits = JSON.stringify(req.body.data);
    var __email = '';
    
    console.log(req.body)
    token = req.headers['authentication'];
   // console.log(token);  
    jwt.verify(token, 'Fv1f3Y37S3RorBbT4PumpWVHejaEYnGs', function(err, decoded) {          
            if(!err){
                var where = {where:{email:decoded.email}}
                console.log(decoded.email);
                models.Users.find(where).then(function(user){
                    user.updateAttributes({
                        reddits:__reddits
                    });
                    res.json({
                        data:'all good'
                    });
                });
            }
            
        });
    
    
	
	
});

module.exports = router;