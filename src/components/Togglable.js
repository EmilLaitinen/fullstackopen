import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
  }

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible} className='visible'>
        <div onClick={toggleVisibility}>{props.buttonLabel}</div>
      </div>
      <div style={showWhenVisible} className='hidden'>
      <div onClick={toggleVisibility}>{props.buttonLabel}</div>
        {props.children}
      </div>
    </div>
  )
}

export default Togglable