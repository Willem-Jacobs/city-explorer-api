"use strict";

const axios = require("axios");

let cache = require("./cache.js");

module.exports = weatherHandler;

function getWeather(latitude, longitude) {
  const key = "weather-" + latitude + longitude;
  const url = `http://api.weatherbit.io/v2.0/forecast/daily/?key=${process.env.WEATHER_API_KEY}&lang=en&lat=${latitude}&lon=${longitude}&days=5`;

  if (cache[key] && Date.now() - cache[key].timestamp < 10000) {
    console.log("Cache hit-weather");
  } else {
    console.log("Cache miss-weather");
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios
      .get(url)
      .then((response) => parseWeather([response.data, cache[key].timestamp]));
  }
  return cache[key].data;
}

function weatherHandler(request, response) {
  const { lat, lon } = request.query;
  getWeather(lat, lon)
    .then((summaries) => response.send(summaries))
    .catch((error) => {
      console.error(error);
      response.status(500).send("Sorry. Something went wrong!");
    });
}

function parseWeather(weatherData) {
  try {
    const weatherSummaries = weatherData[0].data.map((day) => {
      return new Weather(day, weatherData[1]);
    });
    return Promise.resolve(weatherSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

class Weather {
  constructor(day, stamp) {
    this.description = `Low of ${day.low_temp}, high of ${day.max_temp} with ${day.weather.description}`;
    this.date = day.datetime;
    this.icon = day.weather.icon;
    this.timestamp = stamp;
  }
}
