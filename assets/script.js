$("#search").on("click", function() {
  event.preventDefault();
  var cityInput = $("#city-input")
    .val()
    .trim()
    .toLowerCase();

  const apiKey = "00604984263164d160d696afed305b97";
  const apiKey2 = "c42e5117a374851a94e1da6171ce8e3b";
  // Here we are building the URL we need to query the database
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=imperial&appid=${apiKey}`;
  
  let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput},&units=imperial&appid=${apiKey}`;  
  
  
  let getUvIndexUrl = () => {
    let lat = localStorage.getItem("lat")
    let lon = localStorage.getItem("lon")
    let uvIndexUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appi=${apiKey}`;
    return uvIndexUrl;
  }



  // Here we run our AJAX call to the OpenWeatherMap API
  $.ajax({
    url: weatherUrl,
    method: "GET"
  }).then(function(res) {
    // set lat and lon in local storage to use in the UV Index API call
    localStorage.setItem("lat", res.coord.lat);
    localStorage.setItem("lon", res.coord.lon);

    console.log(res);
    console.log(weatherUrl);
    // console.log("lattitude: " + res.coord.lat);
    // console.log("longitude: " + res.coord.lon);
    console.log("Wind Speed: " + res.wind.speed);
    console.log("Humidity: " + res.main.humidity);
    console.log("Temperature (F): " + res.main.temp);

    // Populate HTML with current conditions
    $(".city").html(`<h4> Weather Details for ${res.name}</h4>`);
    $(".icon").html(`
    <figure>
    <img src="http://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png" alt="weather icon">
    <figcaption>${res.weather[0].description}</figcaption>
    </figure>`);
    $(".wind").html(`<h5> Wind Speed: ${res.wind.speed}</h5>`);
    $(".humidity").html(`<h5> Humidity: ${res.main.humidity}%</h5>`);
    $(".temp").html(`<h5> Temperature (F): ${res.main.temp}</h5>`);
    });
  
  $.ajax({
    url: forecastUrl,
    method: "GET"
  }).then(function(res) {
    console.log("forecast URL: " + forecastUrl);
    console.log(res);
    console.log("temperature: " + res.list[0].main.temp);

    // $(".city").html(`<h4> Weather Details for ${res.name}</h4>`);
    // $(".icon").html(`
    // <figure>
    // <img src="http://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png" alt="weather icon">
    // <figcaption>${res.weather[0].description}</figcaption>
    // </figure>`);
    // $(".wind").html(`<h5> Wind Speed: ${res.wind.speed}</h5>`);
    // $(".humidity").html(`<h5> Humidity: ${res.main.humidity}%</h5>`);
    // $(".temp").html(`<h5> Temperature (F): ${res.main.temp}</h5>`);

        // need a function here that will fire off the third and final API call for the UV Index
  });

  $.ajax({
    url: getUvIndexUrl(),
    method: "GET"
  }).then(function(res) {
    console.log("this is the UV Index URL: " + uvIndexUrl);
    console.log("this is the UV Index: " + res.value);
  });
});



