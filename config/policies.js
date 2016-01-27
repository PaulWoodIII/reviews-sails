module.exports.policies = {  
  '*': [
    'basicAuth',
    'passport',
    'sessionAuth',
    'ModelPolicy',
    'AuditPolicy',
    'OwnerPolicy',
    'PermissionPolicy',
    'RolePolicy',
    'CriteriaPolicy'
  ],
  DigitsController: true,
  AuthController: {
    '*': ['passport']
  },
  UserController: { create: true }
};