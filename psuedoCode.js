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

      // Filtering the envents by event name so that if the API returns an event with the same name, it get's excluded from the eventNames array
      var eventNames = [];
      const forcastDays = [];
      currentTime = Date.now();

      let filteredForecast = res.list.filter(function(res){
        if (res.dt > currentTime + 24 || currentTime + 48 || currentTime + 72 || currentTime + 96 || currentTime + 120) {
          forcastDays.push()
        }
        // I need to iterate over each object in the array 
      })

      var filteredEvents = response._embedded.events.filter(function(event){
        if(eventNames.includes(event.name)) {
          return false 
        } else {
          eventNames.push(event.name);
          return true 
        }
      });
      console.log(filteredEvents);
        // Looping through the filteredEvents to get start date, time, event name and image.  Returning at max, 5 results.
      for(i = 0; i < 5; i++) {
        var event = filteredEvents[i].name
        var eventDate = filteredEvents[i].dates.start.localDate
        var eventTime = filteredEvents[i].dates.start.localTime
        var foundImage = filteredEvents[i].images.find(function(image) {
          return image.ratio === "3_2";
        });
        // Creating new HTML elements with my seaxrch results and adding them to the page
        var eventImageUrl = foundImage.url;
        var newLink = $("<a>").attr({
          href: filteredEvents[i].url,
          target: "_blank"});
        var newImage = $("<img>").attr("src", eventImageUrl);
        var newDiv = $("<div>").attr("data-box", "box"+(i+5));

// date and time stuff
var d = new Date();
var minutes = d.getMinutes();
var hour = d.getHours();
var date = d.getDate();
var dayIndex = d.getDay();
var timeNow = hour + ":" + minutes;

console.log(timeNow);
  
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

var today = days[dayIndex];

var monthIndex = d.getMonth();
var allMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var month = allMonths[monthIndex];
var year = d.getFullYear();

$("#today").text(today +" " + month +" " + date + ", " + year)



getCursorRequest.onsuccess = e => {
  const cursor = e.target.result;
  if (cursor) {
    if(cursor.value.status === "in-progress") {
      const todo = cursor.value;
      todo.status = "complete";
      cursor.update(todo);
    }
    cursor.continue(); 
  }
};

const forecastDays = res.list.filter(function(hourly) {
  if ((moment(hourly.dt, "X").format("MM/DD/YYYY")) === forecastDays.date) {
    forecastDays.push(hourly.dt)
    // forecastDays.push({
    //   date: moment(hourly.dt, "X").format("MM/DD/YYYY"),
    //   temp: hourly.main.temp,
    //   humidity: hourly.main.humidity,
    //   iconUrl: `http://openweathermap.org/img/wn/${hourly.weather[0].icon}@2x.png`
    // });
  } else {
    return false
  }
});