const fetchBtn = document.getElementById('fetch-btn');
const weatherList = document.getElementById('weather-list');
const loading = document.getElementById('loading');

const API_KEY = '831dabb6-9dc2-11f0-b07a-0242ac130006-831dac1a-9dc2-11f0-b07a-0242ac130006';
const BASE_URL = 'https://api.stormglass.io/v2/weather/point';

async function fetchWeather(lat, lon) {
    loading.style.display = 'block';
    weatherList.innerHTML = '';

    try {
        const response = await fetch(`${BASE_URL}?lat=${lat}&lng=${lon}&params=airTemperature,humidity,windSpeed,cloudCover`, {
            headers: {
                'Authorization': API_KEY
            }
        });

        if (!response.ok) throw new Error('Failed to fetch weather data');

        const data = await response.json();
        const current = data.hours[0];

        displayWeather(current);
    } catch (error) {
        weatherList.innerHTML = `<li style="color:red;">${error.message}</li>`;
    } finally {
        loading.style.display = 'none';
    }
}

function displayWeather(current) {
    const weatherItems = [
        { name: 'Temperature', value: current.airTemperature.noaa + ' °C' },
        { name: 'Humidity', value: current.humidity.noaa + ' %' },
        { name: 'Wind Speed', value: current.windSpeed.noaa + ' m/s' },
        { name: 'Cloud Cover', value: current.cloudCover.noaa + ' %' }
    ];

    weatherItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name}: ${item.value}`;
        weatherList.appendChild(li);
    });
}

// Automatically get user's location
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                fetchWeather(lat, lon);
            },
            (error) => {
                alert('Unable to retrieve your location. Please enter manually.');
            }
        );
    } else {
        alert('Geolocation is not supported by your browser.');
    }
}

// On page load, automatically fetch weather
window.addEventListener('load', getUserLocation);

// Optional: you can still keep the button for manual refresh
fetchBtn.addEventListener('click', getUserLocation);
