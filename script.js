// Write function that hits Weather API

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

FetchWeatherData("Frankfurt");

const UpdateInfo = (data) => {
  console.log(data);
};
