"use strict";

const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
app.use(cors());
require("dotenv").config();
const PORT = process.env.PORT;

class Forecast {
  constructor(info) {
    this.description = `Low of ${info.low_temp}, high of ${info.max_temp} with ${info.weather.description}`;
    this.date = info.datetime;
    this.icon = info.weather.icon;
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

app.get("/movies", getMovieData);

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

app.get("/weather", getWeatherData);

async function getWeatherData(req, res) {
  const cityLat = req.query.lat;
  const cityLon = req.query.lon;
  const weatherArray = [];
  if (cityLat || cityLon) {
    try {
      let results = await axios.get(
        `https://api.weatherbit.io/v2.0/forecast/daily?lat=${cityLat}&lon=${cityLon}&units=I&days=5&key=${process.env.WEATHER_API_KEY}`
      );
      const result = results.data.data;
      if (result) {
        result.map((info) => {
          weatherArray.push(new Forecast(info));
        });
        res.send(weatherArray);
      } else {
        res.status(500).send("Something went wrong. No weather data available");
      }
    } catch (error) {
      res.status(500).send(`An error happen: ${error.message}`);
    }
  } else {
    res.status(500).send("Someting went wrong with the location value");
  }
}

app.get("/*", (req, res) => {
  res.status(404).send("Page not found");
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
