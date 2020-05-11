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
  }).then(function(response) {
    console.log(response);
    console.log(response.list);
    var day = moment(response.list[5].dt_txt).format('l');
    console.log(day);
      // need to loop for every 8th array 0,8,16,24,32 or 5,13,21,29,37
    //date, icon, temp in F, humidity
    
    
    // $(".forecast").append(`
    //   <div class="col-md-2 mr-4 border border-secondary rounded">
    //     <h3 class="row col-md-12 text">${response.list[i].dt}</h3>
    //     <div class="row col-md-12 details"><img src=""https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png" alt="${response.weather[0].main} icon" /> </div>
    //     <div class="row col-md-12 details"> Temp: ${response.main.temp}\&degF</div>
    //     <div class="row col-md-12 details">Humidity ${response.main.humidity}\%</div>
      
    //   </div>
    // `);
  });




});