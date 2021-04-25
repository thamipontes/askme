const express = require('express');
const QuizCreateCommand = require('../models/quiz.createCommand');
const QuizService = require('../services/quizService');
const TokenService = require('../services/tokenService');
const UserService = require('../services/userService');
const apiResponse = require('./apiResponse');

// eslint-disable-next-line new-cap
const quizRouter = express.Router();

quizRouter.get('', (req, res, next) => {
  const token = TokenService.getRequiredTokenFromRequest(req);
  res.send(apiResponse(
      200, 'OK',
      [TokenService.getRoleFromToken(token)]));
});

quizRouter.post('', async (req, res, next) => {
  try {
    const token = TokenService.getRequiredTokenFromRequest(req);
    const creatorId = TokenService.getUserIdFromToken(token);

    // Check user existance
    await UserService.getUserById(creatorId);

    await QuizService.createQuiz(new QuizCreateCommand(
        creatorId, req.body.title, req.body.isAnonymous,
    ));
  } catch (err) {
    next(err);
  }
});

module.exports = quizRouter;
