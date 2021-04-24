const express = require('express');
const TokenService = require('../services/tokenService');
const apiResponse = require('./apiResponse');

// eslint-disable-next-line new-cap
const quizRouter = express.Router();

quizRouter.get('', (req, res, next) => {
  const token = TokenService.getRequiredTokenFromRequest(req);
  res.send(apiResponse(
      200, 'OK',
      [TokenService.getRoleFromToken(token)]));
});

module.exports = quizRouter;
