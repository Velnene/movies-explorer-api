// const bcrypt = require('bcrypt');
const User = require('../models/user');
// const NotFoundError = require('../errors/NotFoundError');
// const BadRequestError = require('../errors/BadRequestError');
// const ConflictError = require('../errors/ConflictError');
const UnauthorizedError = require('../errors/UnauthorizedError');

// const { generateToken } = require('../utils/token');
const {
  OK,
  CREATED,
} = require('../respons/responsStatus');

const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => res.status(OK).send(user))
    .catch((e) => {
      if (res.status === 401) {
        next(new UnauthorizedError('Не авторизован пользователь'));
      } return next(e);
    });
};

module.exports = {
  getCurrentUser,
};