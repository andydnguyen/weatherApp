// Select elements
const iconElement = document.querySelector('.weather-icon');
const notificationElement = document.querySelector('.notification');
const tempElement = document.querySelector('.temperature-value p');
const descElement = document.querySelector('.temperature-description p');
const locationElement = document.querySelector('.location p');

// App data
const weather = {};

weather.temperature = {
  unit: 'celsius'
};

// APP CONSTS and VARS
const KELVIN = 273;
// API KEY
const key = 'af3a282e589f58d06bbf4033a21702f4';

// Check if browser supports geolocation
if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  notificationElement.getElementsByClassName.display = 'block';
  notificationElement.innerHTML = "<p>Browser doesn't support geolocation!</p>";
}

// Set user's position
function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  getWeather(latitude, longitude);
}

// Show error when there is an issue with geolocation service
function showError(error) {
  notificationElement.getElementsByClassName.display = 'block';
  notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

// Get weather from API
function getWeather(latitude, longitude) {
  let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${key}`;

  fetch(api)
    .then(function(response) {
      let data = response.json();
      return data;
    })
    .then(function(data) {
      weather.temperature.value = Math.floor(data.main.temp - KELVIN);
      weather.description = data.weather[0].description;
      weather.iconId = data.weather[0].icon;
      weather.city = data.name;
      weather.country = data.sys.country;
    })
    .then(function() {
      displayWeather();
    });
}

// Display weather to UI
function displayWeather() {
  iconElement.innerHTML = `<img src='icons/${weather.iconId}.png'/>`;
  tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
  descElement.innerHTML = weather.description;
  locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

// C to F conversion
function celsiusToFahrenheit(temperature) {
  return temperature * (9 / 5) + 32;
}

// When the user clicks on the temperature element
tempElement.addEventListener('click', function() {
  if (weather.temperature.value === undefined) return;

  if (weather.temperature.unit == 'celsius') {
    let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
    fahrenheit = Math.floor(fahrenheit);
    tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
    weather.temperature.unit = 'fahrenheit';
  } else {
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    weather.temperature.unit = 'celsius';
  }
});
