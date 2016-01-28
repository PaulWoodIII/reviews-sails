var request = require('request');

/**
 * Authentication Controller
 */
module.exports = {
    /**
     * Disconnect a passport from a user
     *
     * @param {Object} req
     * @param {Object} res
     */
    verifyDigits: function(req, res) {
        var options = {
            url: 'https://api.digits.com/1.1/sdk/account.json',
            headers: {
                'Authorization': req.body['X-Verify-Credentials-Authorization']
            }
        };

        request(options, function(error, response, body) {
            var info = JSON.parse(body);
            sails.log.verbose(body);
            if (error || response.statusCode != 200) {
                return res.send(401, 'Unauthorized');
            }
            // If twitter responds with a 200, the echo call was authorized
            sails.models.user.findOne({
                    phoneNumber: info.phone_number
                })
                .then(function(user) {
                    if(user) {
                        req.user = user;
                    }
                    var query = {
                        identifier: info.phone_number,
                        tokens: info.access_token,
                        protocol: 'oauth2',
                        provider: 'digits'
                    };
                    var profile = {
                        phoneNumber: info.phone_number,
                        provider: 'digits',
                        protocol: 'oauth2',
                        id: info.id_str,
                        verification_type: info.verification_type,
                        created_at: info.created_at,
                    };
                    // TODO: do stuff
                    sails.services.passport.connect(req, query, profile, function(err, authResponse) {
                        if (err) {
                            return res.send(403, err);
                        }
                        return res.json(authResponse);
                    });
                })
                .catch(function(err) {
                    return res.send(403, err);
                });
        });
    }

};