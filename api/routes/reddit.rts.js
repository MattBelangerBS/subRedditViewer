var express = require('express');
var router = express.Router();
var https = require("https");

//https://reddit.com/r/hearthstone/.json

router.get('/:sub',function(req,res){
   
    https.get('https://www.reddit.com/r/'+req.params.sub+'/.json', function(response) {

        var body = '';
        response.on('data', function(d) {
            console.log('data: ' + d);
            body += d;
        });
        response.on('end', function() {
            res.json(body);
        }); 
        
    }).on('error',function(err) {
        console.log(err);
    });
  
});

module.exports = router;