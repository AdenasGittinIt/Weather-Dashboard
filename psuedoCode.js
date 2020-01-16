// Use the OpenWeather API to retrieve weather data for cities. The documentation includes a section called "How to start" that will provide basic setup and usage instructions.


// DONE Use AJAX to hook into the API to retrieve data in JSON format.


// Your app will run in the browser and feature dynamically updated HTML and CSS powered by jQuery.


// Display the following under current weather conditions:


// DONE City


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

  $("#search").on("click", function() {
    event.preventDefault();
    var cityInput = $("#city-input")
      .val()
      .trim()
      .toLowerCase();
  
    const apiKey = "00604984263164d160d696afed305b97";
    // Here we are building the URL we need to query the database
  
    let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=imperial&appid=${apiKey}`;
    let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput},&units=imperial&appid=${apiKey}`;  
    
  
  
  
    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
      url: weatherUrl,
      method: "GET"
    }).then(function(res) {
      // Transfer content to HTML
      localStorage.setItem("lat", res.coord.lat);
      localStorage.setItem("lon", res.coord.lon);
      $(".city").html("<h1>" + res.name + " Weather Details</h1>");
      $(".wind").text("Wind Speed: " + res.wind.speed);
      $(".humidity").text("Humidity: " + res.main.humidity);
      $(".temp").text("Temperature (F) " + res.main.temp);
      // Log the data in the console as well
      });
      
    $.ajax({
      url: forecastUrl,
      method: "GET"
    }).then(function(res) {
      console.log("forecast URL: " + forecastUrl);
      console.log(res);
      console.log("temperature: " + res.list[0].main.temp);
    });
  });
  

  var API = {
    saveExample: function(example) {
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/examples",
        data: JSON.stringify(example)
      });
    },
    getExamples: function() {
      return $.ajax({
        url: "api/examples",
        type: "GET"
      });
    },
    deleteExample: function(id) {
      return $.ajax({
        url: "api/examples/" + id,
        type: "DELETE"
      });
    }
  };

      // $.ajax({
    //   url: GetUvIndexUrl(),
    //   method: "GET"
    // }).then()

  // create a function that will fire off the third ajax call within the .then of the second