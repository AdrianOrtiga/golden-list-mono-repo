/* eslint-disable testing-library/render-result-naming-convention */
/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Note from './Note'

const note = {
  content: 'this is a note',
  learned: true
}

describe('<Note />', () => {
  test('renders content', () => {
    const component = render(<Note note={note} />)

    component.getByText('this is a note')
    component.getByTitle('mark as not learned')
  })

  test('clicking the button calls event handler once', () => {
    const mockHandler = jest.fn()

    const component = render(<Note note={note} toggleLearned={mockHandler} />)

    const checkbox = component.getByTitle('mark as not learned')
    fireEvent.click(checkbox)

    expect(mockHandler).toHaveBeenCalledTimes(1)
  })
})
