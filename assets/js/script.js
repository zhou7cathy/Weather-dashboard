//EventListener for search button
var searchFormEl = document.querySelector('#search-form');
var searchInput = document.querySelector('#search-input');
var cityList = document.querySelector('#city-list');
var currentWeather = document.querySelector('#current-weather');
var weatherForecast = document.querySelector('#weather-forecast');
var today = dayjs().format('DD/MM/YYYY')

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
	fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + searchInputVal + '&cnt=6&appid=ebd7da536e83a54f2481bdf80529f379')
    .then(function (response) {
			if (response.status !== 200) {
        alert('City not found, please try again.')
      }
      return response.json();
		})
    .then(function (data) {
      console.log(data);
      var cityName = document.createElement('h2');
      cityName.textContent = data.city.name + " (" + today + ")";
    
      var CurrentTemperature = document.createElement('p');
        var CurrentWind = document.createElement('p');
        var CurrentHumidity = document.createElement('p');

        CurrentTemperature.textContent = "Temp: " + data.list[0].main.temp + "°F";
        CurrentWind.textContent = "Wind: " + data.list[0].wind.gust + "MPH";
        CurrentHumidity.textContent = "Humidity: " + data.list[0].main.humidity + "%";
        
        currentWeather.append(cityName);
        currentWeather.append(CurrentTemperature);
        currentWeather.append(CurrentWind);
        currentWeather.append(CurrentHumidity);

        currentWeather.style.margin = "0 0 20px 50px";
        currentWeather.style.borderStyle = "solid";
        currentWeather.style.padding = "5px";

      for (var i = 1; i < data.list.length; i++) {
        var tempContainer = document.createElement('div');

        var temperature = document.createElement('p');
        var wind = document.createElement('p');
        var humidity = document.createElement('p');

        temperature.textContent ="Temp: " + data.list[i].main.temp + "°F";        
        wind.textContent = "Wind: " + data.list[i].wind.gust + "MPH";
        humidity.textContent = "Humidity: "+ data.list[i].main.humidity + "%";
        
        tempContainer.append(temperature);
        tempContainer.append(wind);
        tempContainer.append(humidity);
        weatherForecast.append(tempContainer);


      }
    });
}

  searchFormEl.addEventListener('submit', handleSearchFormSubmit);

//local storage to save search result and create location button