const express = require('express');
const mongoose = require('mongoose');
// const cors = require('cors');
// const rateLimit = require('express-rate-limit');
// const helmet = require('helmet');
// const { errors } = require('celebrate');
// const errorHandler = require('./middlewares/errorHandler');
// const { requestLogger, errorLogger } = require('./middlewares/logger');
// const NotFoundError = require('./errors/NotFoundError');
const { login, createUser } = require('./controlles/user');
// const { loginValidate, createValidate } = require('./errors/userError');
const { userRouter, movieRouter } = require('./routes');

const app = express();
// app.use(cors());

const {
  PORT = 3000,
  MONGO_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb',
} = process.env;
// app.use(helmet());
app.use(express.json());
// app.use(requestLogger);

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
//   standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
//   legacyHeaders: false, // Disable the `X-RateLimit-*` headers
// });
// app.use(limiter);

// app.get('/crash-test', () => {
//   setTimeout(() => {
//     throw new Error('Сервер сейчас упадёт');
//   }, 0);
// });

// app.post('/signin', loginValidate, login);
app.post('/signup', createUser);

app.use(userRouter);
app.use(movieRouter);
// app.use(cardRouter);

// app.use('*', (req, res, next) => {
//   next(new NotFoundError('Маршрут не найден'));
// });

// app.use(errorLogger);
// app.use(errors());
// app.use(errorHandler);
mongoose.connect(MONGO_URL, {});

app.listen(PORT, () => { });
