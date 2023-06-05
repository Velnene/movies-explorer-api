const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const isEmail = require('validator/lib/isEmail');
const UnauthorizedError = require('../errors/UnauthorizedError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (isValid) => isEmail(isValid),
      message: 'Почта не валидна',
    },
  },
  password: {
    type: String,
    minlength: 8,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password').then((user) => {
    if (!user) {
      throw new UnauthorizedError('Неправильные почта или пароль');
    }
    return bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }
      return user;
    });
  });
};

module.exports = mongoose.model('user', userSchema);
