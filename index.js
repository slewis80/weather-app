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
                <div class="forecastOutputData text-center shadow border border-primary pb-3">
                    <h3 class="weatherData forecastDate">Current Conditions</h3>
                    <h5 class="weatherData">${city}, ${state}, ${country}</h5>
                    <h4 class="weatherData">${temp}&#8457</h4>
                    <span class="weatherData text-muted">${condition}</span>
                    <span class="weatherData text-muted">${humidity} % humidity</span>
                    <img class="weatherData currentImg" src="${conditionImg}">
                </div>`

            // 3 day forecast output
            forecastData.innerHTML = `
                <h2 class="py-3" id="threeDayForecastTitle">3 Day Forecast</h2>
                
                <div id="threeDayForecast">

                <div class="forecastOutputData shadow border border-primary">
                    <h3 class="weatherData forecastDate text-center">${day1.date}</h3>
                    <h4 class="weatherData">Hi: ${day1.day.maxtemp_f}&#8457</h4>
                    <h4 class="weatherData">Lo: ${day1.day.mintemp_f}&#8457</h4>
                    <span class="weatherData text-muted">${day1.day.condition.text}</span>
                    <span class="weatherData text-muted">${day1.day.avghumidity} % humidity</span>
                    <img class="weatherData forecastImg" src="${day1.day.condition.icon}">
                </div>

                <div class="forecastOutputData shadow border border-primary">
                    <h3 class="weatherData forecastDate text-center">${day2.date}</h3>
                    <h4 class="weatherData">Hi: ${day2.day.maxtemp_f}&#8457</h4>
                    <h4 class="weatherData">Lo: ${day2.day.mintemp_f}&#8457</h4>
                    <span class="weatherData text-muted">${day2.day.condition.text}</span>
                    <span class="weatherData text-muted">${day2.day.avghumidity} % humidity</span>
                    <img class="weatherData forecastImg" src="${day2.day.condition.icon}">
                </div>

                <div class="forecastOutputData shadow border border-primary">
                    <h3 class="weatherData forecastDate text-center">${day3.date}</h3>
                    <h4 class="weatherData">Hi: ${day3.day.maxtemp_f}&#8457</h4>
                    <h4 class="weatherData">Lo: ${day3.day.mintemp_f}&#8457</h4>
                    <span class="weatherData text-muted">${day3.day.condition.text}</span>
                    <span class="weatherData text-muted">${day3.day.avghumidity}% humidity</span>
                    <img class="weatherData forecastImg" src="${day3.day.condition.icon}">
                </div>

                </div>`

            searchParams.value = ""
        })
        .catch(err => console.log(err))

}

const submitBtn = document.getElementById("submitBtn")

submitBtn.addEventListener("click", (e) => getWeatherData(e))