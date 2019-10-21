import React from 'react'

const Person = (props) => {
  return (
    <>
      <p>
        <div>{props.name} {props.number} <button onClick={props.toggleButton}>delete</button></div>
      </p> 
    </>
  )
}

export default Person;
