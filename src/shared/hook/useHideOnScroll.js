import { useEffect, useState } from 'react'

export function useHideOnScroll({ threshold = 200 } = {}) {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let lastScrollY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      if (y > threshold && y > lastScrollY) {
        setHidden(true)
      } else if (y <= threshold || y < lastScrollY) {
        setHidden(false)
      }
      lastScrollY = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return hidden
}