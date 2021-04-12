const userApi = require('./userApi');

module.exports = {
    port: 3000,
    apis: [
        {
            name: "UserApi",
            base: "/api/users",
            router: userApi
        }
    ],
};