const express = require("express");
require("dotenv").config();
const cors = require("cors");
const data = require("./data/weather.json");
const app = express();
const port = process.env.PORT;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/weather", (req, res) => {
  res.send("Weather Data");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
