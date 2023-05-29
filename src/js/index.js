const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {

    const apiKey = '13d1f3064287689405042ac58e802efe';
    // const apiKey = '3295ac000e3a47ef9c2175833232905';
    const region = document.querySelector('.search-box input').value;

    if (region === '')
    return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${region}&units=metric&appid=${apiKey}&lang=pt_br`)
        .then(response => response.json())
        .then(json => {

            //temperatura
            console.log(parseFloat(json.main.temp).toFixed(1))
            //descrição
            console.log(json.weather[0].description)
            //umidade
            console.log(json.main.humidity)
            //vento
            console.log((json.wind.speed) * 3.6)
            //chuva
            const isRain = Object.values(json.rain ?? {})[0] 
            if(isRain) {
                console.log((Object.values(json.rain)[0]) * 100)
            } else {
                console.log('0')
            }
    })
})