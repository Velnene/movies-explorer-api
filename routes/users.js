const express = require('express');

const userRouter = express.Router();
const {
  getCurrentUser,
  createUser,
  updateUser,
} = require('../controlles/user');

userRouter.get('/users/me', getCurrentUser);
userRouter.patch('/users/me', updateUser);
module.exports = userRouter;