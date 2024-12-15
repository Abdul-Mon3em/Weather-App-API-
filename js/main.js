// Define the API key and base URL for the weather API
const APIKey = "47625da06d634d50a34131956240412";
const baseURL = "https://api.weatherapi.com/v1/forecast.json";

// Select necessary DOM elements
const findInput = document.querySelector("#findInput");
const btnFind = document.querySelector("#btnFind");
const forecastContainer = document.querySelector("#forecast");

// Function to fetch weather data for a given city
async function fetchWeather(city) {
  try {
    // Make the API call to fetch weather data for the city
    const response = await fetch(`${baseURL}?key=${APIKey}&q=${city}&days=3`);
    if (response.ok) {
      return await response.json();
    } else {
      console.error("Failed to fetch weather data.");
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

// Log the constructed API URL for testing purposes
console.log(`${baseURL}?key=${APIKey}&q=cairo&days=3`);

// Function to display the weather data on the webpage
async function displayWeather() {
  const city = findInput.value.trim();

  const data = await fetchWeather(city);

  // If data is valid, proceed to display it
  if (data) {
    const { location, forecast: forecastData } = data;
    forecastContainer.innerHTML = "";

    forecastData.forecastday.forEach((day) => {
      const dayName = new Date(day.date).toLocaleDateString("en-US", {
        weekday: "short",
      });

      // Full URL for the weather icon
      const weatherIconURL = `https:${day.day.condition.icon}`;

      const card = `
        <div class="col-lg-4 mb-4">
          <div class="card h-100 rounded-3">
            <div class="card-header text-center text-white">
              <h5>${dayName}</h5>
              <p>${new Date(day.date).toLocaleDateString()}</p>
            </div>
            <div class="card-body text-white text-center">
              <h6 class="location text-white mb-4">${location.name}, ${
        location.country
      }</h6>
              <p class="temperature text-white mb-4">${day.day.maxtemp_c}°C / ${
        day.day.mintemp_c
      }°C</p>
              <img src="${weatherIconURL}" alt="Weather Icon" /> <!-- Fixed the icon URL -->
              <p class="condition text-white mb-4">${day.day.condition.text}</p>
              <div class="humidity mb-4">
                <img src="images/humidity.png" alt="" width="32px" height="21px" />
                <span>Humidity: ${day.day.avghumidity}%</span>
              </div>
              <div class="wind mb-4">
                <img src="https://routeweather.netlify.app/images/icon-wind.png" alt="">
                <span>Wind: ${day.day.maxwind_kph} km/h</span>
              </div>
            </div>
          </div>
        </div>
      `;
      forecastContainer.innerHTML += card;
    });
  }
}

// Event listener to trigger the weather display when the button is clicked
btnFind.addEventListener("click", displayWeather);

// Event listener to update the weather forecast while typing in the input field
findInput.addEventListener("input", function () {
  const city = findInput.value.trim();
  if (city) {
    displayWeather(city);
  }
});

// Set the default city to "Kafr Az Zayyat" on page load and display its weather
window.addEventListener("load", () => {
  findInput.value = "Kafr Az Zayyat";
  displayWeather();
});

// Add event listener for "Enter" key press
findInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    displayWeather();
  }
});
