import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

import HomePage from '../pages/HomePage'

describe('input tests', () => {
  test('input placeholder is Search...', () => {
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
    screen.debug()
  })

  test(' onKeyDown event', async () => {
    const { getByTestId, getByText } = render(<HomePage />)
    const inputEl = getByTestId('input')
    const optionsEl = getByTestId('options')

    fireEvent.click(inputEl)
    fireEvent.change(inputEl, { target: { value: 'abe' } })

    expect(inputEl.value).toBe('abe')
    fireEvent.keyDown(inputEl, {
      key: 'ArrowDown',
      code: 40,
    })
    fireEvent.keyDown(inputEl, {
      key: 'Enter',
      code: 13,
    })

    const optionEl = waitFor(() => getByTestId('opt0'))
    expect(optionEl.textContent).toBe('Abelard')

    screen.debug()
  })
})

//test states
//no data
//when running without server
//enter many typings in input
//add a title
