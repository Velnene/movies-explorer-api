const bcrypt = require('bcrypt');
const User = require('../models/user');

const NotFoundError = require('../errors/NotFoundError');
const { handleConflictError } = require('../errors/handleConflictError');
const { generateToken } = require('../utils/token');
const {
  OK,
  CREATED,
} = require('../respons/responsStatus');

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({ name, email, password: hash }))
    .then((user) => {
      res.status(CREATED).send({
        name: user.name,
        _id: user._id,
        email: user.email,
      });
    })
    .catch((err) => handleConflictError(err, next));
};

const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => res.status(OK).send(user))
    .catch((e) => {
      if (res.status === 404) {
        next(new NotFoundError('Не авторизован пользователь'));
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
    .catch((e) => handleConflictError(e, next));
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = generateToken({ _id: user.id });
      res.status(OK).send({ token });
    })
    .catch(next);
};

module.exports = {
  getCurrentUser,
  createUser,
  updateUser,
  login,
};
