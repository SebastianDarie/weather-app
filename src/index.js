let windIcon = new Skycons({ color: '#65863A' })
let tempIcon = new Skycons({ color: '#146EB4' })
let humIcon = new Skycons({ color: '#CC2027' })

windIcon.set('wind', 'wind')
tempIcon.set('temp', 'partly-cloudy-day')
humIcon.set('hum', 'sleet')

windIcon.play()
tempIcon.play()
humIcon.play()

const locationElement = document.querySelector('[data-location]')
const statusElement = document.querySelector('[data-status]')
const temperatureElement = document.querySelector('[data-temperature]')
const humidityElement = document.querySelector('[data-humidity]')
const windElement = document.querySelector('[data-wind]')
const img = document.querySelector('img')

const search = document.querySelector('.city-search-button')

search.addEventListener('click', fetchWeather)

async function fetchWeather(e) {
	const city = e.target.parentNode.parentNode.childNodes[1].value

	try {
		const res = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=8ab539598f978d8393e18c5fad7687f0`
		)
		const data = await res.json()

		setWeather(data)

		console.log(data)
	} catch (err) {
		alert('You have entered an invalid location or something went wrong')
	}
}

function setWeather(data) {
	locationElement.textContent = data.name + ', ' + data.sys.country
	statusElement.textContent =
		data.weather[0].main + ' - ' + data.weather[0].description
	temperatureElement.textContent = data.main.temp + ' °C'
	humidityElement.textContent = data.main.humidity + '%'
	windElement.textContent = data.wind.speed + ' km/h'

	const iconcode = data.weather[0].icon
	const iconurl = `http://openweathermap.org/img/wn/${iconcode}@2x.png`
	img.setAttribute('src', iconurl)
}
