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
    res.status(500).send("Someting went wrong. Invalid city");
  }
}

app.get("/*", (req, res) => {
  res.status(404).send("Page not found");
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
