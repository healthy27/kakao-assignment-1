import { useEffect, useState } from 'react'

function readStorageValue(key, initialValue) {
  const savedValue = localStorage.getItem(key)

  if (!savedValue) {
    return initialValue
  }

  try {
    return JSON.parse(savedValue)
  } catch {
    return initialValue
  }
}

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => readStorageValue(key, initialValue))

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

export default useLocalStorage
