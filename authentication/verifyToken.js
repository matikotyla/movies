const jwt = require('jsonwebtoken');

function checkAuthenticated(req, res, next) {
    // Get token
    const token =
        req.body.token ||
        req.query.token ||
        req.header('auth-token') ||
        req.cookies.token;

    // Check if token exists and verify token
    if(!token) {
        return res.status(401).send('Access denied');
    } else {
        jwt.verify(token, process.env.SECRET, function(err, decoded) {
            if(err) {
                res.status(400).send('Invalid token');
            } else {
                req.user = decoded;
                next();
            }
        });
    }
}

function checkNotAuthenticated(req, res, next) {
    // Get token
    const token =
        req.body.token ||
        req.query.token ||
        req.header('auth-token') ||
        req.cookies.token;

    // Check if token exists and verify token
    if(!token) {
        next();
    } else {
        jwt.verify(token, process.env.SECRET, function(err, decoded) {
            if(err) {
                next();
            } else {
                return res.status(401).send('You are logged in');
            }
        });
    }
}

module.exports.checkAuthenticated = checkAuthenticated;
module.exports.checkNotAuthenticated = checkNotAuthenticated;