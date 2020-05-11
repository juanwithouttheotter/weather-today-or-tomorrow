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

  $.ajax({
    url: 'https://api.openweathermap.org/data/2.5/forecast?q=chicago,il,us&appid=2e066e75d160bdff4f8fab272ec499de',
    method: "GET"
  }).then(function (response) {

    console.log(response.list);

    var futureDays = [5, 13, 21, 29, 37];

    for (i = 0; i < futureDays.length; i++) {

      var day = moment(response.list[futureDays[i]].dt_txt).format('l');
      var tempFahrenheit2 = Math.max((response.list[futureDays[i]].main.temp - 273.15) * 1.80 + 32).toFixed(2);
      //console.log(day);
      console.log(response.list[futureDays[i]].dt_txt + 'check the hour')
      $(".forecast").append(`
        <div class="col-md-2 m-2 p-0 border border-secondary rounded">
          <h3 class="row col-md-12 text">${day}</h3>
          <div class="row col-md-12 icon"><img src="https://openweathermap.org/img/wn/${response.list[futureDays[i]].weather[0].icon}@2x.png" alt="${response.list[futureDays[i]].weather[0].main} icon" /> </div>
          <div class="row col-md-12">${response.list[futureDays[i]].weather[0].description}</div>
          <div class="row col-md-12"> Temp: ${tempFahrenheit2}\&degF</div>
          <div class="row col-md-12">Humidity ${response.list[futureDays[i]].main.humidity}\%</div>
        
        </div>
    `);

      //console.log(response.list[futureDays[i]].weather[0].icon);
      //console.log(response.list[futureDays[i]].weather[0].description);
      //console.log(response.list[futureDays[i]].weather[0].main);

      //console.log(response.list[futureDays[i]].main.temp);
      //console.log(response.list[futureDays[i]].main.humidity);
    }

    // need to loop for every 8th array 0,8,16,24,32 or 5,13,21,29,37
    //date, icon, temp in F, humidit
    // $(".forecast").append(`
    //   <div class="col-md-2 mr-4 border border-secondary rounded">
    //     <h3 class="row col-md-12 text">${day}</h3>
    //     <div class="row col-md-12 details"><img src=""https://openweathermap.org/img/wn/${response.list[futureDays[i]].weather[0].icon}@2x.png" alt="${response.list[futureDays[i]].weather[0].main} icon" /> </div>
    //     <div class="row col-md-12 details">${response.list[futureDays[i]].weather[0].description}</div>
    //     <div class="row col-md-12 details"> Temp: ${tempFahrenheit2}\&degF</div>
    //     <div class="row col-md-12 details">Humidity ${response.list[futureDays[i]].main.humidity}\%</div>

    //   </div>
    // `);
  });




});