async function fetchWeather() {
  const searchInput = document.getElementById("search").value;
  const weatherDataSection = document.getElementById("weather-data");
  const apiKey = "Enter your API Key";

  
  weatherDataSection.style.display = "block";
  document.getElementById("search").value = "";

  if (searchInput === "") {
    weatherDataSection.innerHTML = `
      <div>
        <h2>Empty Input! 🎀</h2>
       <p>City not found in Sri Lanka. Try  Again✨</p>
      </div>
    `;
    return;
  }

  
  async function getLonAndLat() {
    
    const countryCode = "LK"; 
    const geocodeURL = `https://api.openweathermap.org/geo/1.0/direct?q=${searchInput.replace(" ", "%20")},${countryCode}&limit=1&appid=${apiKey}`;

    const response = await fetch(geocodeURL);
    if (!response.ok) return null;

    const data = await response.json();
    if (data.length === 0) {
      weatherDataSection.innerHTML = `
        <div>
          <h2>City not found in Sri Lanka</h2>
          <p>Try searching for "Colombo", "Kandy", or "Galle".</p>
        </div>
      `;
      return null;
    }
    return data[0];
  }

 
  async function getWeatherData(lon, lat) {

    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const response = await fetch(weatherURL);
    const data = await response.json();

    weatherDataSection.style.display = "flex";
    weatherDataSection.innerHTML = `
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather icon" />
      <div>
        <h2>📍${data.name}, LK</h2>
        <p> 🌡️<strong>Temperature:</strong> ${Math.round(data.main.temp)}°C</p>
        <p> ✨<strong>Description:</strong> ${data.weather[0].description}</p>
      </div>
    `;
  }


  const geocodeData = await getLonAndLat();
  if (geocodeData) {
    getWeatherData(geocodeData.lon, geocodeData.lat);
  }
}