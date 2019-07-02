import React, { useState, useEffect  } from 'react'
import TulostaCountries from './components/countries'
import axios from 'axios'

const App = () => {
  const [ filter, setFilter ] = useState('')
  const [ Countries, setCountries] = useState([]) 

  // Lataa maat
  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }
  
  useEffect(hook, [])

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  

  return (
    <div>
    <p>find countries</p>
    <form>
      <div> 
        <input value={filter} onChange={handleFilterChange}/>
      </div>
      
    </form>
    <TulostaCountries countries={Countries} filter={filter} setFilter={setFilter} />
    </div>
  )
}

export default App