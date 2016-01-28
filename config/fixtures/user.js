/**
 * Create admin user.
 * @param adminRole - the admin role which grants all permissions
 */
var _ = require('lodash');

exports.create = function (roles, userModel) {
  if (_.isEmpty(sails.config.permissions.adminPhone)) {
    throw new Error('sails.config.permissions.adminPhoneNumber is not set');
  }
  return sails.models.user.findOne({ phoneNumber: sails.config.permissions.adminPhone })
    .then(function (user) {
      if (user) return user;

      sails.log.info('sails-permissions: admin user does not exist; creating...');
      return sails.models.user.register({
        phoneNumber: sails.config.permissions.adminPhone,
        roles: [ _.find(roles, { name: 'admin' }).id ],
        createdBy: 1,
        owner: 1,
        model: userModel.id
      });
  });
};
