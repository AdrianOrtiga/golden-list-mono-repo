import AuthentificationForms from './components/AuthentificationForms'
import NotesContainer from './components/NotesContainer'
import Notification from './components/Notification'
import login from './services/authentification'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'

function App () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const user = window.localStorage.getItem('loggedNoteAppUser')
    setUser(JSON.parse(user))
  }, [])

  function handleLogin (e) {
    e.preventDefault()

    login({
      username,
      password
    }).then(user => {
      setUser(user)
      setUsername('')
      setPassword('')
      setErrorMsg('')
    }).catch(error => {
      window.localStorage.removeItem('loggedNoteAppUser')
      setUser(null)
      setErrorMsg(error.message)
    })
  }

  function handleLogOut () {
    setUser(null)
    setErrorMsg('')
  }

  return (
    <>
      <Navbar handleLogOut={handleLogOut} user={user} />
      <h1>Golden List</h1>
      <Notification errorMsg={errorMsg} loading={false} />
      {
        user
          ? <NotesContainer user={user} />
          : <AuthentificationForms username={username} password={password}
            handleLogin={handleLogin}
            onChangeUser={(e) => setUsername(e.target.value)}
            onChangePassword={(e) => setPassword(e.target.value)}
          />
      }
    </>
  );
}

export default App;
