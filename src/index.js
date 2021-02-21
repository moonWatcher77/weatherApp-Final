let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tueday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let currentDay = days[now.getDay()];

let currentHours = now.getHours();
if (currentHours < 10) {
  currentHours = "0" + currentHours;
}

let currentMinutes = now.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = "0" + currentMinutes;
}

let h1 = document.querySelector("h1");
h1.innerHTML = `${currentDay}, ${currentHours} : ${currentMinutes}`;

function formatHours(timestamp){
let now = new Date(timestamp);
let currentHours = now.getHours();
if (currentHours < 10) {
  currentHours = "0" + currentHours;
}
let currentMinutes = now.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = "0" + currentMinutes;
}

return`${currentHours}:${currentMinutes}`;

}

function displayForecast(response){
let forecastElement = document.querySelector("#forecast");
let forecast = response.data.list[0];
console.log(forecast);


forecastElement.innerHTML= `
  <div class="row row-cols-auto">
    <div class="col-2">
      <h5>
      ${formatHours(forecast.dt * 1000)}
      </h5>
         <img src = "http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
          id="hourIcon" 
          />
            <p class="degrees">
                       <strong>${Math.round(forecast.main.temp_max)}º</strong>
                       ${Math.round(forecast.main.temp_min)}
            </p>
    </div>
   </div>`;





}




function city(event) {
  event.preventDefault();
  let city = document.querySelector(".form-control");
  let cityName = city.value;
  let apiKey = "c2e818d4b23bd63a46cf1f9a542a8c4d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);



}




let cityForm = document.querySelector("#form-city");
cityForm.addEventListener("submit", city);



let myCity = document.querySelector("#button-current");
myCity.addEventListener("click", currentCity);

function showTemperature(response) {
  let city = document.querySelector(".form-control");
  let h2 = document.querySelector("h2");
  let iconElement = document.querySelector("#icon");
  let descriptionElement = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let currentTemp = document.querySelector("#degreesMain");
  
  city.value = " ";
  h2.innerHTML = response.data.name;

  
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = response.data.wind.speed;
  descriptionElement.innerHTML= response.data.weather[0].description;
  currentTemp.innerHTML = Math.round(response.data.main.temp) + "ºC";

  
}



function currentPosition(position){
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "c2e818d4b23bd63a46cf1f9a542a8c4d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(showTemperature);
}

function currentCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}

