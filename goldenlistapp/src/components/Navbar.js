import React from 'react'

export default function Navbar ({ handleLogOut, user }) {
  return (
    <nav>
      {
        user
          ? <button onClick={handleLogOut}>Log out</button>
          : ''
      }
    </nav>
  )
}
