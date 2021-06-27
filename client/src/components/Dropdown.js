import React, { useEffect, useRef, useState } from 'react'

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
  }, [cursor])

  function toggleOptions(e) {
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
        setSearchQuery(options[cursor].first_name)
        setValue(options[cursor])
        setOpen(false)
        setCursor(0)

        break

      default:
        break
    }
  }
  value && console.log({ value })
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
                (option === options[cursor] && 'selected')
              }`}
              onClick={() => {
                setSearchQuery(option)
                setValue(option)
                setOpen(false)
                setCursor(0)
              }}
              key={option.id.$oid}
            >
              {option.first_name} {option.last_name}
            </div>
          ))}
        <div className='option'></div>
      </div>
    </div>
  )
}

export default Dropdown
