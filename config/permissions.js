module.exports.permissions = {
  name: 'permissions',
  adminPhone: process.env.ADMIN_PHONE,
  afterEvents: [
    'hook:auth:initialized'
  ]
};
