const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const localTime = document.querySelector('.local-time');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {

    const apiKey = '13d1f3064287689405042ac58e802efe';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
    return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`)
        .then(response => response.json())
        .then(json => {

            if(json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');
            const rain = document.querySelector('.weather-details .rain span');
            const time = document.querySelector('.local-time p')

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = './src/imgs/clear.png';
                    break;

                case 'Rain':
                    image.src = './src/imgs/rain.png';
                    break;

                case 'Snow':
                    image.src = './src/imgs/snow.png';
                    break;

                case 'Clouds':
                    image.src = './src/imgs/cloud.png';
                    break;

                case 'Haze':
                    image.src = './src/imgs/mist.png';
                    break;

                case 'Fog':
                    image.src = './src/imgs/fog.png';
                    break;

                default:
                    image.src = '';
            }
            
            temperature.innerHTML = `${Math.round(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${Math.round(json.wind.speed)}<a>m/s</a>`;
            
            const isRain = Object.values(json.rain ?? {})[0] 
            if(isRain) {
                rain.innerHTML = `${(Object.values(json.rain)[0]) * 100}<a>mm</a>`
            } else {
                rain.innerHTML = `0<a>mm</a>`
            }

            const date = new Date(json.dt * 1000)
            const currentTime = 10800 + json.timezone
            const currentHour = (currentTime / 3600) + date.getHours()

            let hours;
            let minutes;

            if(date.getMinutes() < 10) {
                minutes = "0" + date.getMinutes()
            } else {
                minutes = date.getMinutes()
            }

            if(currentHour < 10) {
                hours = "0" + date.getHours
            } else if(currentHour >= 24) {
                hours = currentHour - 24
            } else {
                hours = currentHour
            }

            time.innerHTML = `Em ${json.name}, o horário atual é ${hours}:${minutes}.`

            console.log("0" + hours)

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            localTime.classList.add('fadeIn');
            container.style.height = '595px'
    })
})