function getWeather() {
    const locationInput = document.getElementById('location');
    const location = locationInput.value;

    if (!location) {
        alert('Please enter a location.');
        return;
    }

    fetch(`/weather?location=${encodeURIComponent(location)}`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => console.error('Error fetching weather data:', error));
}

function displayWeather(data) {
    const weatherInfoDiv = document.getElementById('weather-info');
    weatherInfoDiv.innerHTML = `
        <h2>Weather in ${data.location}</h2>
        <p>Temperature: ${data.temperature}°C</p>
        <p>Humidity: ${data.humidity}%</p>
        <p>Weather Condition: ${data.condition}</p>
        <p>Wind Speed: ${data.windSpeed} m/s</p>
    `;
}
