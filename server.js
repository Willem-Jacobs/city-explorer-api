"use strict";

const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
require("dotenv").config();
const PORT = process.env.PORT;

const weatherHandler = require("./modules/weather.js");
const movieHandler = require("./modules/movie.js");
// const city = require('./modules/city.js');

app.get("/weather", weatherHandler);

app.get("/movies", movieHandler);

// app.get('/city', cityHandler);

app.get("/*", (req, res) => {
  res.status(404).send("Page not found");
});

app.listen(PORT, () => console.log(`Server up on ${PORT}`));
