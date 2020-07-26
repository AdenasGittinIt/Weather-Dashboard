let historyArray = JSON.parse(localStorage.getItem("storedHistory"));

let emptyHistory = [];

$().ready(function() {
  //clear search history
  $("#history-list").empty();
  let searchHist = defineHistArray(historyArray, emptyHistory);
  let lastCity = searchHist.pop();

  // insert the lastCity as the value of the search text input and then simulate a click to search
  if (lastCity !== undefined) {
    $("#city-input").val(lastCity);
    $("#search").click();
  } else {
    return;
  }
});

$("#search").on("click", function() {
  event.preventDefault();
  let cityInput = $("#city-input")
    .val()
    .trim()
    .toLowerCase();
  // getting an array to store the city
  let searchHist = defineHistArray(historyArray, emptyHistory);

  const apiKey = "00604984263164d160d696afed305b97";

  // Building the URLs needed for the ajax request
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=imperial&appid=${apiKey}`;

  let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput},&units=imperial&appid=${apiKey}`;

  //adding city to local storage
  searchHist.push(cityInput);
  saveCities(searchHist);
  $("#history-list").empty();
  displayCities(searchHist);

  // ajax call for current weather conditions
  $.ajax({
    url: weatherUrl,
    method: "GET"
  }).then(function(res) {
    // set lat and lon in local storage to use in the UV index URL and API call
    localStorage.setItem("lat", res.coord.lat);
    localStorage.setItem("lon", res.coord.lon);

    // Populate HTML with current conditions

    $("#today").html(
      `${res.name} on ${moment(res.dt, "X").format("ddd MMM D, h:mm a")}`
    );

    $("#icon").html(` 
    <figure>
    <img src="http://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png" alt="weather icon">
    <figcaption>${res.weather[0].description}</figcaption>
    </figure>`);
    $("#wind").html(`Wind Speed: ${res.wind.speed}`);
    $("#humidity").html(`Humidity: ${res.main.humidity}%`);
    $("#temp").html(`Temperature (F): ${res.main.temp}°`);

    // ajax call for the UV index. The UV index API is only available to paid accounts so I'm using the sample
    $.ajax({
      url: `https://cors-anywhere.herokuapp.com/https://samples.openweathermap.org/data/2.5/uvi?lat=${res.coord.lat}&lon=${res.coord.lon}&appid=00604984263164d160d696afed305b97`,
      method: "GET"
    }).then(function(res) {
      $("#uv").html(`Fake UV Index: ${res.value}`);
      $("#five-day-header").html("Five Day Forecast:");
    });
  });

  // ajax call for five day forecast weather conditions.
  $.ajax({
    url: forecastUrl,
    method: "GET"
  }).then(function(res) {
    console.log(res);

    // emptying html from previous search
    $("#five-day").empty();

    const forecastDays = [];
    const fiveDayDetails = [];

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
      // console.log(fiveDayDetails);
    });


    var col = "";

    fiveDayDetails.forEach(day => {
      const { date, temp, humidity, description, inconUrl } = day 

      // console.log(day);
      if (day !== undefined) {
        $("#five-day").append(`
          <div class="col sm 12 lg1" style="padding-right: 5px;">
            <div class="card">
              <div class="card-image">
                <img src=${inconUrl}>
              </div>
              <div class="card-content">
                <p class="card-title black-text">${date}</p>
                <p>${description}</p>
                <p>Temp: ${temp}</p>
                <p>Humidity: ${humidity}</p>
              </div>
            </div>
          </div>`)
      }
    });
  });
});

const defineHistArray = (arr1, arr2) => {
  if (arr1 !== null) {
    return arr1;
  } else {
    return arr2;
  }
};

const saveCities = array => {
  localStorage.setItem("storedHistory", JSON.stringify(array));
};

const displayCities = array => {
  let historyList = $("#history-list");
  historyList.append(
    `<a href="#" class="collection-item active grey white-text">SEARCH HISTORY: </a>`
  );
  array.forEach(city => {
    historyList.append(
      `<a href="#" class="collection-item grey-text" data-city="${city}">${city}</a>`
    );
  });
  $(".collection-item").on("click", function() {
    $("#city-input").val($(this).attr("data-city"));
    $("#search").click();
  });
};
