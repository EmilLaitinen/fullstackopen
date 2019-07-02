import React from 'react'

const Filter = ({filter, handleFilterChange}) => {
    return ( 
        <form>
        <input value={filter} onChange={handleFilterChange}/>
        </form>
    )
}

export default Filter