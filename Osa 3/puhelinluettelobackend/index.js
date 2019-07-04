require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(express.static('build'))
app.use(bodyParser.json())

app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

morgan.token('content', (req, res) => { return JSON.stringify(req.body) })

let persons = [
  {
    id: 1,
    name: "Adolf Hitler",
    number: "88",
  },
  {
    id: 2,
    name: "Aku Ankka",
    number: "313",
  },
  {
    id: 3,
    name: "GET and POST are the most important methods of HTTP protocol",
    number: "2019-05-30T19:20:14.298Z",
  },
  {
    id: 2,
    name: "GET and POST are the most important methods of HTTP protocol",
    number: "2019-05-30T19:20:14.298Z",
  }
]


app.get('/info', (req, res) => {
  Person.find({})
  .then(person => res.send(`<p>Phonebook has info for ${person.length} people<p>
  <p>${Date()}</p>`)
  )
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons.map(person => person.toJSON()))
  });
});

  app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(person => {
      if (person) {
        response.json(person.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch(error => { 
      next(error)
    })
  })

  app.delete('/api/persons/:id', (request, response, next) => {
    console.log(request)
    console.log(`Poistopyyntö - id: ${request.param.id}`)
    Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
  })

  app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
  
    const person = {
      name: body.name,
      number: body.number,
    }
  
    Person.findByIdAndUpdate(request.params.id, person, { new: true })
      .then(updatedPerson => {
        response.json(updatedPerson.toJSON())
      })
      .catch(error => next(error))
  })

  app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if (!(body.name || body.number)) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    if (persons.find(person => person.name === body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = new Person({
      name: body.name,
      number: body.number
    })

    person.save()
    .then(
      savedPerson => {
        response.json(savedPerson.toJSON)
      }
    )
    .catch(error => next(error))
  })

  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)

  const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    console.log(request)
  
    if (error.name === 'CastError' && error.kind == 'ObjectId') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      console.log('toimii?')
      return response.status(400).json({ error: error.message })
    }
  
    next(error)
  }
  
  app.use(errorHandler)
  

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)

