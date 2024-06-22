require('dotenv').config();  // Add this line at the top of the file

const express = require("express");
const axios = require("axios");
const path = require("path");
const hbs = require("hbs");
const cors = require('cors');


const app = express();
app.use(cors());
const port = process.env.PORT || 8000;

// Public static path
const static_path = path.join(__dirname, "../public");
const templete_path = path.join(__dirname, "../templetes/views");
const partials_path = path.join(__dirname, "../templetes/partials");

app.set('view engine', 'hbs');
app.set('views', templete_path);
hbs.registerPartials(partials_path);

app.use(express.static(static_path));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/weather", (req, res) => {
  res.render("weather");
});



app.get("/weather-data-secure", async (req, res) => {
  const city = req.query.city;
  const apiKey = process.env.WEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    console.error('Error details:', error.response ? error.response.data : 'No response data');
    res.status(500).json({ error: 'Failed to fetch weather data', details: error.message });
  }
});


app.get("*", (req, res) => {
  res.render("404error");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
