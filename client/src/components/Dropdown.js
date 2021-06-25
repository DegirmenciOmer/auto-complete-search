import React, { useEffect, useRef, useState } from 'react'

const Dropdown = ({
  options,
  value,
  onChange,
  prompt,
  searchQuery,
  setSearchQuery,
}) => {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  console.log(options)

  useEffect(() => {
    document.addEventListener('click', toggle)
    return () => {
      document.removeEventListener('click', toggle)
    }
  }, [])

  function toggle(e) {
    setOpen(e && e.target === ref.current)
  }

  return (
    <div className='dropdown'>
      <div className='control' onClick={() => setOpen((prev) => !prev)}>
        <div className='selected-val'>
          <input
            ref={ref}
            placeholder={value ? value.first_name : prompt}
            type='text'
            value={value ? value.first_name : searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              onChange(null)
            }}
            onClick={toggle}
          />
        </div>
        <div className={`arrow ${open ? 'open' : null}`}></div>
      </div>
      <div className={`options ${open ? 'open' : null}`}>
        {options.map((option) => (
          <div
            className={`option ${value === option ? 'selected' : null}`}
            onClick={() => {
              setSearchQuery('')
              onChange(option)
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
