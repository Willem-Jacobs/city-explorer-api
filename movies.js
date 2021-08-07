"use strict";

const axios = require("axios");

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

async function getMovieData(req, res) {
  const search = req.query.search;
  const resultArray = [];
  if (search) {
    try {
      let results = await axios.get(
        `https://api.themoviedb.org/3/search/movie?&api_key=${process.env.MOVIE_API_KEY}&query=${search}`
      );
      const result = results.data.results;
      if (result) {
        result.map((info) => {
          resultArray.push(new Movie(info));
        });
        res.send(resultArray);
      } else {
        res.status(500).send("Something went wrong with searching for movies");
      }
    } catch (error) {
      res.status(500).send(`An error happen: ${error.message}`);
    }
  } else {
    res.status(500).send("Someting went wrong with the location value");
  }
}

module.exports = getMovieData;
