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

// If the time is equal to the current time plus 24 hours.  Push to the empty array.

scoresArray.forEach(obj => {
  let initials = obj.initials;
  let storedScore = obj.score;
  let resultsP = document.createElement("p");
  resultsP.innerText = `${initials}: ${storedScore}`;
  scoresDiv.append(resultsP);
});

// let fiveCards = fiveDayDetails.forEach(
//   makeCard(day)
// );
// $("#five-day").append(fiveCards);
// });
// });
// });

// function makeCard (day) {
// let icon = day.inconUrl;
// let date = day.date;
// let temp = day.temp;
// let humidity = day.humidity;
// return  `<h2 class="header"> ${date}<h2/>
// <div class="card horizontal">
// <div class="card-image">
// <img src=${icon} alt="weather icon">
// </div>
// <div class="card-stacked">
// <div class="card-content">
// <p>Temp: ${temp}<p/>
// <p>Humidity: ${humidity}<p/>
// </div>
// </div>
// <div/>`
// }