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
  
  let getUviUrl = (lat,lon,apiKey) => {
 //https://samples.openweathermap.org/data/2.5/uvi?lat=37.75&lon=-122.37&appid=00604984263164d160d696afed305b97
    let uviUrl = `https://samples.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appi=${apiKey}`;
    return uviUrl;
  }



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

    $(".current-info").html(`${res.name}  (${moment(res.dt,"X").format("MM/DD/YYYY")} )`)
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
    $.ajax({
      url: `https://cors-anywhere.herokuapp.com/https://samples.openweathermap.org/data/2.5/uvi?lat=${res.coord.lat}&lon=${res.coord.lon}&appid=00604984263164d160d696afed305b97`,
      method: "GET"
    }).then(function(res) {
      $(".uv").html(`<h5>UV i: ${res.value}`)
      console.log("this is the UV i: " + res.value);
    });
    });
    

    

  // ajax call for five day forecast weather conditions.
  $.ajax({
    url: forecastUrl,
    method: "GET"
  }).then(function(res) {
    
    console.log("forecast URL: " + forecastUrl);
    console.log(res);
    console.log("temperature: " + res.list[0].main.temp);

    // var forecastArr = res.list
    $(".five-day").empty();
    var prevRow = "";
    var currentRow;
    var count = 0; 
    var totalTemp = 0;
    var totalHumid = 0
    var countToAverage = 0;
    const forecastDays = [];

    // const found = forecastArr.find(element => element > 10);

    const filteredForecast = res.list.filter(function(hourly){
        if(forecastDays.includes(moment(hourly.dt, "X").format("MM/DD/YYYY"))){
          return false
        } else {
          forecastDays.push(moment(hourly.dt, "X").format("MM/DD/YYYY"))
        }
    });  
    console.log(filteredForecast);
    console.log(forecastDays)






    // for (let i = 0; i < forecastArr.length; i++) {

    //      currentRow = moment(forecastArr[i].dt,"X").format("MM/DD/YYYY");
    //      totalTemp = totalTemp + forecastArr[i].main.temp
    //      console.log(moment(forecastArr[i].dt,"X").format("MM/DD/YYYY"), forecastArr[i].main.temp)

         

    //      if(prevRow != currentRow && count < 5  ) {
    //        $(".five-day").append(moment(forecastArr[i].dt,"X").format("MM/DD/YYYY"),$("<br>"))//moment(res.dt,"X").format("MM/DD/YYYY")
    //        $(".five-day").append($(`<img src="http://openweathermap.org/img/wn/${forecastArr[i].weather[0].icon}@2x.png" alt="weather icon">`))
           
    //        totalTemp = totalTemp/countToAverage;
           
    //        $(".five-day").append($("<br>"),`Aveage Temp: ${totalTemp}`, $("<br>"))
           
    //        countToAverage++;
    //        count++;
    //        countToAverage = 0
    //        totalTemp = 0
          
    //     }
        
    //     prevRow = currentRow;
    //     // <figure>
    //     // <img src="http://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png" alt="weather icon">
    //     // <figcaption>${res.weather[0].description}</figcaption>
    //     // </figure>`)
      
    // }


    // need to filter the results so that only elements that are at least 24, 48, 72, 96 and 120 hours from the current date and time are returned.

    // $(".city").html(`<h4> Weather Details for ${res.name}</h4>`);
    // $(".icon").html(`
    // <figure>
    // <img src="http://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png" alt="weather icon">
    // <figcaption>${res.weather[0].description}</figcaption>
    // </figure>`);
    // $(".wind").html(`<h5> Wind Speed: ${res.wind.speed}</h5>`);
    // $(".humidity").html(`<h5> Humidity: ${res.main.humidity}%</h5>`);
    // $(".temp").html(`<h5> Temperature (F): ${res.main.temp}</h5>`);

  });



  
});



