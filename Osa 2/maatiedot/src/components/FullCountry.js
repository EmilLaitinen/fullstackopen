import React, { useState, useEffect  } from 'react'
import WeatherReport from './Weather'


const Languages = ({country}) => {
    const countryLanguages = country.languages
    return (
      countryLanguages.map(language => <li>{language.name}</li>)
    )
  }

const FullCountry = ({thisCountry}) => {

    return (
        <div>
        <h2>{thisCountry.name}</h2>
        <p>Capital: {thisCountry.capital}</p>
        <p>Population: {thisCountry.population}</p>
        <h2>Languages</h2>
        <p>{thisCountry.languages.name}</p>
        <Languages country={thisCountry}/>
        <br />
        <img src={thisCountry.flag} style={{width: 200, height: 100}} alt={'Flag'}/>
        <h2>Weather in {thisCountry.capital}</h2>
        <WeatherReport capital={thisCountry.capital} />
      </div>
    )
}


export default FullCountry