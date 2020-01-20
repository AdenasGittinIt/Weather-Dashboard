var prevRow = "";
var currentRow;
var count = 0; 
var totalTemp = 0;
var totalHumid = 0
var countToAverage = 0;

    for (let i = 0; i < forecastArr.length; i++) {

         currentRow = moment(forecastArr[i].dt,"X").format("MM/DD/YYYY");
         totalTemp = totalTemp + forecastArr[i].main.temp
         console.log(moment(forecastArr[i].dt,"X").format("MM/DD/YYYY"), forecastArr[i].main.temp)

         

         if(prevRow != currentRow && count < 5  ) {
           $(".five-day").append(moment(forecastArr[i].dt,"X").format("MM/DD/YYYY"),$("<br>"))//moment(res.dt,"X").format("MM/DD/YYYY")
           $(".five-day").append($(`<img src="http://openweathermap.org/img/wn/${forecastArr[i].weather[0].icon}@2x.png" alt="weather icon">`))
           
           totalTemp = totalTemp/countToAverage;
           
           $(".five-day").append($("<br>"),`Aveage Temp: ${totalTemp}`, $("<br>"))
           
           countToAverage++;
           count++;
           countToAverage = 0
           totalTemp = 0
          
        }
        
        prevRow = currentRow;
        `<figure>
        <img src="http://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png" alt="weather icon">
        <figcaption>${res.weather[0].description}</figcaption>
        </figure>`
      
    }


    // need to filter the results so that only elements that are at least 24, 48, 72, 96 and 120 hours from the current date and time are returned.

    $(".city").html(`<h4> Weather Details for ${res.name}</h4>`);
    $(".icon").html(`
    <figure>
    <img src="http://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png" alt="weather icon">
    <figcaption>${res.weather[0].description}</figcaption>
    </figure>`);
    $(".wind").html(`<h5> Wind Speed: ${res.wind.speed}</h5>`);
    $(".humidity").html(`<h5> Humidity: ${res.main.humidity}%</h5>`);
    $(".temp").html(`<h5> Temperature (F): ${res.main.temp}</h5>`);
