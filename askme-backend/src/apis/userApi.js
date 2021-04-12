const express = require("express");
const User = require("../entities/user");
const userRouter = express.Router();
const ApiResponse = require('./apiResponse');
const UserService = require('../services/userService');

userRouter.post("/create", async (req, res) => {
    var result = await UserService.createUser(new User(req.body.name, req.body.password));

    if(result==null) {
        res.sendStatus(400);
        return;
    }

    res.status(200);
    res.send(ApiResponse(true, "Successfully created user!", result.toObject()));
});

module.exports = userRouter;