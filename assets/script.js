$("#search").on('click', function () {
  event.preventDefault();
  var cityInput = $('#city-input').val().trim().toLowerCase();
  console.log(cityInput)
var apiKey = "00604984263164d160d696afed305b97";
// Here we are building the URL we need to query the database
var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&units=imperial&appid=" + apiKey;
var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&cnt=5&units=imperial&appid=" + apiKey;
// Here we run our AJAX call to the OpenWeatherMap API
$.ajax({
    url: weatherUrl,
    method: "GET"
}).then(function (response) {
    // We store all of the retrieved data inside of an object called "response"
        // Log the queryURL
        console.log(weatherUrl);
        // Log the resulting object
        console.log(response);
        // Transfer content to HTML
        $(".city").html("<h1>" + response.name + " Weather Details</h1>");
        $(".wind").text("Wind Speed: " + response.wind.speed);
        $(".humidity").text("Humidity: " + response.main.humidity);
        $(".temp").text("Temperature (F) " + response.main.temp);
        // Log the data in the console as well
        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidity: " + response.main.humidity);
        console.log("Temperature (F): " + response.main.temp);
    });
  $.ajax({
    url: forecastUrl,
    method: "GET"
  }).then(function (response) {
    console.log("forecast URL: " + forecastUrl);
    console.log("response 2: " + response);
    console.log("temperature: " + response.list[0].main.temp);
  });
});

