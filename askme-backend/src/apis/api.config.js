const quizRouter = require('./quizApi');
const userApi = require('./userApi');

module.exports = {
  port: 4000,
  apis: [
    {
      name: 'UserApi',
      base: '/api/users',
      router: userApi,
    },
    {
      name: 'QuizApi',
      base: '/api/quiz',
      router: quizRouter,
    },
  ],
};
