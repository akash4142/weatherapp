const express = require('express');
let fetch;
(async () => {
    const { default: fetchDefault } = await import('node-fetch');
    fetch = fetchDefault;
  })();
  const app = express();
const port = 8080;

const weatherApiKey = '43e49f39994106ff92ee9f10243110c2'

app.use(express.static('public'));

app.get('/weather', async (req, res) => {
    const location = req.query.location;

    if (!location) {
        return res.status(400).json({ error: 'Location not provided.' });
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&units=metric&appid=${weatherApiKey}`);
        const data = await response.json();
        console.log(data)

        if (data.cod === '404') {
            return res.status(404).json({ error: 'Location not found.' });
        }

        const weatherData = {
            location: data.name,
            temperature: data.main.temp,
            humidity: data.main.humidity,
            condition: data.weather[0].description,
            windSpeed: data.wind.speed
        };

        return res.json(weatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return res.status(500).json({ error: 'An error occurred while fetching weather data.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
