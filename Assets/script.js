$(document).ready(function () {

  var calendarDate = moment().format('l');
  var cityState;
  var getLocation = function(cityState){
    cityState = $(".city").val();
    $(".city").val('');
  }
  
  var urlToday = `https://api.openweathermap.org/data/2.5/weather?q=${cityState},us&appid=2e066e75d160bdff4f8fab272ec499de`;
  var urlWeek = `https://api.openweathermap.org/data/2.5/forecast?q=${cityState},us&appid=2e066e75d160bdff4f8fab272ec499de`;
  
  $.get(urlToday, function(response) {
    var tempFahrenheit = Math.max((response.main.temp - 273.15) * 1.80 + 32).toFixed(2);

    $(".today").append(`
    <div class="container">
      <h2 class="row col-md-12 text">${response.name} \(${calendarDate}\)
        <img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png" alt="${response.weather[0].main} icon" class="icon"/>
      </h2>
      <div class="row my-2 details"> Temperature: ${tempFahrenheit}\&degF </div>
      <div class="row my-2 details"> Wind: ${response.wind.speed} mph,  ${response.wind.deg}\&deg</div>
      <div class="row my-2 details"> Humidity: ${response.main.humidity}% </div>
    </div>
        `);
  });

  $.get(urlWeek, function(response) {
    var futureDays = [5, 13, 21, 29, 37];
    for (i = 0; i < futureDays.length; i++) {

      var day = moment(response.list[futureDays[i]].dt_txt).format('l');
      var tempFahrenheit2 = Math.max((response.list[futureDays[i]].main.temp - 273.15) * 1.80 + 32).toFixed(2);

      $(".forecast").append(`
        <div class="col mx-1 my-2 border border-secondary rounded forecast-card">
          <h4 class="row pl-1 text-center text">${day}</h4>
          <div class="row icon"><img src="https://openweathermap.org/img/wn/${response.list[futureDays[i]].weather[0].icon}@2x.png" alt="${response.list[futureDays[i]].weather[0].main} icon" /> </div>
          <div class="row details pl-1 my-2 ">Temp:\ ${ tempFahrenheit2}\&degF</div>
          <div class="row details pl-1 my-2 ">Humidity:\ ${ response.list[futureDays[i]].main.humidity}\%</div>
        
        </div>
    `);
    }
  });



  $(".submit").on('click', function(){
    getLocation();
  });
  




});