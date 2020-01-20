$("#search").on("click", function() {
  event.preventDefault();
  var cityInput = $("#city-input")
    .val()
    .trim()
    .toLowerCase();

  const apiKey = "00604984263164d160d696afed305b97";

  // Building the URLs needed for the ajax request
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=imperial&appid=${apiKey}`;

  let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput},&units=imperial&appid=${apiKey}`;

  // ajax call for current weather conditions
  $.ajax({
    url: weatherUrl,
    method: "GET"
  }).then(function(res) {
    // set lat and lon in local storage to use in the UV i URL and API call
    localStorage.setItem("lat", res.coord.lat);
    localStorage.setItem("lon", res.coord.lon);

    console.log(res);
    console.log(weatherUrl);
    console.log("lattitude: " + res.coord.lat);
    console.log("longitude: " + res.coord.lon);
    console.log("Wind Speed: " + res.wind.speed);
    console.log("Humidity: " + res.main.humidity);
    console.log("Temperature (F): " + res.main.temp);

    // Populate HTML with current conditions

    $("#current-info").html(
      `Right now in ${res.name}  (${moment(res.dt, "X").format("MM/DD/YYYY")}) `
    );
    $("#city").html(`<h4> Weather Details:`);
    $("#icon").html(`
    <figure>
    <img src="http://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png" alt="weather icon">
    <figcaption>${res.weather[0].description}</figcaption>
    </figure>`);
    $("#wind").html(`<h5> Wind Speed: ${res.wind.speed}</h5>`);
    $("#humidity").html(`<h5> Humidity: ${res.main.humidity}%</h5>`);
    $("#temp").html(`<h5> Temperature (F): ${res.main.temp}</h5>`);

    // ajax call for the UV index. The UV index API is only available to paid accounts
    $.ajax({
      url: `https://cors-anywhere.herokuapp.com/https://samples.openweathermap.org/data/2.5/uvi?lat=${res.coord.lat}&lon=${res.coord.lon}&appid=00604984263164d160d696afed305b97`,
      method: "GET"
    }).then(function(res) {
      $(".uv").html(`<h5>Fake UV Index: ${res.value}`);
      console.log("this is the UV i: " + res.value);
    });
  });

  // ajax call for five day forecast weather conditions.
  $.ajax({
    url: forecastUrl,
    method: "GET"
  }).then(function(res) {
    console.log(res);

    // emptying html from previous search
    $(".five-day").empty();

    const forecastDays = [];
    const fiveDayDetails = [];

    // const found = forecastArr.find(element => element > 10);

    res.list.filter(function(hourly) {
      let forecastDate = moment(hourly.dt, "X").format("MM/DD/YYYY");
      if (
        forecastDays.includes(forecastDate) ||
        forecastDate === moment().format("MM/DD/YYYY")
      ) {
        return false;
      } else {
        forecastDays.push(moment(hourly.dt, "X").format("MM/DD/YYYY"));
        fiveDayDetails.push({
          date: moment(hourly.dt, "X").format("MM/DD/YYYY"),
          temp: hourly.main.temp,
          humidity: hourly.main.humidity,
          description: hourly.weather[0].description,
          inconUrl: `http://openweathermap.org/img/wn/${hourly.weather[0].icon}@2x.png`
        });
      }
      console.log(fiveDayDetails);
    });
    fiveDayDetails.forEach(day => {
      // ICON DATE TEMP HUMIDITY

      let icon = day.inconUrl;
      let date = day.date;
      let temp = day.temp;
      let humidity = day.humidity;
      let description = day.description;

      $("#five-day").append(`
      <h2 class="header"> ${date}<h2/>
        <div class="card horizontal">
      <div class="card-image">
        <img src=${icon} alt="weather icon">
      </div>
      <div class="card-stacked">
        <div class="card-content">
        <p>${description}<p/>
        <p>Temp: ${temp}<p/>
      <p>Humidity: ${humidity}<p/>
    </div>
   </div>
  <div/>`);
    });
  });
});
