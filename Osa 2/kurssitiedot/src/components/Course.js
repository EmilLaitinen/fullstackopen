import React from 'react'

const Course = ({course}) => {
    let total = course.parts.reduce((a,b) => a + b.exercises, 0)
    return (
        <div>
        <h1>{course.name}</h1>
        {course.parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}
        <b>Total of {total} exercises</b>
        </div>
    )
}

export default Course