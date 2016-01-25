var path = require('path');
var _ = require('lodash');


module.exports = function permissions(sails) {
  
  var permissionPolicies = [
    'passport',
    'sessionAuth',
    'ModelPolicy',
    'OwnerPolicy',
    'PermissionPolicy',
    'RolePolicy'
  ];

  function validatePolicyConfig() {
    var policies = sails.config.policies;
    return _.all([
      _.isArray(policies['*']),
      _.intersection(permissionPolicies, policies['*']).length === permissionPolicies.length,
      policies.AuthController && _.contains(policies.AuthController['*'], 'passport')
    ]);
  }

  function installModelOwnership() {
    var models = sails.models;
    if (sails.config.models.autoCreatedBy === false) return;

    _.each(models, model => {
      if (model.autoCreatedBy === false) return;

      _.defaults(model.attributes, {
        createdBy: {
          model: 'User',
          index: true
        },
        owner: {
          model: 'User',
          index: true
        }
      });
    });
  }

  /**
   * Install the application. Sets up default Roles, Users, Models, and
   * Permissions, and creates an admin user.
   */
  function initializeFixtures() {
    var fixturesPath = path.resolve(__dirname, '../../../config/fixtures/');
    return require(path.resolve(fixturesPath, 'model')).createModels()
      .then(function(models) {
        this.models = models;
        sails.hooks.permissions._modelCache = _.indexBy(models, 'identity');

        return require(path.resolve(fixturesPath, 'role')).create();
      })
      .then(function(roles){
        this.roles = roles;
        var userModel = _.find(this.models, {
          name: 'User'
        });
        return require(path.resolve(fixturesPath, 'user')).create(this.roles, userModel);
      })
      .then(() => {
        return sails.models.user.findOne({
          email: sails.config.permissions.adminEmail
        });
      })
      .then(user => {
        sails.log('sails-permissions: created admin user:', user);
        user.createdBy = user.id;
        user.owner = user.id;
        return user.save();
      })
      .then(admin => {
        return require(path.resolve(fixturesPath, 'permission')).create(this.roles, this.models, admin);
      })
      .catch(error => {
        sails.log.error(error);
      });
  }

  function validateDependencies() {
    return !!sails.hooks.auth;
  }


  return {
    configure: function() {
      if (!_.isObject(sails.config.permissions)) sails.config.permissions = {};
      /**
       * Local cache of Model name -> id mappings to avoid excessive database lookups.
       */
      sails.config.blueprints.populate = false;
    },
    initialize: function(next) {
      var config = sails.config.permissions;
      installModelOwnership();
      sails.after(config.afterEvent, () => {
        if (!validateDependencies()) {
          sails.log.error('Cannot find sails-auth hook. Did you "npm install sails-auth --save"?');
          sails.log.error('Please see README for installation instructions: https://github.com/tjwebb/sails-permissions');
          return sails.lower();
        }

        if (!validatePolicyConfig()) {
          sails.log.warn('One or more required policies are missing.');
          sails.log.warn('Please see README for installation instructions: https://github.com/tjwebb/sails-permissions');
        }

      });

      sails.after('hook:orm:loaded', () => {
        sails.models.model.count()
          .then(count => {
            if (count === _.keys(sails.models).length) return next();

            return initializeFixtures()
              .then(function() {
                next();
              });
          })
          .catch(function(error) {
            sails.log.error(error);
            next(error);
          });
      });

    }

  };
};