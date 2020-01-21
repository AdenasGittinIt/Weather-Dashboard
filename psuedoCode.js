// DONE Use the OpenWeather API to retrieve weather data for cities. The documentation includes a section called "How to start" that will provide basic setup and usage instructions.

// DONE Use AJAX to hook into the API to retrieve data in JSON format.

// DONE Your app will run in the browser and feature dynamically updated HTML and CSS powered by jQuery.

// Display the following under current weather conditions:

// DONE City

// DONE Date

// DONE Icon image (visual representation of weather conditions)

// DONE Temperature

// DONE Humidity

// DONE Wind speed

//DONE-ISH UV index

//DONE  Include a 5-Day Forecast below the current weather conditions. Each day for the 5-Day Forecast should display the following:

//DONE Date

// DONE Icon image (visual representation of weather conditions)

// DONE Temperature

// DONE Humidity

// Application loads last searched city forecast on page load.

//on page load function get searched cities from local storage
//loops throught the array in local storage and populates the left side of the page with the previously searched cities 
// i can also set the value="" of the text input to the name of the last searched city
//an array method that targets the last element in the array 

//add to the search on click the set local storage method that pushes the text content of the form field to an empty array


// Application stores previously searched for cities in localstorage and displays them to the user.

// PROBLEM Include a search history so that users can access their past search terms. Clicking on the city name should perform a new search that returns current and future conditions for that city.

// IDEA FOR FUTURE DEV If the time is equal to the current time plus 24 hours.  Push to the empty array.

fiveDayDetails.forEach(day => {


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

// an array to store high scores
let emptyArray = [];

// the array from local storage
let storedArray = JSON.parse(window.localStorage.getItem("highScores"));


const defineScoresArray = (arr1, arr2) => {
  if(arr1 !== null) {
    return arr1
  } else {
    return arr2
  }
}

postScoreBtn.addEventListener("click", function(event) {
  event.preventDefault();
  let scoresArray = defineScoresArray(storedArray,emptyArray)})

  scoresArray.push(userAndScore);
  saveScores(scoresArray);

  function displayAllScores() {
    removeEls(timer, startButton, results);
    let scoresArray = defineScoresArray(storedArray, emptyArray);
  
    scoresArray.forEach(obj => {
      let initials = obj.initials;
      let storedScore = obj.score;
      let resultsP = document.createElement("p");
      resultsP.innerText = `${initials}: ${storedScore}`;
      scoresDiv.append(resultsP);
    });
  }

  const saveScores = (array) => {
    localStorage.setItem("highScores", JSON.stringify(array));
  }

  searchHist.forEach(city => {
    $("#history-list").appendChild(`
    <a href="#!" class="collection-item">${city}</a>`)
  })
