const express = require('express');
const auth = require('../middlewares/auth');

const userRouter = express.Router();
const {
  getCurrentUser,
  updateUser,
} = require('../controlles/user');

userRouter.use(auth);
userRouter.get('/users/me', getCurrentUser);
userRouter.patch('/users/me', updateUser);
module.exports = userRouter;
