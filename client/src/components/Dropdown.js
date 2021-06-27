import React, { useEffect, useRef, useState } from 'react'
import { useKey } from '../util/useKey'

const Dropdown = ({
  options,
  value,
  setValue,
  prompt,
  searchQuery,
  setSearchQuery,
}) => {
  const [open, setOpen] = useState(false)
  const [cursor, setCursor] = useState(0)
  const inputRef = useRef(null)

  useEffect(() => {
    document.addEventListener('click', toggleOptions)

    return () => {
      document.removeEventListener('click', toggleOptions)
    }
  }, [])

  function toggleOptions(e) {
    setOpen(e && e.target === inputRef.current)
    //setOpen(options.length > 0 && e && e.target === inputRef.current)
  }

  const keyboardNavigation = (e) => {
    if (e.key === 'ArrowDown') {
      console.log({ cursor })
      open
        ? setCursor((c) => (c < options.length - 1 ? c + 1 : c))
        : setOpen(true)
    }

    if (e.key === 'ArrowUp') {
      setCursor((c) => (c > 0 ? c - 1 : 0))
      console.log({ cursor })
    }

    if (e.key === 'Escape') {
      console.log('escape')
      setOpen(false)
    }

    if (e.key === 'Enter' && cursor > 0) {
      console.log('Entered', options[cursor].first_name)
      setValue(options[1].first_name)
      setOpen(false)
      setCursor(0)
    }
  }

  return (
    <div className='dropdown'>
      <div className='control'>
        <div className='selected-value'>
          <input
            ref={inputRef}
            placeholder={value ? value.first_name : prompt}
            type='text'
            value={value ? value.first_name : searchQuery}
            onChange={(e) => {
              !open && setOpen(true)
              setSearchQuery(e.target.value)
              setValue('')
            }}
            onKeyDown={(e) => keyboardNavigation(e)}
          />
        </div>
        <div className={`arrow ${open && 'open'}`}></div>
      </div>
      <div className={`options ${open && 'open'}`}>
        {options &&
          options.map((option) => (
            <div
              className={`option ${
                (value === option && 'selected') ||
                (value === options[cursor] && 'selected')
              }`}
              onClick={() => {
                setSearchQuery('')
                setValue(option)
                setOpen(false)
              }}
              key={option.id.$oid}
            >
              {option.first_name}
            </div>
          ))}
        <div className='option'></div>
      </div>
    </div>
  )
}

export default Dropdown
