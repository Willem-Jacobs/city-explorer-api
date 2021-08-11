"use strict";

const axios = require("axios");

let cache = require("./cache.js");

module.exports = movieHandler;

function getMovie(search) {
  const key = "movie-" + search;
  const url = `https://api.themoviedb.org/3/search/movie?&api_key=${process.env.MOVIE_API_KEY}&query=${search}`;

  if (cache[key] && Date.now() - cache[key].timestamp < 10000) {
    console.log("Cache hit-movies");
  } else {
    console.log("Cache miss-movies");
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios
      .get(url)
      .then((response) => parseMovie(response.data.results));
  }
  console.log(cache[key].data);
  return cache[key].data;
}

function movieHandler(request, response) {
  const { search } = request.query;
  getMovie(search)
    .then((summaries) => response.send(summaries))
    .catch((error) => {
      console.error(error);
      response.status(200).send("Sorry. Something went wrong!");
    });
}

function parseMovie(movieData) {
  try {
    const movieSummaries = movieData.map((day) => {
      return new Movie(day);
    });
    return Promise.resolve(movieSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

class Movie {
  constructor(movie) {
    this.title = movie.original_title;
    this.overview = movie.overview;
    this.average_votes = movie.vote_average;
    this.total_votes = movie.vote_count;
    this.image_url = movie.poster_path
      ? `http://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "";
    this.popularity = movie.popularity;
    this.released_on = movie.release_date;
  }
}
