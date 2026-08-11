import { useState } from 'react'

export function useCarousel(total) {
  const [index, setIndex] = useState(0)

  const next = () => setIndex((i) => (i + 1) % total)
  const prev = () => setIndex((i) => (i - 1 + total) % total)
  const goTo = (i) => setIndex(i % total)

  return { index, next, prev, goTo }
}