$(document).ready(function () {
  var pastCities = {};
  var appendToday = function (response) {
    var UVIndexURL = `http://api.openweathermap.org/data/2.5/uvi?appid=2e066e75d160bdff4f8fab272ec499de&lat=${response.coord.lat}&lon=${response.coord.lon}`
    var calendarDate = moment().format('l');
    $(".today").append(`
  <div class="container weather-today">
    <h2 class="row col-md-12 text">${response.name} \(${calendarDate}\)
      <img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png" alt="${response.weather[0].main} icon" class="icon"/>
    </h2>
    <div class="row my-2 details"> Temperature: ${response.main.temp}\&degF </div>
    <div class="row my-2 details"> Wind: ${response.wind.speed} mph,  ${response.wind.deg}\&deg</div>
    <div class="row my-2 details"> Humidity: ${response.main.humidity}% </div>
    <div class="row my-2 details"> UV Index: <div class="index"></div></div>
  </div>
      `);

    $.get(UVIndexURL, function (response) {
      var UVIndex = response.value;
      $("div.index").html(UVIndex);

      if (UVIndex <= 2) {
        $(".index").addClass("UV-low");

      } else if (UVIndex > 2 && UVIndex <= 5.99) {
        $(".index").addClass("UV-moderate");

      } else if (UVIndex >= 6 && UVIndex <= 7.99) {
        $(".index").addClass("UV-high");

      } else if (UVIndex >= 8 && UVIndex <= 10.99) {
        $(".index").addClass("UV-veryHigh");

      } else {
        $(".index").addClass("UV-extreme");
      }
    });
  }

  var appendWeek = function (response) {
    var futureDays = [5, 13, 21, 29, 37];
    for (i = 0; i < futureDays.length; i++) {

      var day = moment(response.list[futureDays[i]].dt_txt).format('l');

      $(".forecast").append(`
      <div class="col mx-1 my-2 border border-secondary rounded forecast-card">
        <h4 class="row pl-1 text-center text">${day}</h4>
        <div class="row icon"><img src="https://openweathermap.org/img/wn/${response.list[futureDays[i]].weather[0].icon}@2x.png" alt="${response.list[futureDays[i]].weather[0].main} icon" /> </div>
        <div class="row details pl-1 my-2 ">Temp:\ ${response.list[futureDays[i]].main.temp}\&degF</div>
        <div class="row details pl-1 my-2 ">Humidity:\ ${response.list[futureDays[i]].main.humidity}\%</div>
      
      </div>
      `);
    }
  }

  var citySearch = function (cityState) {
    cityState = cityState.charAt(0).toUpperCase() + cityState.slice(1);
    console.log(cityState);
    $(".past-cities").prepend(`
      <button class="btn my-1 border rounded citybtn">${cityState}</button>
    
    `);
  }

  // function that handles both api calls 

  var getLocation = function(cityState) {
  
    var urlToday = `https://api.openweathermap.org/data/2.5/weather?q=${cityState}&appid=2e066e75d160bdff4f8fab272ec499de&units=imperial`;
    var urlWeek = `https://api.openweathermap.org/data/2.5/forecast?q=${cityState}&appid=2e066e75d160bdff4f8fab272ec499de&units=imperial`;
    $.get(urlToday, function (response) {
      appendToday(response);

    });
    $.get(urlWeek, function (response) {
      appendWeek(response);

    });
  }

  var cleanUp = function () {
    $(".weather-today").remove();
    $(".forecast-card").remove();
  }

  
  //retrieves the html from the button clicked
  $(document).on('click', '.citybtn', function() {
    cleanUp();
    var cityState = $(this).closest(".citybtn").html();
    console.log(cityState);
    getLocation(cityState);

  });

  $(".submit").on('click', function() {
    cleanUp();
    var cityState = $(".city").val();
    getLocation(cityState);
    citySearch(cityState);
    $(".city").val('');
    
  });





});