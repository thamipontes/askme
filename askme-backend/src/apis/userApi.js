const express = require('express');
const apiResponse = require('./apiResponse');
const UserService = require('../services/userService');
const UserCreateCommand = require('../models/user.createCommand');
const UserLoginCommand = require('../models/user.loginCommand');

// eslint-disable-next-line new-cap
const userRouter = express.Router();

// issue: I-12
const userCreateHandler = async (req, res, next) => {
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
};
userRouter.post('', userCreateHandler);

// issue: I-16
const userLoginHandler = async (req, res, next) => {
  let result = null;

  try {
    result = await UserService.loginUser(
        new UserLoginCommand(
            req.body.email,
            req.body.password,
        ),
    );
  } catch (err) {
    next(err);
    return;
  }

  res.status(200);
  res.send(apiResponse(true, 'Login realizado com sucesso!', {
    token: result,
  }));
};
userRouter.post('/login', userLoginHandler);

// issue: I-32
const adminLoginHandler = async (req, res, next) => {
  let result = null;

  try {
    result = await UserService.loginAdmin(
        new UserLoginCommand(
            req.body.email,
            req.body.password,
        ),
    );
  } catch (err) {
    next(err);
    return;
  }

  res.status(200);
  res.send(apiResponse(true, 'Login realizado com sucesso!', {
    token: result,
  }));
};
userRouter.post('/login-admin', adminLoginHandler);

module.exports = userRouter;
