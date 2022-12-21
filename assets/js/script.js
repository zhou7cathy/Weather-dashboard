//EventListener for search button
var searchFormEl = document.querySelector('#search-form');
var searchInput = document.querySelector('#search-input');
var cityList = document.querySelector('#city-list');
var currentWeather = document.querySelector('#current-weather');
var weatherForecast = document.querySelector('#weather-forecast');

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInputVal = searchInput.value;
  if (!searchInputVal) {
    alert('You need a search input value!');
    return;
  }

  //fetch & display weather 
  //presented with the city name, the date, an icon representation of 
  //weather conditions, the temperature, the humidity, and the the wind speed
	fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + searchInputVal + '&units=metric&appid=ebd7da536e83a54f2481bdf80529f379')
    .then(function (response) {
			if (response.status !== 200) {
        alert('City not found, please try again.')
      }
      return response.json();
		})
    .then(function (data) {
      console.log(data);
      var cityName = document.createElement('h2');
      cityName.textContent = data.city.name;
      
      var CurrentTemperature = document.createElement('p');
      var CurrentDate = document.createElement('p');
      var weatherCondition = document.createElement('img');
      var CurrentWind = document.createElement('p');
      var CurrentHumidity = document.createElement('p');

      CurrentTemperature.textContent = "Temp: " + data.list[0].main.temp + " °C";
      CurrentDate.textContent =data.list[0].dt_txt;
      weatherCondition.setAttribute("src", "http://openweathermap.org/img/wn/"+data.list[0].weather[0].icon+"@2x.png")
      CurrentWind.textContent = "Wind: " + data.list[0].wind.speed + " m/s";
      CurrentHumidity.textContent = "Humidity: " + data.list[0].main.humidity + " %";
        
      currentWeather.append(cityName);
      currentWeather.append(CurrentDate);
      currentWeather.append(CurrentTemperature);
      currentWeather.append(weatherCondition);
      currentWeather.append(CurrentWind);
      currentWeather.append(CurrentHumidity);

      currentWeather.style.margin = "0 0 20px 50px";
      currentWeather.style.borderStyle = "solid";
      currentWeather.style.padding = "5px";

      for (var i = 0; i < data.list.length; i=i+8) {
        var tempContainer = document.createElement('div');

        var date = document.createElement('p');
        var temperature = document.createElement('p');
        var weather = document.createElement('img');
        var wind = document.createElement('p');
        var humidity = document.createElement('p');

        date.textContent =data.list[i].dt_txt;
        temperature.textContent ="Temp: " + data.list[i].main.temp + " °C";  
        weather.setAttribute("src", "http://openweathermap.org/img/wn/"+data.list[i].weather[0].icon+"@2x.png")      
        wind.textContent = "Wind: " + data.list[i].wind.speed + " m/s";
        humidity.textContent = "Humidity: "+ data.list[i].main.humidity + " %";
        
        tempContainer.append(date);
        tempContainer.append(temperature);
        tempContainer.append(weather);
        tempContainer.append(wind);
        tempContainer.append(humidity);
        weatherForecast.append(tempContainer);
      }
    });
}

  searchFormEl.addEventListener('submit', handleSearchFormSubmit);

//local storage to save search result and create location button