import React from 'react'

export default function Note ({ note, toggleLearned }) {
  const { content, learned } = note

  const label = learned
    ? 'mark as not learned'
    : 'mark as learned'

  return (
    <li>
      <span>{content}</span>
      <input type={'checkbox'} onClick={toggleLearned} title={label} defaultChecked={learned} />
    </li>
  )
}
