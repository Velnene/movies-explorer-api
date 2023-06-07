const ConflictError = require('./ConflictError');
const BadRequestError = require('./BadRequestError');

const handleConflictError = (err, next) => {
  if (err.code === 11000) {
    next(new ConflictError('Email уже зарегистрирован'));
  } else if (err.name === 'ValidationError') {
    next(new BadRequestError('Поля неверно заполнены'));
  }
  return next(err);
};

module.exports = { handleConflictError };
