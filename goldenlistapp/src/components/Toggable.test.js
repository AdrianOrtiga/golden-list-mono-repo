/* eslint-disable testing-library/render-result-naming-convention */
/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Toggable from './Toggable'

describe('<Toggable />', () => {
  let btnLabel = 'show'
  let component

  test('Children is not visible and after clicking its button it must be shown', () => {
    component = render(
      <Toggable btnLabel={btnLabel}>
        <div>testDivContent</div>
      </Toggable>
    )

    const element = component.getByText('testDivContent')
    // eslint-disable-next-line testing-library/no-node-access
    expect(element.parentNode).toHaveStyle('display:none')

    const button = component.getByText(btnLabel)
    fireEvent.click(button)

    // eslint-disable-next-line testing-library/no-node-access
    expect(element.parentNode).toHaveStyle('display:block')

    const cancelBtn = component.getByText('Cancel')

    fireEvent.click(cancelBtn)

    // eslint-disable-next-line testing-library/no-node-access
    expect(element.parentNode).toHaveStyle('display:none')
  })
})