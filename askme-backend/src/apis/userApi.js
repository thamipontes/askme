const express = require('express');
const apiResponse = require('./apiResponse');
const UserService = require('../services/userService');
const UserCreateCommand = require('../models/user.createCommand');

// eslint-disable-next-line new-cap
const userRouter = express.Router();

userRouter.post('', async (req, res, next) => {
  let result = null;
  try {
    result = await UserService.createUser(
        new UserCreateCommand(
            req.body.email,
            req.body.name,
            req.body.password,
            req.body.passwordConfirmation),
    );
  } catch (err) {
    next(err);
    return;
  }

  res.status(200);
  res.send(apiResponse(true, 'Usuário criado com sucesso!', result.toObject()));
});

module.exports = userRouter;
