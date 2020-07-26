filteredEvents.forEach(event => {
  let title = event.name;
  let eventDate = event.dates.start.localDate;
  let eventTime = event.dates.start.localTime;
  let eventUrl = event.url
  let foundImage = event.images.find(function(image) {
    return image.ratio === "3_2";
  });
  let eventImageUrl = foundImage.url;

  $("#events-col").append(`
    <div class="card teal">
      <div class="card-image">
        <a href=${eventUrl} target="_blank">
          <img scr=${eventImageUrl}>
        </a> 
      </div>

      <div class="card-content">
        <p>${eventDate}, ${eventTime}</p>
        <span class="card-title">${title}</span>
      </div>  
    </div>
  `)
});


filteredEvents.forEach(event => {
  let title = event.name;
  let eventDate = event.dates.start.localDate;
  let eventTime = event.dates.start.localTime;
  let eventUrl = event.url
  let foundImage = event.images.find(function(image) {
    return image.ratio === "3_2";
  });
  let eventImageUrl = foundImage.url;

  $("#events-col").append(`
    <div class="card horizontal teal">
      <div class="card-image">
        <a href=${eventUrl} target="_blank">
          <img scr=${eventImageUrl}>
          <span class="card-title">${title}</span>
        </a> 
      </div>
      <div class="card-content">
        <p>${eventDate}, ${eventTime}</p>
      </div>  
    </div>
  `)
});



`<div class="card teal">
<div class="card-image waves-effect waves-block waves-light">
  <img class="activator" src="${eventImageUrl}">
</div>
<div class="card-content">
  <span class="card-title activator grey-text text-darken-4">${event}<i class="material-icons right">more_vert</i></span>
  <p><a href="#">This is a link</a></p>
</div>
<div class="card-reveal">
  <span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span>
  <p><a href=${filteredEvents[i].url} target="_blank"></p>
  <p>${eventDate}, ${eventTime}</p>
</div>
</div>`

`<div class="row">
<div class="col s12 m7">
  <div class="card">
    <div class="card-image">
      <img src="images/sample-1.jpg">
      <span class="card-title">Card Title</span>
    </div>
    <div class="card-content">
      <p>I am a very simple card. I am good at containing small bits of information.
      I am convenient because I require little markup to use effectively.</p>
    </div>
    <div class="card-action">
      <a href="#">This is a link</a>
    </div>
  </div>
</div>
</div>`

//New Weather card

$("#events-col").append(`
<div class="card teal">
  <div class="card-image">
    <img src="${iconUrl}">
  </div>
  <div class="card-content">
    <p>${date}</p>
    <p>${description}</p>
    <p>Temp: ${temp}</p>
    <p>Humidity: ${humidity}</p>
  /div>
</div>`)



//Current Weather card
`
      <div class="card horizontal teal">
        <div class="card-image">
          <img src=${inconUrl} alt="weather icon">
        </div>
        <div class="card-stacked">
          <div class="card-content">
            <p>${date}</p>
            <p>${description}</p>
            <p>Temp: ${temp}</p>
            <p>Humidity: ${humidity}</p>
          </div>
        </div>
      </div>`




`     <div class="row">
        <div class="col s12 m7">
          <div class="card">
            <div class="card-image">
              <img src=${icon}>
              <span class="card-title">${date}</span>
            </div>
            <div class="card-content">
              <p>${description}</p>
              <p>Temp: ${temp}</p>
              <p>Humidity: ${humidity}</p>
            </div>
          </div>
        </div>
      </div>`