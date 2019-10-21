import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import CountryList from './components/CountryList';
import axios from 'axios';

const App = () => {

  const [countryList, setCountries] = useState([]);
  const [filterWord, setFilterWord] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const showCountryTable = () => {
    if (filterWord.length === 0) {
      return (
        <CountryList countries={countryList} />
      )
    }
  
    const filteredCountryList = countryList.filter(
      country => country.name.toUpperCase().includes(filterWord.toUpperCase())
    )

    if (filteredCountryList.length < 11 && filteredCountryList.length > 1) {
      return (
        <CountryList countries={filteredCountryList} />
      )
    } else if (filteredCountryList.length > 10) {
      return (
        <div>
          <p>{'Too many matches, speficy another filter.'}</p>
        </div>
      )
    } else if (filteredCountryList.length === 1) {
      const countryList = filteredCountryList[0]

      return (
        <div>
          <h1>{countryList.name}</h1>
          <p>Capital: {countryList.capital}</p>
          <p>Population: {countryList.population}</p>
          <h2>Languages:</h2>
          <ul>
            {countryList.languages.map(language => <li>{language.name}</li>)}
          </ul>
          <img src={countryList.flag} alt="country flag"/>
        </div>
      )
    }
  } 

  return (
  <div>
    <label>find countries: </label>
    <input
      value={filterWord}
      onChange={event => setFilterWord(event.target.value)} 
    />
    <div>
    {showCountryTable()}
    </div>
  </div>  
  );
}
ReactDOM.render(<App />, document.getElementById('root'))