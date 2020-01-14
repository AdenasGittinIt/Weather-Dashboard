// Use the OpenWeather API to retrieve weather data for cities. The documentation includes a section called "How to start" that will provide basic setup and usage instructions.


// DONE Use AJAX to hook into the API to retrieve data in JSON format.


// Your app will run in the browser and feature dynamically updated HTML and CSS powered by jQuery.


// Display the following under current weather conditions:


// City


// Date


// Icon image (visual representation of weather conditions)


// Temperature


// Humidity


// Wind speed


// UV index




// Include a search history so that users can access their past search terms. Clicking on the city name should perform a new search that returns current and future conditions for that city.


// Include a 5-Day Forecast below the current weather conditions. Each day for the 5-Day Forecast should display the following:


// Date


// Icon image (visual representation of weather conditions)


// Temperature


// Humidity

let lat = response.coord.lat;
let lon = response.coord.lon;
let uvIndexUrl = `api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appi=${apiKey}`
  $.ajax({
    url: localStorage.getItem(uvIndexUrl),
    method: "GET"
  }).then(function(response) {
    console.log(response);
  });