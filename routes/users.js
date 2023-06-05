const express = require('express');

const userRouter = express.Router();
const {
  getCurrentUser,
} = require('../controlles/user');

userRouter.get('/users/me', getCurrentUser);

module.exports = userRouter;