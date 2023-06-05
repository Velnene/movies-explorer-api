const Movie = require('../models/user');
// const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const UnauthorizedError = require('../errors/UnauthorizedError');

const getCards = (req, res, next) => {
  Movie.find()
    .populate(['owner', 'likes'])
    .sort({ createdAt: -1 })
    .then((movies) => {
      res.status(OK).send(movies);
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId } = req.body;
  Movie.create({ country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId, owner })
    .then((movie) => {
      card.populate(['owner'])
        .then(() => res.status(CREATED).send(movie));
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        return next(new BadRequestError('Поля неверно заполнены'));
      }
      return next(e);
    });
};

module.exports = {
  getCards,
  createMovie,
};