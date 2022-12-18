//EventListener for search button
var searchFormEl = document.querySelector('#search-form');

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInputVal = document.querySelector('#search-input').value;

  if (!searchInputVal) {
    alert('You need a search input value!');
    return;
  }
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);

//fetch weather 
fetch(
    'https://api.openweathermap.org/data/2.5/forecast?q=perth&appid=ebd7da536e83a54f2481bdf80529f379'
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });

//display weather
//presented with the city name, the date, an icon representation 
//of weather conditions, the temperature, the humidity, and the the wind speed

//local storage to save search result and create location button