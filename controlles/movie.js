const Movie = require('../models/user');

const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

const getMovies = (req, res, next) => {
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

const deleteMovie = (req, res, next) => {
  const { moviedId } = req.params;
  Movie.findById(moviedId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Невалидный id карточки');
      } else if (movie.owner.equals(req.user._id)) {
        Movie.findByIdAndRemove(moviedId)
          .then(() => {
            res.status(200).send({ message: 'Карточка удалена' });
          })
          .catch((err) => {
            next(err);
          });
      } else {
        throw new ForbiddenError('Можно удалять только свои карточки');
      }
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};