import React, { useState, forwardRef, useImperativeHandle } from 'react'
import Proptypes from 'prop-types'

const Toggable = forwardRef(({ children, btnLabel }, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  function toggleVisible () {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisible
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisible}>{btnLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisible}>Cancel</button>
      </div>
    </div>
  )
})

Toggable.displayName = 'Something'

Toggable.propTypes = {
  btnLabel: Proptypes.string.isRequired,
}

export default Toggable