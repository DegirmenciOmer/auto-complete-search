import React, { useEffect, useRef, useState } from 'react'
import { Loader } from 'semantic-ui-react'

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
    document.addEventListener('click', toggleDropdown)

    return () => {
      document.removeEventListener('click', toggleDropdown)
    }
  }, [])

  function toggleDropdown(e) {
    setOpen(e && e.target === inputRef.current)
    //setOpen(options.length > 0 && e && e.target === inputRef.current)
  }

  const keyboardNavigation = (e) => {
    switch (e.key) {
      case 'ArrowDown':
        open
          ? setCursor((cur) => (cur < options.length - 1 ? cur + 1 : 0))
          : setOpen(true)
        break

      case 'ArrowUp':
        setCursor((cur) => (cur > 0 ? cur - 1 : options.length - 0))
        break

      case 'Escape':
        setOpen(false)
        break

      case 'Enter':
        options && cursor > -1 && handleSelect(options[cursor])
        break

      default:
        break
    }
  }
  //debouncing
  function handleSelect(val) {
    try {
      setSearchQuery('')
      setValue(val)
      setOpen(false)
      setCursor(0)
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <div className='dropdown'>
      <div className='control'>
        <div className='selected-value'>
          <input
            data-testid='input'
            ref={inputRef}
            placeholder={value ? value.first_name : prompt}
            type='text'
            value={
              value ? `${value.first_name} ${value.last_name}` : searchQuery
            }
            onChange={(e) => {
              !open && setOpen(true)
              setSearchQuery(e.target.value)
              setValue(null)
            }}
            onKeyDown={(e) => keyboardNavigation(e)}
            onMouseOver={() => setCursor(0)}
            onMouseOut={() => setCursor(0)}
          />
        </div>
        <div data-testid='arrow' className={`arrow ${open && 'open'}`}></div>
      </div>
      <div data-testid='options' className={`options ${open && 'open'}`}>
        {options &&
          options.map((option, index) => (
            <div
              data-testid={`opt${index}`}
              className={`option ${
                (value === option && 'selected') ||
                (option === options[cursor] && 'selected')
              }`}
              onClick={() => {
                handleSelect(option)
              }}
              key={option.id.$oid}
            >
              {option.first_name} {option.last_name}
            </div>
          ))}

        {searchQuery.length > 0 && !options && (
          <div>
            <Loader active inline='centered' />
          </div>
        )}
      </div>
    </div>
  )
}

export default Dropdown
