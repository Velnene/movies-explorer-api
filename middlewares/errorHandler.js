const InternalServer = require('../respons/responsStatus');

const errorHandler = (err, req, res, next) => {
  const { status = 500, message } = err;

  res.status(status).send({
    message: status === InternalServer
      ? 'На сервере произошла ошибка.'
      : message,
  });
  next();
};

module.exports = errorHandler;
