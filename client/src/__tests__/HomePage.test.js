import React from 'react'
import {
  render,
  screen,
  fireEvent,
  waitFor,
  findByText,
} from '@testing-library/react'

import HomePage from '../pages/HomePage'

describe('HomePage', () => {
  it('runs without crashing', () => {
    render(<HomePage />)
  })

  it('input placeholder is Search...', () => {
    const { getByTestId } = render(<HomePage />)
    const inputEl = getByTestId('input')
    expect(inputEl.placeholder).toBe('Search...')
  })
  test('initial input value is an empty string', () => {
    const { getByTestId } = render(<HomePage />)
    const inputEl = getByTestId('input')
    expect(inputEl.value).toBe('')
  })

  // test('change value of input works correctly', () => {
  //   const { getByTestId } = render(<HomePage />)
  //   const inputEl = getByTestId('input')
  //   fireEvent.change(inputEl, {
  //     target: {
  //       value: 'asa',
  //     },
  //   })
  //   expect(inputEl.value).toBe('asa')
  // })

  test('click on input search activates dropdown', () => {
    const { getByTestId } = render(<HomePage />)
    const inputEl = getByTestId('input')
    const arrowEl = getByTestId('arrow')
    const optionsEl = getByTestId('options')

    fireEvent.click(inputEl)

    expect(arrowEl.className).toBe('arrow open')
    expect(optionsEl.className).toBe('options open')
  })

  test(' click outside input element deactivates dropdown', () => {
    const { getByTestId } = render(<HomePage />)
    const inputEl = getByTestId('input')
    const containerEl = getByTestId('container')
    const arrowEl = getByTestId('arrow')
    const optionsEl = getByTestId('options')

    fireEvent.click(inputEl)
    expect(arrowEl.className).toBe('arrow open')
    expect(optionsEl.className).toBe('options open')

    fireEvent.click(containerEl)
    expect(arrowEl.className).toBe('arrow false')
    expect(optionsEl.className).toBe('options false')
  })

  test(' onKeyDown event: navigate through fetched items and select', async () => {
    const { getByTestId, getByText } = render(<HomePage />)
    const inputEl = getByTestId('input')
    const optionsEl = getByTestId('options')

    fireEvent.click(inputEl)
    fireEvent.change(inputEl, { target: { value: 'abe' } })

    expect(inputEl.value).toBe('abe')

    const optionEl = await waitFor(() => getByText('Abelard Markova'))
    waitFor(() =>
      fireEvent.keyDown(optionEl, {
        key: 'Enter',
        code: 13,
      })
    )

    expect(inputEl.textContent).toBe('')
    expect(await optionEl.textContent).toBe('Abelard Markova')

    screen.debug()
  })
})

describe('HomePage', () => {
  it('runs without crashing', () => {
    render(<HomePage />)
  })
})

//no data
//when running without server
//enter many typings in input
//add a title
