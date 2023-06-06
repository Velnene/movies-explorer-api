const express = require('express');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controlles/user');
const { loginValidate, createValidate } = require('../errors/userErrors');

const userRouter = require('./users');
const movieRouter = require('./movies');

const route = express.Router();

route.post('/signin', loginValidate, login);
route.post('/signup', createValidate, createUser);
route.use(auth);
route.use(userRouter);
route.use(movieRouter);

module.exports = {
  route,
};
