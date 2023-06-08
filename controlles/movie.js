const Movie = require('../models/movie');

const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

const {
  OK,
  CREATED,
} = require('../respons/responsStatus');

const getMovies = (req, res, next) => {
  const { _id: owner } = req.user;

  Movie.find({ owner })
    .populate(['owner'])
    .sort({ createdAt: -1 })
    .then((movies) => {
      res.status(OK).send(movies);
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => {
      res.status(CREATED).send(movie);
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        return next(new BadRequestError('Поля неверно заполнены'));
      }
      return next(e);
    });
};

const deleteMovie = (req, res, next) => {
  const { moviedId } = req.params;
  Movie.findById(moviedId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Невалидный id фильма');
      } else if (movie.owner.equals(req.user._id)) {
        movie.remove(moviedId)
          .then(() => {
            res.status(200).send({ message: 'Фильм удален' });
          })
          .catch((err) => {
            next(err);
          });
      } else {
        throw new ForbiddenError('Можно удалять только свои фильмы');
      }
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
