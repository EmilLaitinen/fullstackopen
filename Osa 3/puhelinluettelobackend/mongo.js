const mongoose = require('mongoose')

const password = process.argv[2]
const personName = process.argv[3]
const personNumber = process.argv[4]

if ( process.argv.length < 3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const url =
  `mongodb+srv://fullstack:${password}@cluster0-mwi6l.mongodb.net/person-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  })
  
  const Person = mongoose.model('Person', personSchema)

if ( process.argv.length === 3 ) {
    console.log('Phonebook:')
    Person.find({}).then(result => {
        result.forEach(person => {
          console.log(person.name, person.number)
        })
        mongoose.connection.close()
      })
  }

  if ( process.argv.length === 4 ) {
    console.log('give both name and number')
    process.exit(1)
  }

  const person = new Person({
    name: personName,
    number: personNumber,
  })

  if ( process.argv.length === 5 ) {
    person.save().then(response => {
        console.log('person saved!');
        mongoose.connection.close();
      })
  }

