import { useEffect, useState } from 'react'

export function useCarouselPause({ rootRef }) {
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [inView, setInView] = useState(true)
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = (event) => setReducedMotion(event.matches)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!rootRef.current) return undefined
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting))
    observer.observe(rootRef.current)
    return () => observer.disconnect()
  }, [rootRef])

  return {
    paused: hovered || focused || reducedMotion || !inView,
    handlers: {
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      onFocus: () => setFocused(true),
      onBlur: () => setFocused(false),
    },
  }
}