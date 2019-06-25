import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistic = props => {
  return (
    <tr><td>{props.text}</td><td>{props.value}</td></tr>
  )
}

const Statistics = props => {

  if (props.total === 0) {
    return (
      <>
        <h2>No feedback give</h2>
      </>
    )
  }

  const average = props.feedback / props.total;
  const positive = props.good / props.total * 100 + ' %';

  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <Statistic text="good" value={props.good} />
          <Statistic text="neutral" value={props.neutral} />
          <Statistic text="bad" value={props.bad} />
          <Statistic text="all" value={props.total} />
          <Statistic text="average" value={average} />
          <Statistic text="positive" value={positive} />
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [feedback, setFeedback] = useState(0)
  const [total, SetTotal] = useState(0)

  const SetToGood = () => {
    setGood(good + 1);
    setFeedback(feedback + 1);
    SetTotal(total + 1);
  }

  const setToNeutral = () => {
    setNeutral(neutral + 1);
    SetTotal(total + 1);
  }

  const setToBad = () => {
    setBad(bad + 1);
    setFeedback(feedback - 1);
    SetTotal(total + 1);
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={SetToGood} text="good" />
      <Button handleClick={setToNeutral} text="neutral" />
      <Button handleClick={setToBad} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} feedback={feedback} total={total} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)