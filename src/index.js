let windIcon = new Skycons({ color: '#65863A' })
let tempIcon = new Skycons({ color: '#146EB4' })
let humIcon = new Skycons({ color: '#CC2027' })
let pressureIcon = new Skycons({ color: '#00AB6B' })

windIcon.set('wind', 'wind')
tempIcon.set('temp', 'partly-cloudy-day')
humIcon.set('hum', 'sleet')
pressureIcon.set('pressure', 'fog')

windIcon.play()
tempIcon.play()
humIcon.play()
pressureIcon.play()

const locationElement = document.querySelector('[data-location]')
const statusElement = document.querySelector('[data-status]')
const temperatureElement = document.querySelector('[data-temperature]')
const realTempElement = document.querySelector('[data-real-temp]')
const humidityElement = document.querySelector('[data-humidity]')
const pressureElement = document.querySelector('[data-pressure]')
const windElement = document.querySelector('[data-wind]')
const windDirectionElement = document.querySelector('[data-wind-dir]')
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
	} catch (err) {
		alert('You have entered an invalid location or something went wrong')
	}
}

function setWeather(data) {
	document
		.querySelectorAll('#hide')
		.forEach((el) => el.classList.add('hidden'))

	locationElement.textContent = data.name + ', ' + data.sys.country
	statusElement.textContent =
		data.weather[0].main + ' - ' + data.weather[0].description
	temperatureElement.textContent = Math.round(data.main.temp) + ' °C'
	realTempElement.textContent = `Feels like: ${Math.round(
		data.main.feels_like
	)} °C`
	humidityElement.textContent = data.main.humidity + '%'
	pressureElement.textContent = data.main.pressure + ' pHa'
	windElement.textContent = data.wind.speed + ' km/h'
	windDirectionElement.textContent = setWindDirection(data)

	const iconcode = data.weather[0].icon
	const iconurl = `http://openweathermap.org/img/wn/${iconcode}@2x.png`
	img.setAttribute('src', iconurl)
}

function setWindDirection(data) {
	const arr = [
		'N',
		'NNE',
		'NE',
		'ENE',
		'E',
		'ESE',
		'SE',
		'SSE',
		'S',
		'SSW',
		'SW',
		'WSW',
		'W',
		'WNW',
		'NW',
		'NNW',
	]

	const degree = data.wind.deg
	const num = Math.round(degree / 22.5 + 0.5)

	return arr[num % 16]
}
