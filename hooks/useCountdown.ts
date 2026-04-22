'use client'

import { useState, useEffect } from 'react'

export function useCountdown(from: number, active: boolean): number {
  const [count, setCount] = useState(from)

  useEffect(() => {
    if (!active) {
      setCount(from)
      return
    }
    setCount(from)
    const id = setInterval(() => {
      setCount((c) => Math.max(0, c - 1))
    }, 1000)
    return () => clearInterval(id)
  }, [active, from])

  return count
}
