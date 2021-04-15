const express = require('express');
const apiResponse = require('./apiResponse');
const UserService = require('../services/userService');
const UserCreateCommand = require('../commands/user.createCommand');

// eslint-disable-next-line new-cap
const userRouter = express.Router();

userRouter.post('/create', async (req, res) => {
  const result = await UserService.createUser(
      new UserCreateCommand(req.body.name,
          req.body.password, req.passwordConfirmation),
  );

  if (result==null) {
    res.sendStatus(400);
    return;
  }

  res.status(200);
  res.send(apiResponse(true, 'Successfully created user!', result.toObject()));
});

module.exports = userRouter;
