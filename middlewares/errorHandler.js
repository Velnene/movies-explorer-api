const InternalServer = require('../respons/responsStatus');

const errorHandler = (err, req, res, next) => {
  const { status = InternalServer, message } = err;

  res.status(status).send({
    message: status === InternalServer
      ? 'На сервере произошла ошибка.'
      : message,
  });
  next();
};

module.exports = errorHandler;
