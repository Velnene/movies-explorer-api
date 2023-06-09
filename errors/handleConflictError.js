const ConflictError = require('./ConflictError');

const handleConflictError = (err, next) => {
  if (err.code === 11000) {
    return next(new ConflictError('Email уже зарегистрирован'));
  }
  return next(err);
};

module.exports = { handleConflictError };
