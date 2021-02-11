const searchParams = document.getElementById("searchParams")
let city = searchParams.value

const currentWeatherData = document.getElementById("currentOutputArea")
const forecastData = document.getElementById("forecastOutputArea")



// load forecast data


// get weather data
function getWeatherData(e) {
    e.preventDefault()

    let city = searchParams.value

    // forecast URL
    const forecastURL = `https://api.weatherapi.com/v1/forecast.json?key=83d976727511405bad3224359211002&q=${city}&days=3`


    axios.get(forecastURL)
        .then(res => {

            console.log(res.data)

            const city = res.data.location.name
            const state = res.data.location.region
            const country = res.data.location.country
            const temp = res.data.current.temp_f
            const humidity = res.data.current.humidity
            const condition = res.data.current.condition.text
            const conditionImg = res.data.current.condition.icon

            const day1 = res.data.forecast.forecastday[0]
            const day2 = res.data.forecast.forecastday[1]
            const day3 = res.data.forecast.forecastday[2]

            // current data output
            currentWeatherData.innerHTML = `
                <h1 class="weatherData forecastDate">Current Conditions</h1>
                <h1 class="weatherData">${city}, ${state}, ${country}</h1>
                <h2 class="weatherData">${temp}&#8457</h2>
                <span class="weatherData">${condition}</span>
                <span class="weatherData">${humidity} % humidity</span>
                <img class="weatherData currentImg" src="${conditionImg}">`

            // 3 day forecast output
            forecastData.innerHTML = `
                <h1 id="threeDayForecastTitle">3 Day Forecast</h1>

                <div id="threeDayForecast">
                <div class="forecastOutputData">
                    <h1 class="weatherData forecastDate">${day1.date}</h1>
                    <h3 class="weatherData">Hi: ${day1.day.maxtemp_f}&#8457</h3>
                    <h3 class="weatherData">Lo: ${day1.day.mintemp_f}&#8457</h3>
                    <span class="weatherData">${day1.day.condition.text}</span>
                    <span class="weatherData">${day1.day.avghumidity} % humidity</span>
                    <img class="weatherData forecastImg" src="${day1.day.condition.icon}">
                </div>

                <div class="forecastOutputData">
                    <h1 class="weatherData forecastDate">${day2.date}</h1>
                    <h3 class="weatherData">Hi: ${day2.day.maxtemp_f}&#8457</h3>
                    <h3 class="weatherData">Lo: ${day2.day.mintemp_f}&#8457</h3>
                    <span class="weatherData">${day2.day.condition.text}</span>
                    <span class="weatherData">${day2.day.avghumidity} % humidity</span>
                    <img class="weatherData forecastImg" src="${day2.day.condition.icon}">
                </div>

                <div class="forecastOutputData">
                    <h1 class="weatherData forecastDate">${day3.date}</h1>
                    <h3 class="weatherData">Hi: ${day3.day.maxtemp_f}&#8457</h3>
                    <h3 class="weatherData">Lo: ${day3.day.mintemp_f}&#8457</h3>
                    <span class="weatherData">${day3.day.condition.text}</span>
                    <span class="weatherData">${day3.day.avghumidity}% humidity</span>
                    <img class="weatherData forecastImg" src="${day3.day.condition.icon}">
                </div>
                </div>`

            searchParams.value = ""
        })
        .catch(err => console.log(err))

}

const submitBtn = document.getElementById("submitBtn")

submitBtn.addEventListener("click", (e) => getWeatherData(e))