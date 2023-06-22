const express = require('express');
const { errors } = require('celebrate');
const auth = require('../middlewares/auth');
const errorHandler = require('../middlewares/errorHandler');
const { requestLogger, errorLogger } = require('../middlewares/logger');
const { login, createUser } = require('../controlles/user');
const { loginValidate, createValidate } = require('../errors/userErrors');
const NotFoundError = require('../errors/NotFoundError');
const limiter = require('../utils/rateLimit');
const userRouter = require('./users');
const movieRouter = require('./movies');

const route = express.Router();

route.use(requestLogger);
route.use(limiter);
route.use(express.json());

route.post('/signin', loginValidate, login);
route.post('/signup', createValidate, createUser);
route.use(auth);
route.use(userRouter);
route.use(movieRouter);

route.use('*', (req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

route.use(errorLogger);
route.use(errors());
route.use(errorHandler);

module.exports = {
  route,
};
