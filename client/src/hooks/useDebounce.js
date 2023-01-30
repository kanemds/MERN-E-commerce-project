import React, { useEffect, useState } from 'react'

const useDebounce = (value, time = 1000) => {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(value)
    }, time)

    return () => {
      clearTimeout(timeout)
    }
  }, [value, time])

  return (
    <div>useDebounce</div>
  )
}

export default useDebounce