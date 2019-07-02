import React, { useState, useEffect  } from 'react'
import FullCountry from './FullCountry'



const TulostaCountries = ({countries, filter, setFilter}) => {
    const FiltteredList = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

    const handleClick = (value) => {
      setFilter(value)

    }
    if (FiltteredList.length === countries.length) {
      return (
        <p>Specify filter</p>
      )
    }
    if (FiltteredList.length > 10 && FiltteredList.length != 1) {
      return <p>Too many countries. Specify another filter</p>
    }
    if (FiltteredList.length === 1) {
      const thisCountry = FiltteredList[0]
      return (
        <FullCountry thisCountry={thisCountry}/>
      )
    }
    return (
        FiltteredList.map(country => <p>{country.name} <button onClick={() => handleClick(country.name)}> show </button> </p>)
    )
}

export default TulostaCountries