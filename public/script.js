async function fetchWeatherData() {
    try {
        const response = await fetch('https://localhost:5001/api/weather');
        const data = await response.text(); // or use response.json() if returning JSON
        document.getElementById('weatherData').innerText = data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Fetch weather data when the page loads
window.onload = fetchWeatherData;