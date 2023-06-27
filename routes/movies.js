const express = require('express');

const movieRouter = express.Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controlles/movie');

movieRouter.get('/movies', getMovies);
movieRouter.post('/movies', createMovie);
movieRouter.delete('/movies/:moviedId', deleteMovie);
module.exports = movieRouter;
