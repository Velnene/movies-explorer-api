const express = require('express');

const userRouter = express.Router();
const {
  getCurrentUser,
  updateUser,
} = require('../controlles/user');

userRouter.get('/users/me', getCurrentUser);
userRouter.patch('/users/me', updateUser);
module.exports = userRouter;
