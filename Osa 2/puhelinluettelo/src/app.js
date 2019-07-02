import React, { useState, useEffect  } from 'react'
import ReactDOM from 'react-dom'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService  from './services/persons'




const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [Message, setMessage] = useState(null)
  const [ErrorMessage, setError] = useState(null)

  const hook = () => {
    personsService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }
  
  useEffect(hook, [])

  const Notification = ({message}) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="message">
        <p>{message}</p>
      </div>
    )
  }

  const Errrror = ({message}) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="error">
        <p>{message}</p>
      </div>
    )
  }

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.find(person => person.name === newName)) {
      const id = persons.find(person => person.id )
      console.log(id.id)
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`)) {
          console.log(id.id)
          console.log(personObject)
          personsService
          .update(id.id, personObject)
          setNewName('')
          setNewNumber('')
          setMessage(`Added new number to ${personObject.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          return
        } 
    }
    personsService
    .create(personObject)
    .then(response => {
      console.log(response)
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
      setMessage(`Added ${personObject.name}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    })
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <p>Filtter shown with</p>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h2>Add a new name</h2>
      <Notification  message={Message}/>
      <Errrror  message={ErrorMessage}/>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
       newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} personsService={personsService} setMessage={setMessage} setPersons={setPersons} setError={setError}/>
    </div>
  )

}



export default App