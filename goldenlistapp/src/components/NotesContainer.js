import React from 'react'
import Note from './Note'
import NotesForm from './NotesForm'
import { useEffect, useState, useRef } from 'react'
import noteService from '../services/notes'
import Notification from './Notification'

export default function NotesContainer ({ user }) {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')
  const [noteInput, setNoteInput] = useState('')
  const toggleableRef = useRef()

  useEffect(() => {
    const { token } = user

    window.localStorage.setItem(
      'loggedNoteAppUser', JSON.stringify(user)
    )
    noteService.setToken(token)

    noteService.getAllNotes()
      .then(savedNotes => {
        setNotes(savedNotes)
        setLoading(false)
        setErrorMsg('')
      })
      .catch(error => {
        setErrorMsg(error.message)
        setLoading(false)
      })
  }, [])

  function handleOnChange (e) {
    setNoteInput(e.target.value)
  }

  function handleSubmitNote (e) {
    e.preventDefault()
    const newNote = {
      "content": noteInput
    }

    noteService.create(newNote)
      .then(noteSaved => {
        setNotes(notes => [...notes, noteSaved])
        setNoteInput('')
        setErrorMsg('')
        toggleableRef.current.toggleVisible()
      }).catch(error => setErrorMsg(error.message))
  }

  function handleToggleLearned (id) {
    const previousNote = notes.find(n => n.id === id)
    const changedNote = { ...previousNote, learned: !previousNote.learned }
    setNotes(notes.map(note => note.id !== id ? note : changedNote))

    noteService
      .update(id, changedNote)
      .then(returnedNote => { })
      .catch(error => {
        setNotes(notes.map(note => note.id !== id ? note : previousNote))
        setErrorMsg(`Note '${previousNote.content}' was already removed from server`)
      })
  }

  return (
    <div>
      <Notification errorMsg={errorMsg} loading={loading} />
      <ol>
        {
          notes !== []
            ? notes.map(
              note => <Note key={note.id} note={note} toggleLearned={() => { handleToggleLearned(note.id) }} />
            )
            : 'No hay notas'
        }
      </ol>
      <NotesForm handleSubmit={handleSubmitNote} handleOnChange={handleOnChange} noteInput={noteInput} toggleableRef={toggleableRef} />
    </div>
  )
}
