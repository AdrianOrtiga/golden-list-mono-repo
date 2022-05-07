import React from 'react'

export default function Notification ({ errorMsg, loading }) {
  return (
    <div>
      {
        loading
          ? 'loading data...'
          : ''
      }
      <span className='error'>
        {
          errorMsg
            ? errorMsg
            : ''
        }
      </span>
    </div>
  )
}
