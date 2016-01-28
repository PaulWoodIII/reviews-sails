module.exports.policies = {  
  '*': [
    'hasToken',
    'passport',
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