const bcrypt = require('bcrypt');
const User = require('../models/user');
// const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const UnauthorizedError = require('../errors/UnauthorizedError');

// const { generateToken } = require('../utils/token');
const {
  OK,
  CREATED,
} = require('../respons/responsStatus');

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  if (!email || !password) {
    throw new BadRequestError('Поля неверно заполнены');
  }
  return User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError('Email уже зарегистрирован');
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => {
      res.status(CREATED).send({
        name: user.name,
        _id: user._id,
        email: user.email,
      });
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  console.log(req.params)
  const userId = req.user._id;
  console.log(req)
  User.findById(userId)
    .then((user) => res.status(OK).send(user))
    .catch((e) => {
      if (res.status === 401) {
        next(new UnauthorizedError('Не авторизован пользователь'));
      } return next(e);
    });
};

const updateUser = (req, res, next) => {
  const userId = req.user._id;
  const { name, email } = req.body;
  User.findByIdAndUpdate(userId, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      res.status(OK).send(user);
    })
    .catch((e) => {
      if (e.name === 'ValidationError' || e.email === 'CastError') {
        next(new BadRequestError('Поля неверно заполнены'));
      } return next(e);
    });
};

module.exports = {
  getCurrentUser,
  createUser,
  updateUser,
};