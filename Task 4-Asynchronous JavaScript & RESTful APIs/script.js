const button = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");

button.addEventListener("click", async () => {

    const city = cityInput.value.trim();

    if(city===""){
        alert("Please enter a city name.");
        return;
    }

    try{

        const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`);

        const geoData = await geoResponse.json();

        if(!geoData.results){
            weatherResult.innerHTML="<p>City not found.</p>";
            return;
        }

        const latitude = geoData.results[0].latitude;
        const longitude = geoData.results[0].longitude;

        const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`);

        const weatherData = await weatherResponse.json();

        weatherResult.innerHTML=`
        <h2>${geoData.results[0].name}</h2>

        <p><strong>Temperature:</strong> ${weatherData.current.temperature_2m} °C</p>

        <p><strong>Humidity:</strong> ${weatherData.current.relative_humidity_2m}%</p>

        <p><strong>Wind Speed:</strong> ${weatherData.current.wind_speed_10m} km/h</p>
        `;

    }

    catch(error){

        weatherResult.innerHTML="<p>Error fetching weather data.</p>";

    }

});