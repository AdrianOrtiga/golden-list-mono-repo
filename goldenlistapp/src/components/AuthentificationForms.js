import React from 'react'
import Toggable from './Toggable'

export default function AuthentificationForms ({
  handleLogin,
  onChangeUser,
  onChangePassword,
  username,
  password
}) {
  return (
    <div>
      <Toggable btnLabel={'Log in'}>
        <form onSubmit={handleLogin}>
          <div>
            <input
              type='text'
              name='username'
              placeholder='username'
              onChange={onChangeUser} value={username}
            />
          </div>
          <div>
            <input
              type='password'
              name='password'
              placeholder='password'
              onChange={onChangePassword} value={password}
            />
          </div>
          <button>Log in</button>
        </form>
      </Toggable>
    </div>
  )
}
