import { useEffect, useRef } from 'react'

export function useKey(key, cb) {
  const cbRef = useRef(cb)
  useEffect(() => {
    cbRef.current = cb
  })
  useEffect(() => {
    function handle(e) {
      if (e.key === key) {
        cbRef.current(e)
      }
    }
    document.addEventListener('keydown', handle)
    return () => {
      document.removeEventListener('keydown', handle)
    }
  }, [key])
}

// useKey('ArrowUp', () => console.log('Up Arrow!!!'))
// useKey('ArrowDown', () => console.log('Down Arrow!!!'))
// useKey('Enter', () => console.log('Enter!!!'))
