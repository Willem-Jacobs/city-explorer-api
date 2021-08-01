"use strict";

const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
require("dotenv").config();
const PORT = process.env.PORT;

const weatherData = require("./data/weather.json");

class Forecast {
  constructor(description, date) {
    this.description = description;
    this.date = date;
  }
}

app.get("/weather", (req, res) => {
  const cityName = req.query.city;
  if (cityName) {
    const weatherArray = [];
    const cityWeather = weatherData.find(
      (city) => city.city_name.toLowerCase() === cityName.toLowerCase()
    );
    if (cityWeather) {
      cityWeather.data.map((info) => {
        weatherArray.push(
          new Forecast(
            `Low of ${info.low_temp}, high of ${info.max_temp} with ${info.weather.description}`,
            info.datetime
          )
        );
      });
      res.send(weatherArray);
    } else {
      res.status(500).send("Something went wrong. No weather data available");
    }
  } else {
    if (!cityName) {
      res.status(500).send("Someting went wrong. Invalid city");
    }
  }
});

app.get("/*", (req, res) => {
  res.status(404).send("Page not found");
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
