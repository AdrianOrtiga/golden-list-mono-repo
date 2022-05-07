import React from 'react'
import Toggable from './Toggable'

export default function NotesForm ({ handleSubmit, handleOnChange, noteInput, toggleableRef }) {
  return (
    <div>
      <Toggable btnLabel={'Add new note'} ref={toggleableRef}>
        <form onSubmit={handleSubmit}>
          <input onChange={handleOnChange} value={noteInput} />
          <button>Create note</button>
        </form>
      </Toggable>
    </div>
  )
}
