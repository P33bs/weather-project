//Homework Week 4 - Feature 1
let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let currentDay = document.querySelector("#currentday");
currentDay.innerHTML = `${day}`;

let hour = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let time = `${hour}:${minutes}`;

let currentTime = document.querySelector(".time");
currentTime.innerHTML = `${time}`;

function showWeather(response) {
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector(".current-condition").innerHTML =
    response.data.weather[0].main;
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text");
  let h1 = document.querySelector(".card-title");
  if (searchInput.value) {
    h1.innerHTML = `${searchInput.value}`;
  } else {
    h1.innerHTML = null;
    alert("Please enter a city");
  }

  let currentLocation = searchInput.value;
  let apiKey = "5b927689c93c4cd55544a76cdf201c07";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentLocation}&units=metric&appid=${apiKey}`;

  axios.get(`${apiUrl}`).then(showWeather);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function searchLocation(position) {
  let apiKey = "5b927689c93c4cd55544a76cdf201c07";
  let locationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
  axios.get(locationUrl).then(showWeather);
}

function getCurrentLocation(event) {
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", getCurrentLocation);
