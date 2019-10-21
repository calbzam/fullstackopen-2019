import React from 'react'
import Country from './Country'

const CountryList = ({ countries }) => {
    return (
        <div>
            <table>
                {countries.map(country => <Country key={country.numericCode} name={country.name} />)}
            </table>
        </div>
    )
}

export default CountryList