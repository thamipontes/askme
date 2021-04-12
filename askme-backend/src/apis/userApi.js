const express = require("express");
const { User } = require("../entities/user");
const userRouter = express.Router();
const { UserRepository } = require('../repositories/userRepository');
const ApiResponse = require('./apiResponse');

userRouter.post("/create", (req, res) => {
    console.log(req.body);
    UserRepository.save(new User(req.body.name, req.body.password));
    res.status(200);
    res.send(ApiResponse(true, "Successfully created user!", null));
});

module.exports = userRouter;