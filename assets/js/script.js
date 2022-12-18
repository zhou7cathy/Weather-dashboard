//EventListener for search button
var searchFormEl = document.querySelector('#search-form');

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInputVal = document.querySelector('#search-input').value;

  if (!searchInputVal) {
    alert('You need a search input value!');
    return;
  }

  //fetch weather 
	fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + searchInputVal + '&appid=ebd7da536e83a54f2481bdf80529f379')
    .then(function (response) {
			if (response.status !== 200) {
        alert('City not found, please try again.')
      }
      return response.json();
		})
    .then(function (data) {
      console.log(data);
    });
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);


//display weather
//presented with the city name, the date, an icon representation 
//of weather conditions, the temperature, the humidity, and the the wind speed


//local storage to save search result and create location button