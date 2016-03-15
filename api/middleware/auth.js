var jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // check header or url parameters or post parameters for token
    //console.log(req.headers);
    var token = req.body.token || req.headers['authentication'];
    //console.log(token);
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, 'Fv1f3Y37S3RorBbT4PumpWVHejaEYnGs', function(err, decoded) {          
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });      
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;  
                next();
            }
        });
        
    } else {
        // if there is no token
        // return an error
        return res.status(403).send({ 
            success: false, 
            message: 'No token provided.'
        });

    }

};