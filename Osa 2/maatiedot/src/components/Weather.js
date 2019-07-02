import React, { useState, useEffect  } from 'react'
import axios from 'axios'

  const WeatherReport = ({capital}) => {
    const [ Weather, setWeather] = useState('')

    const hook = () => {
		axios
			.get(`http://api.apixu.com/v1/current.json?key=34723add3b274794894174733190107&q=${capital}`)
			.then(response => {
				setWeather(response.data)
			})
	}

    useEffect(hook, [])
    
    if (!Weather) {
        return <div></div>
    }


    return (
        <div>
        <p><strong>Temperature</strong> {Weather.current.temp_c} °C<br />
        <img src={Weather.current.condition.icon} alt={Weather.current.condition.text}/></p>
        <p><strong>Wind</strong> {Weather.current.wind_kph} km/h, to {Weather.current.wind_dir}  </p>
        </div>
    )
}
export default WeatherReport