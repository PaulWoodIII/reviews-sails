var expressJwt = require('express-jwt');
var secret = sails.config.session.secret;

module.exports = expressJwt({secret: secret, userProperty:'user'});