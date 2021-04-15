const userApi = require('./userApi');

module.exports = {
  port: 4000,
  apis: [
    {
      name: 'UserApi',
      base: '/api/users',
      router: userApi,
    },
  ],
};
