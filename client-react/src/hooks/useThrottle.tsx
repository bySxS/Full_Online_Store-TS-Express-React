import { useCallback, useRef } from 'react'

// на будущее
export function useThrottle (callback: () => void, delay = 500) {
  const isThrottled = useRef<boolean>(false)

  return useCallback(() => {
    if (!isThrottled.current) {
      callback()
      isThrottled.current = true
      setTimeout(() => {
        isThrottled.current = false
      }, delay)
    }
  }, [callback, delay])
}
