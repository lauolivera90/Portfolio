import { useCallback, useEffect, useState } from 'react'

export function useCarousel(total, { interval = 0, paused = false } = {}) {
  const [index, setIndex] = useState(0)

  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total])
  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total])
  const goTo = useCallback((i) => setIndex(i % total), [total])

  useEffect(() => {
    if (interval <= 0 || total <= 1 || paused) return undefined
    const timer = setInterval(next, interval)
    return () => clearInterval(timer)
  }, [interval, paused, index, next, total])

  return { index, next, prev, goTo }
}