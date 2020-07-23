let now = new Date();
let h6 = document.querySelector("h6");

let days = [
  "Sunday",
  "Monday",
  "Tueday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let date = now.getDate();
let hour = now.getHours();
let minute = now.getMinutes();
let year = now.getFullYear();

h6.innerHTML = `${day}, ${month} ${date}, ${year} ${hour}:${minute}`;

function showCityTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#current-temperature");
  tempElement.innerHTML = `${temperature}`;
  let city = document.querySelector("#find-city").value;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${city}`;
}

function getNewCity(event) {
  event.preventDefault();
  let apiKey = "80f827f1223261e54bfb7371ee94cdd0";
  let city = document.querySelector("#find-city").value;
  let unit = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showCityTemp);
}

let searchNewCity = document.querySelector("#search-form");
searchNewCity.addEventListener("submit", getNewCity);

function showCurrentLocation(response) {
  event.preventDefault();
  let newTemp = Math.round(response.data.main.temp);
  let location = response.data.name;
  let currentTemp = document.querySelector("#current-temperature");
  currentTemp.innerHTML = `${newTemp}`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${location}`;
}

function findLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "imperial";
  let apiKey = "80f827f1223261e54bfb7371ee94cdd0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showCurrentLocation);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(findLocation);

  function showCelciusTemp(event) {
    event.preventDefault();
    let fahrenheitTemperature = document.querySelector("#current-temperature");
    let celciusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
    celciusTemperature.innerHTML = `${fahrenheitTemperature}`;
  }

  let currentLocation = document.querySelector("#current-location");
  currentLocation.addEventListener("click", getCurrentLocation);

  let celciusLink = document.querySelector("#celcius-link");
  celciusLink.addEventListener("click", showCelciusTemp);
}
