const forecastDiv = document.getElementById('forecast');
const currentDiv = document.getElementById('current');
const upcomingDiv = document.getElementById('upcoming');

const locationInput = document.getElementById('location');
const getWeatherBtn = document.getElementById('submit');

function createElements()
{
    forecastDiv.style.display = 'block';

    //current
    currentDiv.removeChild(currentDiv.lastChild);
    let forecasts = document.createElement('div');
    forecasts.classList.add('forecasts');

    let conditionSymbolSpan = document.createElement('span');
    conditionSymbolSpan.className = 'condition symbol';

    let conditionSpan = document.createElement('span');
    conditionSpan.classList.add('condition');

    for(let i=0;i<3;i++)
    {
        let forecastDataSpan = document.createElement('span');
        forecastDataSpan.classList.add('forecast-data');
        conditionSpan.appendChild(forecastDataSpan);
    }
    
    forecasts.appendChild(conditionSymbolSpan);
    forecasts.appendChild(conditionSpan);
    currentDiv.appendChild(forecasts);

    //upcoming
    upcomingDiv.removeChild(upcomingDiv.lastChild);
    let forecastInfo = document.createElement('div');
    forecastInfo.classList.add('forecast-info');

    for(let i=0;i<3;i++)
    {
        let upcomingSpan = document.createElement('span');
        upcomingSpan.classList.add('upcoming');

        let symbolSpan = document.createElement('span');
        symbolSpan.classList.add('symbol');

        upcomingSpan.appendChild(symbolSpan);

        for(let i=0;i<2;i++)
        {
            let forecastDataSpan = document.createElement('span');
            forecastDataSpan.classList.add('forecast-data');
            upcomingSpan.appendChild(forecastDataSpan);
        }

        forecastInfo.appendChild(upcomingSpan);
    }

    upcomingDiv.appendChild(forecastInfo);
}

async function getWeatherData()
{
    createElements();

    let locations = await fetchFrom('https://judgetests.firebaseio.com/locations.json', 'Couldnt get locations from server');
    let location = locations.find(x => x.name === locationInput.value);

    if(!location)
    {
        displayError('Location not found');
        return;
    }

    let [currentConditions, threeDayForecast] = await Promise.all(
    [
        fetchFrom(`https://judgetests.firebaseio.com/forecast/today/${location.code}.json`, 
                                    'Couldnt get current conditions from server'),
        fetchFrom(`https://judgetests.firebaseio.com/forecast/upcoming/${location.code}.json`,
                                    'Couldnt get three day forecast from server')
    ]);
    
    displayWeatherData(location, currentConditions, threeDayForecast);
}

async function fetchFrom(url, errorMsg)
{
    let data;

    await fetch(url)
    .then(x => x.json())
    .then(x => data = x)
    .catch(x => displayError(errorMsg));

    return data;
}

function displayError(errorMsg)
{   
    console.error(errorMsg);

    let conditionSpan = document.getElementsByClassName('condition')[1];
    conditionSpan.innerHTML = 'Error';
}

function displayWeatherData(location, currentConditions, threeDayForecast)
{
    let conditionSymbolSpan = document.getElementsByClassName('condition symbol')[0];
    conditionSymbolSpan.innerHTML = getIcon(currentConditions.forecast.condition);

    let cityName = document.querySelector("#current > div.forecasts > span.condition > span:nth-child(1)");
    cityName.textContent = currentConditions.name;
    let degrees = document.querySelector("#current > div.forecasts > span:nth-child(2) > span:nth-child(2)");
    degrees.innerHTML = `${currentConditions.forecast.low} &#176; - ${currentConditions.forecast.high} &#176;`;
    let conditionName = document.querySelector("#current > div.forecasts > span:nth-child(2) > span:nth-child(3)");
    conditionName.textContent = currentConditions.forecast.condition;

    let i = 1;
    for(let forecast of threeDayForecast.forecast)
    {
        let symbol = document.querySelector(`#upcoming > div.forecast-info > span:nth-child(${i}) > span.symbol`);
        symbol.innerHTML = getIcon(forecast.condition);
        let temperatures = document.querySelector(`#upcoming > div.forecast-info > span:nth-child(${i}) > span:nth-child(2)`);
        temperatures.innerHTML = `${forecast.low} &#176; - ${forecast.high} &#176;`;
        conditionName = document.querySelector(`#upcoming > div.forecast-info > span:nth-child(${i}) > span:nth-child(3)`);
        conditionName.textContent = forecast.condition;
        i++;
    }
}

function getIcon(cond)
{
    switch(cond)
    {
        case 'Sunny': return '&#x2600;';
        case 'Partly sunny': return '&#x26C5;';
        case 'Overcast': return '&#x2601;';
        case 'Rain': return '&#x2614;';
    }
}

function attachEvents() 
{
    getWeatherBtn.addEventListener('click', getWeatherData);
}

attachEvents();