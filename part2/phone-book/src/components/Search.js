const isFiltered = (persons, filteredName) => {
    if (persons.filter(person => person.name.toLowerCase().includes(filteredName.toLowerCase())).length === persons.length) {
      return true
    } else {
      return false
    }
}

export default isFiltered