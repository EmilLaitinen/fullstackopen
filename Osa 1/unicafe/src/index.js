import React, { useState } from 'react'
import ReactDOM from 'react-dom'

let apu = true

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  
  const handleGood = () => {
    setGood(good + 1)
    setAll(all+1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setAll(all+1)
  }

  const handleBad = () => {
    setBad(bad + 1)
    setAll(all+1)
  }

  return (
    <>
      <h1>Give feedback</h1>
      <Button handleClick={handleGood} text={'good'}/>
      <Button handleClick={handleNeutral} text={'neutral'}/>
      <Button handleClick={handleBad} text={'bad'}/>
      <h1>Statistics</h1>
        <Statistics text={'good'} value={good} all={all}/>
        <Statistics text={'neutral'} value={neutral} all={all}/>
        <Statistics text={'bad'} value={bad} all={all}/>
        <Statistics text={'all'} value={all} all={all}/>
        <Statistics text={'average'} value={(good - bad) / all} all={all}/>
        <Statistics text={'positive'} value={good / all * 100} all={all} prosentti={'%'}/>
    </>
  )
}


const Statistics = ({text, value, all, prosentti}) => {
  if (all === 0) {
    if (apu === true) {
      apu = false
      return (
        <p>No feedback given</p>
      )
    } return (
      <> </>
    )
  }
  return (
    <tbody>
      <tr>
        <td>{text}</td>
        <td>  {value} {prosentti}</td>
      </tr>
      </tbody>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick} >
      {text}
    </button>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)