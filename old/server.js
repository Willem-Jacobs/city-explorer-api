"use strict";

const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
require("dotenv").config();
const PORT = process.env.PORT;

const getWeatherData = require("./weather");
const getMovieData = require("./movies");

app.get("/movies", getMovieData);

app.get("/weather", getWeatherData);

app.get("/*", (req, res) => {
  res.status(404).send("Page not found");
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
