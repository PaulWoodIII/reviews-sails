var _ = require('lodash');

module.exports = {

  /**
   * @param req
   */
  buildCallbackNextUrl: function(req) {
    var url = req.query.next;
    var includeToken = req.query.includeToken;
    var accessToken = _.get(req, 'session.tokens.accessToken');

    if (includeToken && accessToken) {
      return url + '?access_token=' + accessToken;
    }
    else {
      return url;
    }
  },
  isvalidtoken: function(req, res) {
    if (req.headers.authorization) {
      jwt.verify(req.headers.authorization.replace('Bearer ', ''), sails.config.secret, function(err, decoded) {
        if (err) return res.send({
          success: false
        });
        if (decoded) {
          return res.send({
            success: true,
            user: decoded[0]
          });
        }
      });
    }
    else {
      return res.send({
        success: false
      });
    }
  }
};
