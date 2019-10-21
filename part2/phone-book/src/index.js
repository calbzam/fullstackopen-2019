import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import dataPersons from './services/Phonebook'
import isFiltered from './components/Search'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [ persons, setPersons] = useState([]); 
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filteredName, setFilteredName ] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    dataPersons
      .getAll()
      .then(person => {
        setPersons(person)
      })
  }, [])

  const inputFilterChange = (event) => {
    setFilteredName(event.target.value)
}

  const HandleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const HandleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const AddPerson= (event) => {
    event.preventDefault()
    const Person = {
      name: newName,
      number: newNumber,
    }

    if (persons.find( person => person.name === newName) !== undefined ){
      alert(`${Person.name} is already added to phonebook`)
      return
   } 

   dataPersons
   .create(Person)
   .then(data => {
     setPersons(persons.concat(data));
     setNewName(''); 
     setNewNumber(''); 
     setErrorMessage(
      `${Person.name} was successfuly added to the phonebook`
    )
    setTimeout(() => {
      setErrorMessage(null)
    }, 4000)
   })
  }

  const removePerson = (id, name) => {
    if (window.confirm(`Do you really want to delete ${name} ?`)) {
      dataPersons
        .remove(id)
        .then(() => {
          const newPhonebook = persons.filter(person => person.id !== id)
          setPersons(newPhonebook)
          setErrorMessage(
            `${name} was successfuly removed from the phonebook`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 4000)
        })
    }
  }

    const rows = () => personsToShow.map(person =>
      <Person
      key={person.name}
      name={person.name}
      number={person.number}
      toggleButton={() => removePerson(person.id, person.name)}
      />)

    const personsToShow =  isFiltered(persons, filteredName) ? persons : persons.filter(person => person.name.toLowerCase().includes(filteredName.toLowerCase()))


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <div>
          filter shown with: <input value={filteredName} placeholder="Search a name here" onChange={inputFilterChange}/>
      </div>
      <h3>Add a new:</h3>
      <PersonForm addPerson={AddPerson} name={newName} onChangeName={HandleNameChange} number={newNumber} onChangeNumber={HandleNumberChange}/>
      <h2>Numbers</h2>
      <div>
        {rows()}
      </div>
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
