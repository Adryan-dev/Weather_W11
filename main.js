/*

API KEYS - OPENWEATHERMAP | ipgeolocation

*/

const api_key_weather = 'YOUR API KEY';
const api_key_geo = 'YOUR API KEY';

const city = document.querySelector('#city_name');
const btnWeather = document.querySelector('#weather_btn');

// DATAS
const cityElement = document.querySelector('#city-name'),
      clima_description = document.querySelector('#clima-description'),
      temperatura = document.querySelector('#temperatura'),
      temp_icon = document.querySelector('#temp-img'),
      weather_box = document.querySelector('.weather-box'),
      humidity = document.querySelector('#humidity'),
      wind = document.querySelector('#wind');

// FORECAST 5 DAYS

const next_days = document.querySelectorAll('.next-days .days-box'),
    next_days_icon = document.querySelectorAll('.next-days .days-box .icon-img');

// ALERT MESSAGE

const alertMessage = document.querySelector('.alert_city');


async function getIpCity(){
    let url_ip = `https://api.ipgeolocation.io/ipgeo?apiKey=${api_key_geo}&ip=${ip}`;
    let results_ip = await fetch(url_ip);
    let json_ip = await results_ip.json();

    let city_ip = json_ip.city;

    weatherRequest(city_ip);

}

getIpCity();

// WEATHER REQUEST

async function weatherRequest(city_name) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(city_name)}&appid=${api_key_weather}&units=metric`;
    let results = await fetch(url);
    let json = await results.json();

    if(json.cod === 200){
        showInfo(json);
        weather_box.style = 'opacity: 1;';

        // API FORECAST

        let forecast_url = `http://api.openweathermap.org/data/2.5/forecast?q=${encodeURI(city_name)}&appid=${api_key_weather}&units=metric`
        let forecast_results = await fetch(forecast_url);
        let forecast_json = await forecast_results.json();


        for(let i = 0; i < next_days.length; i++){
            document.querySelectorAll('.next-days .days-box img')[i].setAttribute("src",`http://openweathermap.org/img/wn/${forecast_json.list[i].weather[0].icon}@2x.png`);
            document.querySelectorAll('.next-days .days-box .temp-max')[i].innerHTML = `${forecast_json.list[i].main.temp_max}°`;
            document.querySelectorAll('.next-days .days-box .temp-min')[i].innerHTML = `${forecast_json.list[i].main.temp_min}°`;
        };
    }

}

function showInfo(json){
    cityElement.innerHTML = `${json.name}, ${json.sys.country}`;
    temperatura.innerHTML = `${json.main.temp}°C`;
    clima_description.innerHTML = `${json.weather[0].description}`;
    humidity.innerHTML = `${json.main.humidity}`;
    wind.innerHTML = `${json.wind.speed}`;
    temp_icon.setAttribute("src",`http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`);

}

btnWeather.addEventListener('click', async (event) => {
    event.preventDefault();

    weatherRequest(city.value);
    const cityName = city.value;

    if (cityName) {
        city.style = 'border: none;';
        alertMessage.style = 'opacity: 0;left: 150px;';
        alertMessage.classList.add('alert_success');
        alertMessage.classList.remove('alert_error');
    }else {
        city.style = 'border: 2px solid red;';
        alertMessage.style = 'opacity: 1;left: 0;';
        alertMessage.classList.remove('alert_success');
        alertMessage.classList.add('alert_error');
    }

});