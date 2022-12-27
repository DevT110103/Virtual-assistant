const APP_ID = '21b66575fd1a41e39674d0850978ac45';
const DEFAULT_VALUE = '--';

const searchInputElement = document.querySelector('#search-input');
const cityName = document.querySelector('.city-name');
const weatherText = document.querySelector('.weather-text');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const humidity = document.querySelector('.value.humidity');
const sunriseElement = document.querySelector('.value.sunrise');
const sunsetElement = document.querySelector('.value.sunset');
const windElement = document.querySelector('.value.wind');

searchInputElement.addEventListener('change', (e) => {
  const value = e.target.value;
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${value || 'ho chi minh'}&appid=${APP_ID}&units=metric&lang=vi`).then(
    async (res) => {
      const data = await res.json();
      try {
        cityName.innerHTML = data.name || DEFAULT_VALUE;

        weatherText.innerHTML = data.weather[0].description || DEFAULT_VALUE;
        weatherIcon.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
        temperature.innerHTML = data.main.temp || DEFAULT_VALUE;
        humidity.innerHTML = data.main.humidity + '%' || DEFAULT_VALUE + '%';

        const sunrise = moment.unix(data.sys.sunrise).format('H:mm');
        const sunset = moment.unix(data.sys.sunset).format('H:mm');

        sunriseElement.innerHTML = sunrise + 'am' || DEFAULT_VALUE + ':' + DEFAULT_VALUE;
        sunsetElement.innerHTML = sunset + 'pm' || DEFAULT_VALUE + ':' + DEFAULT_VALUE;
        windElement.innerHTML = (data.wind.speed * 3.6).toFixed(2) + ' km/h' || DEFAULT_VALUE + ' km/h';
      } catch (err) {}
    }
  );
});
