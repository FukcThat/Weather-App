const searchInput = document.querySelector("#search-input");
const searchForm = document.querySelector("#search-form");
const countryName = document.querySelector("#country-name");
const cityName = document.querySelector("#city-name");
const currentTemp = document.querySelector("#current-temp");
const currentIcon = document.querySelector("#current-icon");
const currentCondition = document.querySelector("#current-condition");
const feelslikeTemp = document.querySelector("#feelslike-temp");

// Write function that hits Weather API

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
  let addressData = data.resolvedAddress.split(",");
  SetCountryName(addressData);
  SetCityName(addressData);
  SetCurrentTemp(data);
  SetCurrentIcon(data);
  SetCurrentCondition(data);
  SetFeelLikeTemp(data);

  console.log(data);
};

FetchWeatherData("Washington");

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (searchInput.value === "") window.alert("Please input a city name");
  FetchWeatherData(searchInput.value);
  searchInput.value = "";
});

// Current Weather

// Current Temp
const SetCurrentTemp = (data) => {
  currentTemp.textContent = data.currentConditions.temp + "°";
};

// Current Icon
const SetCurrentIcon = (data) => {
  currentIcon.classList.add(data.currentConditions.icon);
};

console.log(currentIcon.classList);

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
// Wind Speed
// Humidity
// Sunset Time
