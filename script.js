// Search Bar
const searchInput = document.querySelector(".search-input");
const searchForm = document.querySelector(".search-form");

// Current Weather Tab
const countryName = document.querySelector(".country-name");
const cityName = document.querySelector(".city-name");
const currentTemp = document.querySelector(".current-temp");
const currentIcon = document.querySelector(".current-icon");
const currentCondition = document.querySelector(".current-condition");
const feelslikeTemp = document.querySelector(".feelslike-temp");

// Today Details Tab
const sunriseTime = document.querySelector(".sunrise-time");
const windSpeed = document.querySelector(".windspeed");
const humidity = document.querySelector(".humidity");
const sunsetTime = document.querySelector(".sunset-time");
const hourlyWeatherContainer = document.querySelector(".hourly-weather");

// radio button
// event listener on each input calls fetchWeatherData with correct metricInput
// global lastCity var to keep in mind city for other updates

const FetchWeatherData = async (cityInput) => {
  const WEATHER_URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityInput}?unitGroup=metric&include=days%2Chours%2Ccurrent&key=9P7VWTLJFMKTKESF7QDVFUEH2&contentType=json`;

  try {
    const response = await fetch(WEATHER_URL);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    UpdateInfo(json);
  } catch (error) {
    console.error(error.message);
  }
};

const UpdateInfo = (data) => {
  // Current Tab
  let addressData = data.resolvedAddress.split(",");
  SetCountryName(addressData);
  SetCityName(addressData);
  SetCurrentTemp(data);
  SetCurrentIcon(data);
  SetCurrentCondition(data);
  SetFeelLikeTemp(data);

  // Today Details Tab
  let sunriseData = data.currentConditions.sunrise.split(":");
  let sunsetData = data.currentConditions.sunset.split(":");
  SetSunriseTime(sunriseData);
  SetSunsetTime(sunsetData);
  SetWindspeed(data);
  SetHumidity(data);

  // Today Details Hourly
  SetHourlyWeather(data);

  console.log(data);
};

FetchWeatherData("Washington");

// Event Listener - SearchBar
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (searchInput.value === "") window.alert("Please input a city name");
  FetchWeatherData(searchInput.value);
  searchInput.value = "";
});

// CURRENT WEATHER TAB
// Current Temp
const SetCurrentTemp = (data) => {
  currentTemp.textContent = data.currentConditions.temp + "°";
};

// Current Icon
const SetCurrentIcon = (data) => {
  currentIcon.classList.add(data.currentConditions.icon);
};

// Condition Description
const SetCurrentCondition = (data) => {
  currentCondition.textContent = data.currentConditions.conditions;
};

// Feels like Temp
const SetFeelLikeTemp = (data) => {
  feelslikeTemp.textContent =
    "Feels like " + data.currentConditions.feelslike + "°";
};

// Country
const SetCountryName = (addressData) => {
  let countryNameData = addressData[addressData.length - 1];
  countryName.textContent = countryNameData;
};

// City
const SetCityName = (addressData) => {
  let cityNameData = addressData[0];
  cityName.textContent = cityNameData;
};

// Today Weather Details

// Sunrise Time
const SetSunriseTime = (sunriseData) => {
  let sunriseTimeData = sunriseData[0] + ":" + sunriseData[1];
  sunriseTime.textContent = sunriseTimeData;
};

// Sunset Time
const SetSunsetTime = (sunsetData) => {
  let sunsetTimeData = sunsetData[0] + ":" + sunsetData[1];
  sunsetTime.textContent = sunsetTimeData;
};

// Wind Speed
const SetWindspeed = (data) => {
  windSpeed.textContent = data.currentConditions.windspeed + "kph";
};

// Humidity
const SetHumidity = (data) => {
  humidity.textContent = data.currentConditions.humidity + "%";
};

// Hourly Weather
const SetHourlyWeather = (data) => {
  let hoursData = data.days[0].hours;

  hoursData.forEach((item) => {
    // Show ever nth item
    // if (index % 1 !== 0) return;

    // Make Div
    const hourInfoDiv = document.createElement("div");

    // Make Tags for Info Bits (Hour, Temp, Icon)
    const hourTextElement = document.createElement("p");
    const tempTextElement = document.createElement("p");
    const iconTextElement = document.createElement("p");

    // Set info
    let hourTimeData = item.datetime.split(":");

    hourTextElement.textContent = hourTimeData[0] + ":" + hourTimeData[1];
    tempTextElement.textContent = item.temp + "°";
    iconTextElement.classList.add("today-details-hourly-icon", item.icon);

    hourInfoDiv.appendChild(hourTextElement);
    hourInfoDiv.appendChild(tempTextElement);
    hourInfoDiv.appendChild(iconTextElement);
    hourlyWeatherContainer.appendChild(hourInfoDiv);
  });
};
