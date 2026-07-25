const express = require("express");
const axios = require("axios");
const app = express();

// set view engine to ejs
app.set("view engine", "ejs");

//serve the pubblic folder as static files
app.use(express.static("public"));

// Render the index template with default values for weather and error
app.get("/", (req, res) => {
    res.render("index", { weather: null, error: null });
});

//handle the weather route
app.get("/weather", async (req, res) => {
    const city = req.query.city;
    const apikey = "ebf96a1c5fb41e59dd38c3cde72dffe3";
    const APIurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    let weather;
    let error = null;
    try {
        const response = await axios.get(APIurl);
        weather = response.data;

    } catch (error) {
        weather = null;
        error = "ERROR , Please Try Again";
    }
    // Render the index template with the weather data and error message
    res.render("index", { weather, error });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});