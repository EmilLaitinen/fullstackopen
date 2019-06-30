import React, { useState } from 'react'
import ReactDOM from 'react-dom'

let points = [0,0,0,0,0,0]

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [mostVotes, setMostVotes] = useState(0)

const vote = () => {
  points[selected] += 1
  if (points[selected] > mostVotes) {
    setMostVotes(points[selected])
  } 
}
  console.log(points[selected] + 1)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <br />
      <p>Has {points[selected]} votes</p>
      <button onClick={() => setSelected(Math.floor(Math.random() * 6))}>
        next anecdote
      </button>
      <button onClick={vote}>
        vote
      </button>
      <h1>Most voted anecdote</h1>
      {props.anecdotes[mostVotes]}
      <p>Has {mostVotes} votes</p>
    </div>
  )
}



const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)