import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '686617699'  
    }
  ]); 
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');

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

    if (persons.find( p => p.name === newName) !== undefined ){
      alert(`${Person.name} is already added to phonebook`)
      return
   } 

    setPersons(persons.concat(Person));
    setNewName(''); 
    setNewNumber(''); 
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <h3>Add a new:</h3>
      <PersonForm addPerson={AddPerson} name={newName} onChangeName={HandleNameChange} number={newNumber} onChangeNumber={HandleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={persons}/>
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
