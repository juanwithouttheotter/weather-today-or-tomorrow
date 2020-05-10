$(document).ready(function () {
  var time = moment();
  var calendarDate = moment().format('l');
  console.log(time);
  console.log(calendarDate);

  $.ajax({
    url: 'https://api.openweathermap.org/data/2.5/weather?q=chicago,il,us&appid=2e066e75d160bdff4f8fab272ec499de',
    method: "GET"
  }).then(function (response) {
    console.log(response);
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




});