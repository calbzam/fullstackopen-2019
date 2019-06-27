import React from 'react'


const Total = ({ parts }) => {
    const total =
        parts.reduce((s, p) => s + p.exercises, 0);

    return (
        <>
            <p><h2>Total of {total} exercides</h2></p>
        </>
    )
}

export default Total;