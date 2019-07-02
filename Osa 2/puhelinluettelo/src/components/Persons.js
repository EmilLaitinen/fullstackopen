import React from 'react'

const Persons = ({persons, filter, personsService, setMessage, setError, setPersons}) => {

    const handleDelete = (id) => {
      if (window.confirm('Haluatko varmasti poistaa?')) {  
          personsService.deletePerson(id)
          .then(response => {
            setPersons(persons.filter(n => n.id !== id))
            setMessage(`Deleted`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(error => {
            setError(`Already deleted from server!`)
            setTimeout(() => {
                setError(null)
              }, 5000)
            setPersons(persons.filter(n => n.id !== id))
            return
          }) }
    }
  
    const FiltteredList = persons.filter(person => person.name.toLowerCase().includes(filter))
    return (
      FiltteredList.map(person => 
      <p>{person.name} {person.number} <button onClick={() => handleDelete(person.id)} >delete</button></p> )
    )
  }

  export default Persons