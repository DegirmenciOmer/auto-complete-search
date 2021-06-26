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
  const ref = useRef(null)
  console.log({ searchQuery, value })

  useEffect(() => {
    document.addEventListener('click', toggleOptions)

    return () => {
      document.removeEventListener('click', toggleOptions)
    }
  }, [])

  function toggleOptions(e) {
    setOpen(e && e.target === ref.current)
    //setOpen(options.length > 0 && e && e.target === ref.current)
  }

  return (
    <div className='dropdown'>
      <div className='control'>
        <div className='selected-value'>
          <input
            ref={ref}
            placeholder={value ? value.first_name : prompt}
            type='text'
            value={value ? value.first_name : searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setValue(null) //?
            }}
          />
        </div>
        <div className={`arrow ${open && 'open'}`}></div>
      </div>
      <div className={`options ${open && 'open'}`}>
        {options &&
          options.map((option) => (
            <div
              className={`option ${value === option && 'selected'}`}
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
