const express = require('express');
const TokenService = require('../services/tokenService');
const apiResponse = require('./apiResponse');

// eslint-disable-next-line new-cap
const quizRouter = express.Router();

quizRouter.get('', (req, res, next) => {
  res.send(apiResponse(
      200, 'OK', [TokenService.decodeToken(req.headers.authorization).role]));
});

module.exports = quizRouter;
