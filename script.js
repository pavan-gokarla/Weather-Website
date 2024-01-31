const apiKey = "9296363117b5ce52c8e71568753ce8cc";
const place = document.querySelector(".place");
const date = document.querySelector(".date");
const displayCondition = document.querySelector(".display-condition");
const temperatureVariable = document.querySelector(".temperature-variable");
const windSpeed = document.querySelector(".wind-speed");
const humidity = document.querySelector(".humidity");
const visibility = document.querySelector(".visibility");
const onbtn = document.querySelector(".btn");
const search = document.querySelector(".search");
const descriptionIcon = document.querySelector(".description-icon");
const alternateContent = document.querySelector(".alternate-content");
const showerroricon = document.querySelector(".alternate-content i");
const showerrortext = document.querySelector(".alternate-content p");
getWeather("delhi");
search.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    if (search.value.length === 0) getWeather("delhi");
    else getWeather(search.value);
    search.value = "";
  }
});
onbtn.addEventListener("click", () => {
  const city = search.value;

  if (search.value.length === 0) city = "delhi";
  getWeather(city);
  search.value = "";
});
async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );

    // if (!response.ok) throw new Error("Unable to fetch");
    const data = await response.json();
    place.innerHTML = city.charAt(0).toUpperCase() + city.slice(1);
    handleUI(data);
  } catch (e) {
    console.log(e);
  }
}
function handleUI(data) {
  temperatureVariable.innerHTML = `${Math.round(data.main.temp)}`;
  windSpeed.innerHTML = `${data.wind.speed} km/h`;
  visibility.innerHTML = `${data.visibility / 1000}Km`;
  humidity.innerHTML = `${data.main.humidity}%`;
  const curr_data = new Date();
  date.textContent = curr_data.toDateString();
  getWeatherIconName(data.weather.description);
  displayCondition.innerHTML = data.weather[0].main;
  descriptionIcon.innerHTML = getWeatherIconName(data.weather[0].main);
}

function getWeatherIconName(weatherCondition) {
  const iconMap = {
    Clear: "sunny",
    Clouds: "wb_cloudy",
    Rain: "umbrella",
    Thunderstorm: "flash_on",
    Drizzle: "grain",
    Snow: "ac_unit",
    Mist: "cloud",
    Smoke: "cloud",
    Haze: "cloud",
    Fog: "cloud",
  };

  return iconMap[weatherCondition] || "help";
}
