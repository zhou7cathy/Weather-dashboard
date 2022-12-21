//EventListener for search button
var searchFormEl = document.querySelector('#search-form');
var searchInput = document.querySelector('#search-input');
var historyBtn = document.querySelector('#history-button');
var currentWeather = document.querySelector('#current-weather');
var weatherForecast = document.querySelector('#weather-forecast');

function handleSearchFormSubmit(event) {
  event.preventDefault();

  searchInputVal = searchInput.value;
  if (!searchInputVal) {
    alert('You need a search input value!');
    return;
  }

  fetchWhether(searchInputVal);
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);

//fetch & display weather 
function fetchWhether(city){
	fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=metric&appid=ebd7da536e83a54f2481bdf80529f379')
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
    
    currentWeather.innerHTML = "";
    currentWeather.append(cityName);
    currentWeather.append(weatherCondition);
    currentWeather.append(CurrentDate);
    currentWeather.append(CurrentTemperature);
    currentWeather.append(CurrentWind);
    currentWeather.append(CurrentHumidity);

    currentWeather.style.margin = "0 0 20px 50px";
    currentWeather.style.borderStyle = "solid";
    currentWeather.style.padding = "5px";
    weatherCondition.style.position = "absolute";
    weatherCondition.style.marginLeft = "100px";
    weatherCondition.style.marginTop = "20px";
    weatherCondition.style.width= "50px";

    weatherForecast.innerHTML = "";
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
      tempContainer.append(weather);
      tempContainer.append(temperature);
      tempContainer.append(wind);
      tempContainer.append(humidity);
      weatherForecast.append(tempContainer);
    }

    //Save search results to local storage
    if (city != null){
      var history = JSON.parse(localStorage.getItem("History"));
      if(history != null) {
        history.push(city);
      } else {
        history = []
        history.push(city)
      }
      localStorage.setItem('History', JSON.stringify(history));
    }
    renderHistory()
  });
}

//get history and create buttons
function renderHistory(){
  var history = JSON.parse(localStorage.getItem("History"));
  if(history != null) {
    historyBtn.innerHTML = '';
    for (let i = 0; i < history.length; i++){
        let historyButton = document.createElement('button');
        historyButton.addEventListener('click', handleButtonClick);
        historyButton.innerText = history[i];
        historyBtn.appendChild(historyButton);
    }
  } 
  searchFormEl.reset();

  //fetch weather for click event on history buttons
  function handleButtonClick(event){
    fetchWhether(event.target.innerHTML)
  }
 }

renderHistory();


