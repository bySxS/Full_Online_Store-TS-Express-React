import { useEffect, useState } from 'react'

export function useDebounce<T> (value: T, delay = 500) {
  const [debounced, setDebounced] = useState<T | string>(value)

  useEffect(() => {
    const handler =
      setTimeout(() => setDebounced(
        ((typeof value === 'string')
          ? value.trim()
          : value)
      ), delay)
    return () => clearTimeout(handler)
  }, [value, delay])

  return debounced
}
