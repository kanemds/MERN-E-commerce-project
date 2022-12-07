import { useState, useEffect } from 'react'

const usePersist = () => {
  const [persist, setPersist] = useState(JSON.parse(localStorage.getItem('persist')) || false)

  useEffect(() => {

    // setItem(keyName, keyValue) create or update
    localStorage.setItem('persist', JSON.stringify(persist))
  }, [persist])

  return [persist, setPersist]
}

export default usePersist