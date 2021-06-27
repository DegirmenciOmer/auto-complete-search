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
  console.log({ cursor })

  useEffect(() => {
    document.addEventListener('click', toggleDropdown)

    return () => {
      document.removeEventListener('click', toggleDropdown)
    }
  }, [cursor])

  function toggleDropdown(e) {
    setOpen(e && e.target === inputRef.current)
    //setOpen(options.length > 0 && e && e.target === inputRef.current)
  }

  const keyboardNavigation = (e) => {
    switch (e.key) {
      case 'ArrowDown':
        open
          ? setCursor((c) => (c < options.length - 1 ? c + 1 : 0))
          : setOpen(true)
        break

      case 'ArrowUp':
        setCursor((c) => (c > 0 ? c - 1 : options.length - 0))
        break

      case 'Escape':
        setOpen(false)
        break

      case 'Enter':
        options &&
          cursor > -1 &&
          handleSelect(options[cursor], options[cursor].first_name)
        break

      default:
        break
    }
  }

  function handleSelect(val, str) {
    setSearchQuery(str)
    setValue(val)
    setOpen(false)
    setCursor(0)
  }
  return (
    <div className='dropdown'>
      <div className='control'>
        <div className='selected-value'>
          <input
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
        <div className={`arrow ${open && 'open'}`}></div>
      </div>
      <div className={`options ${open && 'open'}`}>
        {options &&
          options.map((option) => (
            <div
              className={`option ${
                (value === option && 'selected') ||
                (option === options[cursor] && 'selected')
              }`}
              onClick={() => {
                handleSelect(option, option.first_name)
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
